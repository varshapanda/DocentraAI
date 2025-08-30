"use client";
import * as React from "react";
import { Upload } from "lucide-react";

const FileUploadComponent: React.FC = () => {

    const handleFileUploadButtonClick=()=>{
        const element = document.createElement('input');
        element.setAttribute('type', 'file');
        element.setAttribute('accept', 'application/pdf');
        element.addEventListener('change', async(event)=>{
            if(element.files && element.files.length>0){
                console.log(element.files);
                const file = element.files.item(0);
                if(file){
                    const formData = new FormData();
                    formData.append('pdf', file)

                    await fetch('http://localhost:8000/upload/pdf', {
                        method:'POST',
                        body:formData
                    });
                    console.log('File uploaded');
                }

            }
        })
        element.click();
    }
  return (
    <div className="bg-slate-900 text-white shadow-2xl flex justify-center items-center p-4 rounded-lg border-white border-1">
      <div onClick={ handleFileUploadButtonClick } className="flex justify-center items-center flex-col">
        <h3>Upload PDF File</h3>
        <Upload />
      </div>
    </div>
  );
};

export default FileUploadComponent;
