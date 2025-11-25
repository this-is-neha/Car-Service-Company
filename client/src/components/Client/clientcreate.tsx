import { useState } from "react";
import axios from "axios";
import Header from "../../common/hearder";
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router";
const ClientCreate = () => {
    const [client, setclient] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        phone: "",
        address: "",
        vehicleNo: "",
    });

    const nav= useNavigate()
    const handleChange = (e: any) => {
        setclient({
            ...client,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = { ...client };
        console.log("Submitting data:", payload);

        try {
            const result = await axios.post("http://localhost:3000/client/", payload, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Response from server:", result.data);
            toast.success("Client registerd  successfully!");
             setTimeout(() => {
        nav('/');
    }, 2000);

        } catch (err) {
            console.error("Error submitting client:", err);
            toast.error("Failed to submit client");
             setTimeout(() => {
        nav('/');
    }, 2000);

        }
    };

    return (
        <>
            <Header />
            <Toaster position="top-right" reverseOrder={false} />
            <div className="max-w-lg mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Client</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            value={client.name}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg  outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={client.email}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg outline-none"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={client.password}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg outline-none"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirm"
                            placeholder="Confirm password"
                            value={client.confirm}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter phone number"
                            value={client.phone}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg  outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter address"
                            value={client.address}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg  outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Vehicle Number</label>
                        <input
                            type="text"
                            name="vehicleNo"
                            placeholder="Enter vehicle number"
                            value={client.vehicleNo}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg  outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-gradient-to-r from-black to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                    >
                        Submit Client
                    </button>
                </form>
            </div>
        </>
    );
};

export default ClientCreate;
