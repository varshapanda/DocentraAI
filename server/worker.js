require("dotenv").config();
const { Worker } = require("bullmq");
// const { OpenAIEmbeddings } = require("@langchain/openai");
const { GoogleGenerativeAIEmbeddings } = require( "@langchain/google-genai");
const { QdrantVectorStore } = require("@langchain/qdrant");
const { Document } = require("@langchain/core/documents");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { CharacterTextSplitter } = require("@langchain/textsplitters");

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    try {
      console.log(`Job:`, job.data);
      const data = JSON.parse(job.data);

      const loader = new PDFLoader(data.path);
      const docx = await loader.load();

      const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004", // latest Gemini embedding model (768 dims)
        apiKey: process.env.GOOGLE_API_KEY, 
      });

      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          url: process.env.QDRANT_URL || process.env.URL,
          collectionName: "langchainjs-testing",
        }
      );

      await vectorStore.addDocuments(docx);
      console.log("All docs are added to vector store");
    } catch (err) {
      console.error("Worker error:", err);
    }
  },
  {
    concurrency: 100,
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
    },
  }
);
