"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { FileText, MessageSquare, Upload, Zap, Shield, Clock } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                DocentraAI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-white hover:text-gray-300 transition-colors border border-gray-600 rounded-lg hover:border-gray-500">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg font-medium">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Chat with Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
              Documents
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Transform your PDFs into intelligent conversations. Upload documents, ask questions, 
            and get instant answers with AI-powered document understanding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignUpButton mode="modal">
              <button className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg font-semibold text-lg flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Start Free
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="px-8 py-4 border border-gray-600 text-white hover:border-gray-500 hover:bg-gray-900 transition-colors rounded-lg font-semibold text-lg">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Powerful Document Intelligence
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the future of document interaction with our advanced AI capabilities
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors">
            <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Smart Upload</h3>
            <p className="text-gray-400 leading-relaxed">
              Seamlessly upload PDF documents with automatic processing and intelligent text extraction.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors">
            <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Natural Conversations</h3>
            <p className="text-gray-400 leading-relaxed">
              Ask questions in plain English and get contextual answers directly from your documents.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors">
            <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Lightning Fast</h3>
            <p className="text-gray-400 leading-relaxed">
              Get instant responses powered by advanced vector search and Google Gemini AI.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to unlock the power of your documents
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Upload Documents</h3>
            <p className="text-gray-400 leading-relaxed">
              Simply drag and drop or select your PDF files. Our system automatically processes and indexes your content.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">AI Processing</h3>
            <p className="text-gray-400 leading-relaxed">
              Advanced embeddings and vector storage enable semantic understanding of your document content.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Ask Questions</h3>
            <p className="text-gray-400 leading-relaxed">
              Chat naturally with your documents and receive accurate, contextual answers instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              Why Choose DocentraAI?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Secure & Private</h3>
                  <p className="text-gray-400">Your documents are processed securely with enterprise-grade protection.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Real-time Processing</h3>
                  <p className="text-gray-400">Background processing ensures your documents are ready when you are.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Intelligent Retrieval</h3>
                  <p className="text-gray-400">Advanced RAG technology finds the most relevant information for your queries.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Ready to get started?</h3>
            <p className="text-gray-400 mb-8">
              Join thousands of users who are already transforming how they interact with their documents.
            </p>
            <SignUpButton mode="modal">
              <button className="w-full px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg font-semibold flex items-center justify-center gap-2">
                <Zap className="h-5 w-5" />
                Start Free Trial
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-white" />
              <span className="text-lg font-semibold text-white">DocentraAI</span>
            </div>
            <p className="text-gray-400">
              © 2025 DocentraAI. Built with intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;