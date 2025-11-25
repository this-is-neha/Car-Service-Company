import { useState } from "react";
import axios from "axios";
import Header from "../../common/hearder";
import toast,{Toaster} from "react-hot-toast";
import { useNavigate } from "react-router";
const WorkerCreate = () => {
    const [worker, setworker] = useState({
        name: "",
        email: "",
        role: "",
        department: "",
        image: null as File | null,
    });

    const nav=useNavigate()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setworker({ ...worker, image: e.target.files[0] });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setworker({ ...worker, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", worker.name);
        formData.append("email", worker.email);
        formData.append("role", worker.role);
        formData.append("department", worker.department);
        if (worker.image) formData.append("image", worker.image);

        try {
            const result = await axios.post("http://localhost:3000/worker/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Response from server:", result.data);
            toast.success("Worker submitted successfully!");
            setTimeout(() => {
        nav('/employe');
    }, 2000);
        } catch (err) {
            console.error("Error submitting worker:", err);
            toast.error("Failed to submit worker");
             setTimeout(() => {
        nav('/employe');
    }, 2000);
        }
    };

    return (
        <>
            <Header />
              <Toaster position="top-right" reverseOrder={false} />
            <div className="max-w-lg mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Worker</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            value={worker.name}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={worker.email}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            name="role"
                            placeholder="Enter role"
                            value={worker.role}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            name="department"
                            placeholder="Enter department"
                            value={worker.department}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-3 rounded-lg  outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="border border-gray-300 p-2 rounded-lg cursor-pointer"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-gradient-to-r from-gray-600 to-black text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
                    >
                        Submit Worker
                    </button>
                </form>
            </div>
        </>
    );
};

export default WorkerCreate;
