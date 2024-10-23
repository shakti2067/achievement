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

          {/* File Input */}
          <div className="mb-4">
            <input type="file" name="file" onChange={handleFileChange} />
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* X Input */}
          <div className="mb-4">
            <label>X:</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Y Input */}
          <div className="mb-4">
            <label>Y:</label>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
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
