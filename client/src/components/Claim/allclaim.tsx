import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../common/hearder";
import { FaDeleteLeft } from "react-icons/fa6";

const AllClaims = () => {
  interface Claim {
    _id: string;
    claimnumber: string;
    repairno: string;
    currentODOMeter: number;
    type: string;
    date: string;
    clientName: { name: string; email?: string };
    assignedTo?: { name: string };
    vehicleNo: string;
    status: string;
  }

  const nav = useNavigate();

  const [claim, setClaim] = useState<Claim[]>([]);
  useEffect(() => {
    const fetchClaims = async () => {
      const Response = await axios.get("http://localhost:3000/claim/");
      console.log("Fetched claims:", Response.data.data);
      setClaim(Response.data.data);


    }
    fetchClaims();
  }, []);


  const handleDelete = async (id: string) => {

    console.log("Id to be deleted", id)
    const response = await axios.delete(`http://localhost:3000/claim/${id}`);
    console.log("Deleted Claim:", response.data);

  }
  const handleOne = (id: string) => {
    nav(`/claim/${id}`);
  }
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4 mt-4">
        <h2 className="text-2xl font-bold mb-4">All Claims</h2>


        <div className="grid  md:grid-cols-2 gap-14">
          {claim.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 p-4 rounded shadow flex flex-col "
            >

              <div className="mb-4">
                <button
                  onClick={() => handleDelete(c._id)}
                  className=" mx-[440px] absolute  text-red-600 bg-white p-3 rounded-full shadow hover:bg-red-100">
                  <FaDeleteLeft className="w-4 h-4" />
                </button>
                <p>
                  <span className="font-semibold">Claim Number:</span>
                  {c.claimnumber}
                </p>
                <p>
                  <span className="font-semibold">Vehicle Number:</span>
                  {c.vehicleNo}
                </p>
                <p>
                  <span className="font-semibold">Client Name:</span>
                  {c.clientName?.name}
                </p>

              </div>

              <button
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black mt-auto"
                onClick={() => handleOne(c._id)}
              >
                See Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );



}
export default AllClaims;