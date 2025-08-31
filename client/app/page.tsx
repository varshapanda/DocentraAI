import FileUploadComponent from "./components/file-upload"
import ChatComponent from "./components/chat"
import { UserButton } from "@clerk/nextjs";
import { FileText } from "lucide-react";


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">DocentraAI</span>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Fixed Left Sidebar - File Upload */}
        <div className="w-80 border-r border-gray-800 bg-gray-950/50 p-6 flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">Document Upload</h2>
            <p className="text-sm text-gray-400">Upload your PDF to start chatting</p>
          </div>
          <FileUploadComponent />
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-black">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}