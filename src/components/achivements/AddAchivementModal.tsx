import { useState } from "react";

const AddAchivementModal = ({ onClose, onUpload }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [x, setX] = useState<number | "">("");
  const [y, setY] = useState<number | "">("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const filePreview = URL.createObjectURL(selectedFile);
      setPreview(filePreview);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("achievement_type", "birthday");
      formData.append("name", name);
      formData.append("x", x.toString());
      formData.append("y", y.toString());

      onUpload(formData);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-card justify-center">
        <div className="w-full">
          <h3 className="text-lg text-blackolive mb-[0.875rem] font-semibold">
            Add Achievement
          </h3>

          {/* Name Input */}
          <div className="mb-4">
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="flex gap-4 mb-4">
            {/* X Input */}
            <div className="w-1/2">
              <input
                type="number"
                value={x}
                placeholder="X"
                onChange={(e) => setX(Number(e.target.value))}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* Y Input */}
            <div className="w-1/2">
              <input
                type="number"
                value={y}
                placeholder="Y"
                onChange={(e) => setY(Number(e.target.value))}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          {/* File Input */} 
          <div
            className="flex items-center justify-center w-full mb-4"
            onChange={handleFileChange}
          >
            <label className="flex flex-col items-center justify-center w-full h-[10rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                required
              />
            </label>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto max-h-60 object-cover"
              />
            </div>
          )}

          <div className="flex justify-end items-baseline gap-[0.75rem]">
            <button
              type="button"
              className="btn-secondary px-4"
              onClick={onClose}
            >
              Close
            </button>

            <button type="submit" className="btn-primary px-4 sm:w-auto w-full">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddAchivementModal;
