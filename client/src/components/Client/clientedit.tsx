import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../common/hearder";
import toast, { Toaster } from 'react-hot-toast'
const clientDetails = () => {
    const { id } = useParams();
    const [client, setclient] = useState<any>({});

const nav=useNavigate()
    useEffect(() => {
        const fetchclient = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/client/${id}`)
                setclient(response.data.data)
            } catch (error) {
                console.error("Error fetching client:", error);
            }
        };

        if (id) fetchclient();
    }, [id]);


    const handleChange = (e:any) => {
        setclient({ ...client, [e.target.name]: e.target.value });
    };
const handleUpdate = async (e: any) => {
    e.preventDefault();

    const data = {
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
        vehicleNo: client.vehicleNo,
    };

    try {
        const response = await axios.put(`http://localhost:3000/client/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Updated Client:", response.data);
        toast.success("Client updated successfully!");
         setTimeout(() => {
        nav(`/user/${id}`);
    }, 2000);

    } catch (error) {
        console.error("Error updating client:", error);
         toast.error("Error  updating client!");
    }
};



    if (!client) return <p>Loading client details...</p>;
return (
  <>
    <Header />
    <Toaster position="top-right" reverseOrder={false} />

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">

          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
            Edit Client
          </h2>

          <form onSubmit={handleUpdate} className="space-y-6">

            <div>
              <label className="font-semibold text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={client.name || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={client.email || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Phone:</label>
              <input
                type="number"
                name="phone"
                value={client.phone || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Address:</label>
              <input
                type="text"
                name="address"
                value={client.address || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Vehicle Number:</label>
              <input
                type="text"
                name="vehicleNo"
                value={client.vehicleNo || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-3 text-lg rounded-xl shadow hover:bg-blue-700 transition-all"
            >
              Update Client
            </button>
          </form>

        </div>
      </div>
    </div>
  </>
);

};

export default clientDetails;
