import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../common/hearder";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const Allclients = () => {

    interface client {
        _id: string;
        name: string;
        email: string;
        phone: number;
        address: string;      
        vehicleNo: string;
      
    }

    const nav = useNavigate();

    const [client, setclient] = useState<client[]>([]);
    useEffect(() => {
        const fetchclients = async () => {
            const Response = await axios.get("http://localhost:3000/client/");
            console.log("Fetched clients:", Response.data.data);
            setclient(Response.data.data);


        }
        fetchclients();
    }, []);


    const handleDelete = async(id: string) => {

      try{
 const resposne=await axios.delete(`http://localhost:3000/client/${id}`)
       console.log("Response is", resposne)
      }
      catch(exception){
        console.log("Error is", exception)

      }
    }
    const createOne=()=>{
      nav('/client/create')
    }
       const handleEdit=(id:any)=>{
      nav(`/client/edit/${id}`)
    }
  
 
  
return (
    <>
        <Header />
        <div className="max-w-6xl mx-auto p-4 mt-4">
            <h2 className="text-3xl font-bold mb-4">All clients</h2>
            <button
                className="flex items-justify-left px-6 py-2 mt-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
                onClick={createOne}
            >
                <span className="mr-2 text-xl">+</span> Add
            </button>

            <div className="grid mt-4 md:grid-cols-2 gap-14">
                {client.map((c) => (
                    <div
                        key={c._id}
                        className="bg-gray-100 p-4  rounded shadow  flex flex-col relative"
                    >
                     
                        <button
                            onClick={() => handleDelete(c._id)}
                            className="absolute top-2 right-2 text-red-600 bg-white p-3 rounded-full shadow hover:bg-red-100"
                            title="Delete Client"
                        >
                            <FaDeleteLeft className="w-4 h-4" />
                        </button>

                      
                        <button
                            onClick={() => handleEdit(c._id)}
                            className="absolute top-2 right-14 text-blue-600 bg-white p-3 rounded-full shadow hover:bg-blue-100"
                            title="Edit Client"
                        >
                            <FaEdit className="w-4 h-4" />
                        </button>

                        <div className="mb-4">
                            <p><span className="font-semibold text-xl">Client Name:</span> {c.name}</p>
                            <p><span className="font-semibold text-xl">Client email:</span> {c.email}</p>
                            <p><span className="font-semibold text-xl">Phone:</span> {c.phone}</p>
                            <p><span className="font-semibold text-xl">Vehicle Number:</span> {c.vehicleNo}</p>
                            <p><span className="font-semibold text-xl">Address:</span> {c.address}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    </>
);




}
export default Allclients;