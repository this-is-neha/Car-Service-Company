import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../common/hearder";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
const AllEmployees = () => {

  interface Employee {
    _id: string;
    name: string;
    email: string;
    role: number;
    department: string;
    image: string;

  }

  const nav = useNavigate();

  const [Employee, setEmployee] = useState<Employee[]>([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      const Response = await axios.get("http://localhost:3000/worker/");
      console.log("Fetched Employees:", Response.data.data);
      setEmployee(Response.data.data);


    }
    fetchEmployees();
  }, []);

  const createOne = () => {
    nav('/employe/create')
  }
  const handleOneEdit = (id: string) => {
    nav(`/employe/edit/${id}`);
  }
  const handleOne = async (id: string) => {
    const response = await axios.delete(`http://localhost:3000/worker/${id}`);
    console.log("Deleted Employee:", response.data);
  }
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4 mt-4">
        <h2 className="text-2xl font-bold mb-4">ALL EMPLOYEE</h2>
        <button
          className="flex items-justify-left px-6 py-2 mt-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
          onClick={() => createOne()}
        >
          <span className="mr-2 text-xl">+</span> Add
        </button>

        <div className="grid   mt-10 md:grid-cols-2 gap-14">
          {Employee.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 p-4 rounded shadow relative flex flex-col"
            >

              <button
                onClick={() => handleOne(c._id)}
                className="absolute top-2 right-2 text-red-600 bg-white p-3 rounded-full shadow hover:bg-red-100"
                title="Delete Employee"
              >
                <FaDeleteLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleOneEdit(c._id)}
                className="absolute top-2 right-14 text-red-600 bg-white p-3 rounded-full shadow hover:bg-red-100"
                title="Edit Employee"
              >
                <FaEdit className="w-4 h-4" />
              </button>


              <div className="mb-4">
                <p>
                  <span className="font-semibold text-[18px]">Employee Name:</span> {c.name}
                </p>
                <p>
                  <span className="font-semibold text-[18px]">Employee Email:</span> {c.email}
                </p>
                <p>
                  <span className="font-semibold text-[18px]">Role: </span> {c.role}
                </p>
                <p>
                  <span className="font-semibold text-[18px]">Department: </span> {c.department}
                </p>
                <p>
                  <span className="font-semibold text-[18px]">Image: </span>
                  {c.image}
                </p>
                <img
                  src={`http://localhost:3000/uploads/${c.image}`}
                  alt={c.name}
                  className="w-20 h-20 object-cover rounded mt-2"
                />
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  );



}
export default AllEmployees;