import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../common/hearder";
import toast, { Toaster } from "react-hot-toast";
const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState<any>({});
const nav=useNavigate()

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/worker/${id}`)
                setEmployee(response.data.data)
                console.log("Image", response.data.data.image)
            } catch (error) {
                console.error("Error fetching employee:", error);
            }
        };

        if (id) fetchEmployee();
    }, [id]);


    const handleChange = (e: any) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setEmployee({ ...employee, image: file });
        }
    }
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", employee.name);
    data.append("email", employee.email);
    data.append("role", String(employee.role));
    data.append("department", employee.department);
    if (employee.image) {
        data.append("image", employee.image);
    }

 
    console.log("Submitting FormData:");
    for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
    }

    try {
        const response = await axios.put(`http://localhost:3000/worker/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Updated Worker:", response.data);
        
        toast.success("Employee updated successfully!");
         setTimeout(() => {
        nav('/employe');
    }, 2000);

    } catch (error) {
        console.error("Error updating employee:", error);
        toast.error("Error Editing Employee");
         setTimeout(() => {
        nav('/employe');
    }, 2000);

    }
};


    if (!employee) return <p>Loading employee details...</p>;

    return (
        <>
            <Header />
            <Toaster position="top-right" reverseOrder={false} />
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-16">


                <div className="max-w-3xl   mx-auto mt-10 flex justify-center">
                    <div className="w-full md:w-2/3  mt-20 bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200">

                        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                            Edit Employee
                        </h2>

                        <form onSubmit={handleUpdate} className="space-y-6">

                            <div>
                                <label className="font-semibold text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700">Role:</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={employee.role}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700">Department:</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg text-lg outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-lg mb-1">Current Image</label>
                                {employee.image && typeof employee.image === 'string' && (
                                    <img
                                        src={`http://localhost:3000/uploads/${employee.image}`}
                                        alt="Product"
                                        className="w-32 h-32 object-cover mb-2"
                                    />
                                )}
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border border-gray-300 rounded text-lg"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-blue-600 text-white py-3 text-lg rounded-xl shadow hover:bg-blue-700 transition-all"
                            >
                                Update Employee
                            </button>

                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EmployeeDetails;


