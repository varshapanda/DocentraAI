require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Queue } = require("bullmq");
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const { QdrantVectorStore } = require("@langchain/qdrant");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const queue = new Queue("file-upload-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());
PORT = 8000;

app.get("/", (req, res) => {
  return res.json("Welcome to PDF RAG APP");
});

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GOOGLE_API_KEY,
});

app.get("/chat", async (req, res) => {
  const userQuery = req.query.message;
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.URL,
      collectionName: "langchainjs-testing",
    }
  );
  const retriever = vectorStore.asRetriever({
    k: 2,
  });
  const result = await retriever.invoke(userQuery);

  const SystemPrompt = `
  You are a helpful AI assistant who answers the user query based on the available context from PDF file
  Context:
  ${JSON.stringify(result)}
  `;
  const geminiResponse = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: SystemPrompt }, { text: userQuery }],
      },
    ],
  });

  return res.json({ message: geminiResponse.response.text(), docs: result });
});

app.post("/upload/pdf", upload.single("pdf"), async (req, res) => {
  await queue.add(
    "file-ready",
    JSON.stringify({
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
    })
  );
  return res.json({ message: "pdf uploaded" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}: http://localhost:${PORT}`);
});
