import { useEffect, useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import axios from "axios";
import Header from "../../common/hearder";
import Sublet from "./sublet";
import Service from './service'
import { useNavigate } from "react-router";
interface Client {
  _id: string;
  name: string;
}

interface Worker {
  _id: string;
  name: string;
}

const ClaimCreate = () => {
  const [client, setClient] = useState<Client[]>([]);
  const [worker, setWorker] = useState<Worker[]>([]);
  const [sublets, setSublets] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [subletOpen, setSubletOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);


  const [claim, setClaim] = useState({
    claimnumber: "",
    repairno: "",
    currentODOMeter: 0,
    type: "",
    date: "",
    clientName: "",
    assignedTo: "",
    vehicleNo: "",
    statusAmounts: {
      Pending: 0,
      Authorized: 0,
      Paid: 0
    }
  });

  const nav = useNavigate() 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClaim((prev) => ({
      ...prev,
      [name]: name === "currentODOMeter" ? Number(value) : value,
    }));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRes = await axios.get("http://localhost:3000/client/");
        const workersRes = await axios.get("http://localhost:3000/worker/");

        setClient(clientsRes.data.data);
        setWorker(workersRes.data.data);

        console.log("Clients:", clientsRes.data.data);
        console.log("Workers:", workersRes.data.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);
useEffect(() => {
  let pending = 0;
  let authorized = 0;

 
  services.forEach((cat) => {
    cat.subcategories.forEach((sub: any) => {
    
      sub.labour.forEach((lab: any) => {
        pending += lab.Rate * lab.Hours;
        authorized += lab.hourRate * lab.Hours; 
      });

    
      sub.parts.forEach((part: any) => {
        const totalCost = part.quantity * part.costPer;
        pending += totalCost;
        authorized += totalCost; 
      });
    });
  });

 
  sublets.forEach((sublet) => {
    pending += sublet.amount || 0;
    authorized += sublet.amount || 0; 
  });

  setClaim((prev) => ({
    ...prev,
    statusAmounts: {
      ...prev.statusAmounts,
      Pending: pending,
      Authorized: authorized,
    },
  }));
}, [services, sublets]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    try {
      console.log("Submitting",claim,sublets,services)
      const result = await axios.post("http://localhost:3000/claim/", {
        ...claim,
        sublets,
        services,
        headers: {
          "Content-Type": "application/json",
        }
      },
      );

      console.log("Response:", result.data);
      toast.success("Claim submitted successfully!");
                setTimeout(() => {
        nav('/claim/list');
    }, 2000);
    } catch (err) {
      console.error("Error submitting claim:", err);
      toast.error("Failed to submit claim");
       setTimeout(() => {
        nav('/claim/list');
    }, 2000);
    }
  };

  return (
    <>
      <Header />
       <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Claim</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">


          <div>
            <label className="block mb-1 font-semibold">Claim Number</label>
            <input
              type="text"
              name="claimnumber"
              value={claim.claimnumber}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>


          <div>
            <label className="block mb-1 font-semibold">Repair Number</label>
            <input
              type="text"
              name="repairno"
              value={claim.repairno}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>


          <div>
            <label className="block mb-1 font-semibold">Current Odometer</label>
            <input
              type="number"
              name="currentODOMeter"
              value={claim.currentODOMeter}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>


          <div>
            <label className="block mb-1 font-semibold">Type</label>
            <select
              name="type"
              value={claim.type}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            >
              <option value="">Select Claim Type</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Accident">Accident</option>
              <option value="Body Repair">Body Repair</option>
              <option value="Periodic Service">Periodic Service</option>
              <option value="Engine Repair">Engine Repair</option>
              <option value="Warranty">Warranty</option>
              <option value="Insurance">Insurance</option>
              <option value="Other">Other</option>
            </select>
          </div>


          <div>
            <label className="block mb-1 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={claim.date}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>


          <div>
            <label className="block mb-1 font-semibold">Client</label>
            <select
              name="clientName"
              value={claim.clientName}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            >
              <option value=""> Select Client </option>
              {client.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block mb-1 font-semibold">Assign To</label>
            <select
              name="assignedTo"
              value={claim.assignedTo}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            >
              <option value=""> Select Worker </option>
              {worker.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block mb-1 font-semibold">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNo"
              value={claim.vehicleNo}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>

          <div>

            <button
              type="button"
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setSubletOpen(true)}
            >
              Manage Sublets
            </button>


            {subletOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg max-w-3xl w-full shadow-lg relative">
                  <h2 className="text-2xl font-bold mb-4">Manage Sublets</h2>


                  <Sublet
                    sublets={sublets}
                    setSublets={setSublets}
                    onClose={() => setSubletOpen(false)}
                  />
                  <button
                    className="absolute top-3 right-3 text-white bg-red-500 px-3 py-1 rounded"
                    onClick={() => setSubletOpen(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>


          <div>
            <button
              type="button"
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={(e) => {
                e.preventDefault();
                setServiceOpen(true);
              }}

            >
              Manage Service
            </button>


            {serviceOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg max-w-3xl w-full shadow-lg relative">


                  <Service
                    services={services}
                    setServices={setServices}
                    onClose={() => setServiceOpen(false)}
                  />
                  <button
                    className="absolute top-3 right-3 text-white bg-red-500 px-3 py-1 rounded"
                    onClick={() => setServiceOpen(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            )}
            )
          </div>

         <input
  type="number"
  value={claim.statusAmounts["Pending"]}
  readOnly
  className="border px-3 py-2 rounded w-full bg-gray-100"
/>

<input
  type="number"
  value={claim.statusAmounts["Authorized"]}
  readOnly
  className="border px-3 py-2 rounded w-full bg-gray-100"
/>



          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            Submit Claim
          </button>
        </form>
      </div>
    </>
  );
};

export default ClaimCreate;
