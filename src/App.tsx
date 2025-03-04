import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Toggle from "./Toggle";
import { FileUploader } from "react-drag-drop-files";

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [useFsAccessApi, setUseFsAccessApi] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    useFsAccessApi: useFsAccessApi,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseFsAccessApi(event.target.checked);
  };

  const handleChange = (file: any) => {
    setFiles([file]);
  };

  return (
    <div className="m-3">
      <h1 className="text-3xl font-bold mb-1">Testing Drag'n'drop</h1>

      <div className="my-5">
        <h2 className="text-xl font-bold">Selected Files</h2>
        {files.length === 0 && <div>(none)</div>}
        <ul>
          {files.map((file) => (
            <li key={file.name} className="font-light">
              <span className="mr-1 text-l">✅</span>
              {file.name}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-xl mt-5">V1: react-drag-drop-files</h2>
      <FileUploader handleChange={handleChange} name="file">
        <div className="h-80 rounded-lg flex items-center justify-center font-semibold bg-blue-700 text-white">
          Drag 'n' drop some files here
        </div>
      </FileUploader>

      <h2 className="text-xl mt-5">V2: react-dropzone</h2>
      <div className="mb-5">
        <Toggle
          checked={useFsAccessApi}
          onChange={handleCheckboxChange}
          label="Use File System Access API"
        />
      </div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={`h-20 rounded-lg flex items-center justify-center font-semibold ${
            isDragActive ? "bg-green-600" : "bg-gray-200"
          } text-white`}
        >
          {isDragActive ? "Drop here" : "Drag 'n' drop some files here"}
        </div>
      </div>
    </div>
  );
}
