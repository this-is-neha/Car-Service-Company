import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../common/hearder";
import { Toaster, toast } from "react-hot-toast";

interface Payment {
  _id: string;
  claim: string;
  image: string;
  createdAt: string;
}

const PaymentList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/payment/all");
      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading payments...</p>;

  return (
    <>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">All Payments</h2>
        {payments.length === 0 ? (
          <p className="text-center text-gray-600">No payments uploaded yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Claim ID</th>
                <th className="border px-4 py-2 text-left">Image</th>
                <th className="border px-4 py-2 text-left">Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{p.claim}</td>
                  <td className="border px-4 py-2">
                    {p.image ? (
                      <img
                        src={`http://localhost:3000/uploads/${p.image}`}
                        alt="Payment Document"
                        className="w-32 h-auto rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default PaymentList;
