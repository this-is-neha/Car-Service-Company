
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface Labour {
  id: string;
  labourname: string;
  Rate: number;
  Hours: number;
  hourRate: number;
  labourTax: number;
}

interface Part {
  id: string;
  partNumber: number;
  partName: string;
  quantity: number;
  costPer: number;
  taxPercent: number;
}

interface Subcategory {
  id: string;
  name: string;
  partNumber: number;
  parts: Part[];
  labour: Labour[];
  total: number;
}

interface Category {
  id: string;
  categoryName: string;
  subcategories: Subcategory[];
}

interface ServicesFormProps {
  services: Category[];
  setServices: React.Dispatch<React.SetStateAction<Category[]>>;
  onClose: () => void;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ services, setServices, onClose }) => {
  const emptyPart = (): Part => ({
    id: uuidv4(),
    partNumber: 0,
    partName: "",
    quantity: 0,
    costPer: 0,
    taxPercent: 0
  });

  const emptyLabour = (): Labour => ({
    id: uuidv4(),
    labourname: "",
    Rate: 0,
    Hours: 0,
    hourRate: 0,
    labourTax: 0
  });

  const emptySub = (): Subcategory => ({
    id: uuidv4(),
    name: "",
    partNumber: 0,
    parts: [emptyPart()],
    labour: [emptyLabour()],
    total: 0
  });

  const emptyCategory = (): Category => ({
    id: uuidv4(),
    categoryName: "",
    subcategories: [emptySub()]
  });

  const addCategory = () => {
    setServices([...services, emptyCategory()]);
  };

  const deleteCategory = (index: number) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
  };

  const addSubcategory = (catIndex: number) => {
    const updated = [...services];
    updated[catIndex].subcategories.push(emptySub());
    setServices(updated);
  };

  const deleteSubcategory = (catIndex: number, subIndex: number) => {
    const updated = [...services];
    updated[catIndex].subcategories.splice(subIndex, 1);
    setServices(updated);
  };

  const handleCategoryChange = (e: any, catIndex: number) => {
    const updated = [...services];
    updated[catIndex].categoryName = e.target.value;
    setServices(updated);
  };

  const handlePartChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    catIndex: number,
    subIndex: number,
    partIndex: number
  ) => {
    const updated = [...services];
    const currentPart = updated[catIndex].subcategories[subIndex].parts[partIndex];
    const { name, value } = e.target;

    const newPart: Part = { ...currentPart };

    if (name === "partNumber") {
      newPart.partNumber = Number(value);
    } else if (name === "partName") {
      newPart.partName = value;
    } else if (name === "quantity") {
      newPart.quantity = Number(value);
    } else if (name === "costPer") {
      newPart.costPer = Number(value);
    } else if (name === "taxPercent") {
      newPart.taxPercent = Number(value);
    }

    updated[catIndex].subcategories[subIndex].parts[partIndex] = newPart;
    setServices(updated);
  };

  const addPart = (catIndex: number, subIndex: number) => {
    const updated = [...services];
    updated[catIndex].subcategories[subIndex].parts.push(emptyPart());
    setServices(updated);
  };

 
  const deletePart = (catIndex: number, subIndex: number, partIndex: number) => {
    const updated = [...services];
    updated[catIndex].subcategories[subIndex].parts.splice(partIndex, 1);
    setServices(updated);
  };

 
  const handleLabourChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  catIndex: number,
  subIndex: number,
  labIndex: number
) => {
  const updated = [...services];
  const field = e.target.name as keyof Labour;

  const labourItem = {
    ...updated[catIndex].subcategories[subIndex].labour[labIndex],
    [field]: e.target.type === "number" ? Number(e.target.value) : e.target.value
  };

  // AUTO CALCULATE hourRate = Hours * Rate
  const hours = Number(labourItem.Hours) || 0;
  const rate = Number(labourItem.Rate) || 0;
  labourItem.hourRate = hours * rate;

  updated[catIndex].subcategories[subIndex].labour[labIndex] = labourItem;

  setServices(updated);
};
 
  const addLabour = (catIndex: number, subIndex: number) => {
    const updated = [...services];
    updated[catIndex].subcategories[subIndex].labour.push(emptyLabour());
    setServices(updated);
  };

  const deleteLabour = (catIndex: number, subIndex: number, labIndex: number) => {
    const updated = [...services];
    updated[catIndex].subcategories[subIndex].labour.splice(labIndex, 1);
    setServices(updated);
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Service Categories</h2>

      <button
        type="button"
        onClick={addCategory}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Category
      </button>

      {services.map((cat, catIndex) => (
        <div key={cat.id} className="border p-4 mb-5 rounded-lg">
          <div className="flex justify-between">
            <h3 className="font-bold text-xl">Category #{catIndex + 1}</h3>
            <button type="button" onClick={() => deleteCategory(catIndex)} className="text-red-600">
              Delete Category
            </button>
          </div>

          <input
            type="text"
            placeholder="Category Name"
            value={cat.categoryName}
            onChange={(e) => handleCategoryChange(e, catIndex)}
            className="border p-2 rounded w-full mt-3"
          />

          {cat.subcategories.map((sub, subIndex) => (
            <div key={sub.id} className="border p-3 rounded mt-4 bg-gray-50">
              <div className="flex justify-between">
                <h4 className="font-semibold">Subcategory #{subIndex + 1}</h4>
                <button  type="button"
                className="text-red-500" onClick={() => deleteSubcategory(catIndex, subIndex)}>
                  Delete
                </button>
              </div>

              <input
                name="name"
                placeholder="Subcategory Name"
                className="border p-2 rounded w-full mt-2"
                value={sub.name}
                onChange={(e) => {
                  const updated = [...services];
                  updated[catIndex].subcategories[subIndex].name = e.target.value;
                  setServices(updated);
                }}
              />

              <h5 className="font-semibold mt-3">Parts</h5>
              {sub.parts.map((part, partIndex) => (
                <div key={part.id} className="grid grid-cols-2 gap-3 mt-2">
                  <input
                    name="partNumber"
                    placeholder="Part Number"
                    type="number"
                    className="border p-2 rounded"
                    value={part.partNumber}
                    onChange={(e) => handlePartChange(e, catIndex, subIndex, partIndex)}
                  />
                  <input
                    name="partName"
                    placeholder="Part Name"
                    className="border p-2 rounded"
                    value={part.partName}
                    onChange={(e) => handlePartChange(e, catIndex, subIndex, partIndex)}
                  />
                  <input
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    className="border p-2 rounded"
                    value={part.quantity}
                    onChange={(e) => handlePartChange(e, catIndex, subIndex, partIndex)}
                  />
                  <input
                    name="costPer"
                    type="number"
                    placeholder="Cost Per"
                    className="border p-2 rounded"
                    value={part.costPer}
                    onChange={(e) => handlePartChange(e, catIndex, subIndex, partIndex)}
                  />
                  <input
                    name="taxPercent"
                    type="number"
                    placeholder="Tax %"
                    className="border p-2 rounded"
                    value={part.taxPercent}
                    onChange={(e) => handlePartChange(e, catIndex, subIndex, partIndex)}
                  />
                  <button
                  type="button"
                    className="text-red-500"
                    onClick={() => deletePart(catIndex, subIndex, partIndex)}
                  >
                    Delete Part
                  </button>
                </div>
              ))}
              <button
              type="button"
                onClick={() => addPart(catIndex, subIndex)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
              >
                + Add Part
              </button>

              <h5 className="font-semibold mt-4">Labour</h5>
              {sub.labour.map((lab, labIndex) => (
                <div key={lab.id} className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="labourname"
                    placeholder="Labour Name / Code"
                    value={lab.labourname}
                    onChange={(e) => handleLabourChange(e, catIndex, subIndex, labIndex)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="Rate"
                    placeholder="Rate"
                    value={lab.Rate}
                    onChange={(e) => handleLabourChange(e, catIndex, subIndex, labIndex)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="Hours"
                    placeholder="Hours"
                    value={lab.Hours}
                    onChange={(e) => handleLabourChange(e, catIndex, subIndex, labIndex)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="hourRate"
                    placeholder="Hour Rate"
                    value={lab.hourRate}
                    readOnly
                    onChange={(e) => handleLabourChange(e, catIndex, subIndex, labIndex)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="labourTax"
                    placeholder="Labour Tax "
                    value={lab.labourTax}
                    onChange={(e) => handleLabourChange(e, catIndex, subIndex, labIndex)}
                    className="border p-2 rounded"
                  />
                  <button
                  type="button"
                    className="text-red-500"
                    onClick={() => deleteLabour(catIndex, subIndex, labIndex)}
                  >
                    Delete Labour
                  </button>
                </div>
              ))}
              <button
              type="button"
                onClick={() => addLabour(catIndex, subIndex)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
              >
                + Add Labour
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addSubcategory(catIndex)}
            className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
          >
            + Add Subcategory
          </button>
        </div>
      ))}

      <button type="button" onClick={onClose} className="bg-black text-white px-4 py-2 rounded mt-6">
        Done
      </button>
    </div>
  );
};

export default ServicesForm;
