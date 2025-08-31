"use client";
import * as React from "react";
import { Upload, FileText, CheckCircle, Plus } from "lucide-react";

const FileUploadComponent: React.FC = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [uploadedFileName, setUploadedFileName] = React.useState("");

  const handleFileUploadButtonClick = () => {
    const element = document.createElement('input');
    element.setAttribute('type', 'file');
    element.setAttribute('accept', 'application/pdf');
    element.addEventListener('change', async (event) => {
      if (element.files && element.files.length > 0) {
        console.log(element.files);
        const file = element.files.item(0);
        if (file) {
          setIsUploading(true);
          setUploadSuccess(false);
          setUploadedFileName(file.name);
          
          const formData = new FormData();
          formData.append('pdf', file);

          try {
            await fetch('http://localhost:8000/upload/pdf', {
              method: 'POST',
              body: formData
            });
            console.log('File uploaded');
            setUploadSuccess(true);
          } catch (error) {
            console.error('Upload failed:', error);
          } finally {
            setIsUploading(false);
          }
        }
      }
    });
    element.click();
  };

  const handleUploadAnother = () => {
    setUploadSuccess(false);
    setUploadedFileName("");
    handleFileUploadButtonClick();
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
      <div 
        onClick={uploadSuccess ? undefined : handleFileUploadButtonClick} 
        className={`flex flex-col items-center justify-center ${!uploadSuccess ? 'cursor-pointer group' : ''}`}
      >
        {uploadSuccess ? (
          <>
            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">PDF Uploaded Successfully!</h3>
            <div className="bg-gray-800 rounded-lg p-3 mb-4 w-full">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Uploaded File:</span>
              </div>
              <p className="text-sm text-gray-300 truncate" title={uploadedFileName}>
                {uploadedFileName}
              </p>
            </div>
            <p className="text-sm text-gray-400 text-center mb-4">
              Your document is being processed. You can start asking questions now!
            </p>
            <button
              onClick={handleUploadAnother}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm text-white transition-colors"
            >
              <Plus className="h-4 w-4" />
              Upload Another PDF
            </button>
          </>
        ) : (
          <>
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
              {isUploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              ) : (
                <Upload className="h-8 w-8 text-white" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {isUploading ? 'Uploading...' : 'Upload PDF Document'}
            </h3>
            <p className="text-sm text-gray-400 text-center">
              {isUploading 
                ? 'Processing your document...' 
                : 'Click to select a PDF file or drag and drop'
              }
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <FileText className="h-4 w-4" />
              <span>PDF files only</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploadComponent;