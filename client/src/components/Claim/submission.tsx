import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../common/hearder";

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimId: string;
}

const DocumentModal = ({ isOpen, onClose, claimId }: DocumentModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file to upload");

    const formData = new FormData();
    formData.append("image", file);       
    formData.append("claim", claimId);    

    console.log("Submitting document for claimId:", claimId);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/payment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Backend response:", response.data);
      toast.success("Document uploaded successfully!");
      setFile(null);
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
        <div className="bg-white w-[500px] h-full shadow-xl p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold mb-4">Submit for Payment</h2>
          <p className="mb-6 text-gray-600">
            Please upload your invoice and confirm the payment method.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
            <label className="border-2 border-dashed border-gray-300 p-12 rounded-lg text-center cursor-pointer hover:border-blue-500 transition">
              {file ? file.name : "Click or drag file to upload"}
              <input type="file" onChange={handleFileChange} className="hidden" />
            </label>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white py-3 px-6 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DocumentModal;
