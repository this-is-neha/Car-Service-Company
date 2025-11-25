import { useState } from "react";

interface SubletProps {
  sublets: any[];
  setSublets: React.Dispatch<React.SetStateAction<any[]>>;
  onClose: () => void;  
}

const Sublet: React.FC<SubletProps> = ({ sublets, setSublets,onClose }) => {
  const [data, setData] = useState({
    name: "",
    quantity: "",
    costPer: 0,
    requested: 0,
    status: ""
  });

const handleChange = (e: any) => {
  const { name, value } = e.target;

  let updated = {
    ...data,
    [name]: value,
  };

  if (name === "quantity" || name === "costPer") {
    const qty = Number(name === "quantity" ? value : updated.quantity);
    const cost = Number(name === "costPer" ? value : updated.costPer);
    updated.requested = qty * cost;
  }

  setData(updated);
};


  const addService = () => {
    setSublets([...sublets, { ...data, id: Date.now() }]);
  };

  const deleteService = (id: number) => {
    setSublets(sublets.filter((s) => s.id !== id));
  };


  return (
    
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Manage Services</h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={data.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={data.quantity}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="costPer"
          placeholder="Cost Per Item"
          value={data.costPer}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="requested"
          placeholder="Requested Amount"
          value={data.requested}
          readOnly
          onChange={handleChange}
          className="border p-2 rounded"
        />

    <select
  name="status"
  value={data.status}
  onChange={handleChange}
  className="border p-2 rounded"
>
  <option value="">Select Status</option>
  <option value="Pending">Pending</option>
  <option value="Authorized">Authorized</option>
  <option value="Paid">Paid</option>
</select>


      <button
  type="button" 
  onClick={addService}
  className="bg-blue-600 text-white py-2 rounded"
>
  Add Service
</button>

      </div>

      <table className="w-full mt-6 border">
        <thead>
          <tr>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Quantity</th>
            <th className="border px-3 py-2">Cost</th>
            <th className="border px-3 py-2">Requested </th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {sublets.map((s) => (
            <tr key={s.id}>
              <td className="border px-3 py-2">{s.name}</td>
              <td className="border px-3 py-2">{s.quantity}</td>
              <td className="border px-3 py-2">{s.costPer}</td>
              <td className="border px-3 py-2">{s.requested}</td>
              <td className="border px-3 py-2">
                <button
                  onClick={() => deleteService(s.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

<button
  onClick={onClose}
  className="mt-6 bg-black text-white px-4 py-2 rounded"
>
  Done
</button>

    </div>
  );
};

export default Sublet;

