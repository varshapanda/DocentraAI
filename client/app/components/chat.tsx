"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import {
  Send,
  User,
  Bot,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Doc {
  pageContent?: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}

interface IMessage {
  role: "assistant" | "user";
  content?: string;
  documents?: Doc[];
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  console.log({ messages });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendChatMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch(
        `${API_URL}/chat?message=${encodeURIComponent(userMessage)}`
      );
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data?.message, documents: data?.docs },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChatMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <Bot className="h-16 w-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2 text-white">
              Ready to help!
            </h3>
            <p>
              Upload a document and start asking questions about its content.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))
        )}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-w-3xl">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="animate-pulse">Thinking...</div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="border-t border-gray-800 bg-gray-950/50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about your document..."
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-0 pr-12 py-3"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendChatMessage}
              disabled={!message.trim() || isLoading}
              className="bg-white text-black hover:bg-gray-200 px-4 py-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageBubble: React.FC<{ message: IMessage }> = ({ message }) => {
  const [isSourcesExpanded, setIsSourcesExpanded] = React.useState(false);

  if (message.role === "user") {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="bg-white text-black rounded-lg p-4 max-w-3xl">
          <p className="whitespace-pre-wrap break-words text-sm">
            {message.content}
          </p>
        </div>
        <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 max-w-3xl">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <p className="whitespace-pre-wrap text-white leading-relaxed break-words text-sm">
            {message.content}
          </p>
        </div>

        {/* User-Friendly Sources Section */}
        {message.documents && message.documents.length > 0 && (
          <div className="mt-3 bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 w-8 h-8 rounded-full flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-medium text-white block">
                    Referenced Sources
                  </span>
                  <span className="text-xs text-gray-400">
                    {message.documents.length} document section
                    {message.documents.length > 1 ? "s" : ""} found
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {isSourcesExpanded ? "Hide" : "Show"} sources
                </span>
                {isSourcesExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </button>

            {isSourcesExpanded && (
              <div className="border-t border-gray-800 bg-gray-950/30">
                <div className="p-4 space-y-3">
                  {message.documents.map((doc, idx) => {
                    const fileName = doc.metadata?.source
                      ? doc.metadata.source
                          .split("/")
                          .pop()
                          ?.split("-")
                          .slice(1)
                          .join("-") || `Document ${idx + 1}`
                      : `Document ${idx + 1}`;

                    const pageNumber = doc.metadata?.loc?.pageNumber;
                    const content = doc.pageContent || "No content available";

                    return (
                      <div
                        key={idx}
                        className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-blue-500/20 w-6 h-6 rounded flex items-center justify-center">
                            <FileText className="h-3 w-3 text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {pageNumber && (
                              <p className="text-xs text-gray-400">
                                Page {pageNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                          <p className="text-xs text-gray-400 mb-1 font-medium">
                            Relevant excerpt:
                          </p>
                          <p className="text-sm text-gray-300 leading-relaxed break-words overflow-hidden">
                            {content.length > 300
                              ? `${content.substring(0, 300)}...`
                              : content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gray-800 p-3 bg-gray-900/20">
                  <p className="text-xs text-gray-500 text-center">
                    These are the document sections I referenced to answer your
                    question
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
