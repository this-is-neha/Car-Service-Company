import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../common/hearder";

import { FaStreetView } from "react-icons/fa6";
const Allclients = () => {

    const { id } = useParams();
    const [client, setclient] = useState<any>({});
    const nav = useNavigate()

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


    const handleEdit = (id: any) => {
        nav(`/client/edit/${id}`)
    }


    const handleView = () => {
        nav(`/my/claim/${id}`)
    }

    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto p-4 mt-4">
                <button
                    onClick={handleView}
                    className="bg-black px-6 py-2 rounded-full flex items-center gap-2 text-white"
                >
                    <FaStreetView size={20} color="white" /> Your Claim
                </button>
                <h2 className="text-3xl font-bold mb-4">Your Profile </h2>



                <div>
                    <label className="font-semibold text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={client.name || ""}

                        className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={client.email || ""}

                        className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700">Phone:</label>
                    <input
                        type="number"
                        name="phone"
                        value={client.phone || ""}

                        className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={client.address || ""}

                        className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="font-semibold text-gray-700">Vehicle Number:</label>
                    <input
                        type="text"
                        name="vehicleNo"
                        value={client.vehicleNo || ""}

                        className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    onClick={() => handleEdit(client._id)}
                    className="w-full mt-4 bg-blue-600 text-white py-3 text-lg rounded-xl shadow hover:bg-blue-700 transition-all"
                >
                    Want to update ?
                </button>

            </div>
        </>
    );




}
export default Allclients;