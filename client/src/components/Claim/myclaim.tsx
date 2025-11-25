import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../common/hearder";
import { BiMinusBack, BiPlus } from "react-icons/bi";
import DocumentModal from "./submission";
interface Part {
    partNumber: string;
    partName: string;
    quantity: number;
    costPer: number;
    taxPercent: number;
}

interface Labour {
    labourName: string;
    Rate: number;
    Hours: number;
    hourRate: number;
    labourTax: number;
}

interface Subcategory {
    name: string;
    parts?: Part[];
    labour?: Labour[];
}

interface Service {
    categoryName: string;
    subcategories: Subcategory[];
}

interface Sublet {
    name: string;
    quantity: number;
    costPer: number;
    requested: number;
    status: string;
}

interface Client {
    _id: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    vehicleNo?: string;
}

interface Claim {
    _id: string;
    claimnumber: string;
    repairno: string;
    currentODOMeter: number;
    type: string;
    date: string;
    clientName: string | Client;
    assignedTo: any;
    vehicleNo: string;
    statusAmounts: Record<string, number>;
    sublets: Sublet[];
    services?: Service[];
}

const MyClaims = () => {
    const [claims, setClaims] = useState<Claim[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, Set<number>>>({});
    const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, Record<number, Set<number>>>>({});
    const token = localStorage.getItem("authToken");
    const [client, setClient] = useState<any>(null);
    const [clientIdd, setclientIdd] = useState("")
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                console.log("Tojen is ", token)
                const response = await axios.get("http://localhost:3000/claim/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Resposne of my claim is ", response)
                setClaims(response.data.data);
                console.log(
                    "Response of my claim is",
                    response.data.data[0]?.clientName?._id
                );

                setclientIdd(response.data.data[0].clientName._id)
            } catch (err) {
                console.error("Error fetching claims:", err);
            }
        };

        fetchClaims();
    }, [token]);

    useEffect(() => {
        if (!clientIdd) return;

        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/client/${clientIdd}`);
                setClient(response.data.data);
            } catch (err) {
                console.error("Error fetching client:", err);
            }
        };

        fetchClient();
    }, [clientIdd]);


    const toggleCategory = (claimId: string, index: number) => {
        setExpandedCategories(prev => {
            const copy = { ...prev };
            if (!copy[claimId]) copy[claimId] = new Set();
            copy[claimId].has(index) ? copy[claimId].delete(index) : copy[claimId].add(index);
            return copy;
        });
    };

    const toggleSubcategory = (claimId: string, categoryIndex: number, subIndex: number) => {
        setExpandedSubcategories(prev => {
            const copy = { ...prev };
            if (!copy[claimId]) copy[claimId] = {};
            if (!copy[claimId][categoryIndex]) copy[claimId][categoryIndex] = new Set();
            copy[claimId][categoryIndex].has(subIndex)
                ? copy[claimId][categoryIndex].delete(subIndex)
                : copy[claimId][categoryIndex].add(subIndex);
            return copy;
        });
    };

    return (
        <>
            <Header />
            <div className="max-w-[1400px] mx-auto p-4 mt-4 space-y-10">
                <h2 className="text-3xl font-bold mb-4">My Claims</h2>
                {claims.map((claim) => {
                    let totalP = 0;
                    let totalL = 0;
                    let totalS = 0;

                    claim.sublets?.forEach(s => (totalS += s.requested));
                    claim.services?.forEach((cat) => {
                        cat.subcategories.forEach(sub => {
                            sub.parts?.forEach(p => (totalP += p.costPer * p.quantity + p.taxPercent));
                            sub.labour?.forEach(l => (totalL += l.Rate * l.Hours + l.labourTax));
                        });
                    });

                    return (
                        <div key={claim._id} className="bg-gray-100 p-4 rounded shadow space-y-6">
                            <p className="text-2xl font-semibold">CL-{claim.claimnumber}</p>


                            <div className="grid grid-cols-6 gap-y-2 text-sm bg-white p-4 rounded-lg shadow">
                                <p className="font-semibold text-gray-600">TYPE</p>
                                <p className="font-semibold text-gray-600">RO NUMBER</p>
                                <p className="font-semibold text-gray-600">CURRENT ODO</p>
                                <p className="font-semibold text-gray-600">DATE</p>
                                <p className="font-semibold text-gray-600">CLIENT NAME</p>
                                <p className="font-semibold text-gray-600">VEHICLE NUMBER</p>

                                <p>{claim.type}</p>
                                <p>{claim.repairno}</p>
                                <p>{claim.currentODOMeter}</p>
                                <p>{new Date(claim.date).toLocaleDateString()}</p>
                                <p>{typeof claim.clientName === "string" ? claim.clientName : claim.clientName.name}</p>
                                <p>{claim.vehicleNo}</p>
                            </div>


                            <div className="bg-white p-4 rounded-lg shadow">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="border px-4 py-2 text-left">STATUS</th>
                                            <th className="border px-4 py-2 text-left">AMOUNT</th>
                                            <th className="border px-4 py-2 text-left">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {Object.entries(claim.statusAmounts).map(([status, amount], i, arr) => {
                                            const dot =
                                                status === "Authorized"
                                                    ? "bg-green-800"
                                                    : status === "Pending"
                                                        ? "bg-yellow-500"
                                                        : "";

                                            return (
                                                <tr key={status}>
                                                    <td className="border px-4 py-2 flex items-center gap-2">
                                                        {dot && <span className={`w-3 h-3 rounded-full ${dot}`}></span>}
                                                        {status}
                                                    </td>
                                                    <td className="border px-4 py-2">${amount}</td>
                                                    {i === 0 && (
                                                        <td className="border px-4 py-2" rowSpan={arr.length}>
                                                            <div className="p-6">
                                                                <button
                                                                    onClick={() => setModalOpen(true)}
                                                                    className="bg-black text-white px-4 py-2 rounded-[200px] "
                                                                >
                                                                    Submit for Paymemnt
                                                                </button>

                                                                <DocumentModal
                                                                    isOpen={modalOpen}
                                                                    onClose={() => setModalOpen(false)}
                                                                    claimId={claim._id}
                                                                />

                                                            </div>

                                                            <p className="text-sm mt-2 text-gray-600">
                                                                Approx. approval: 1 business day
                                                            </p>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}


                                    </tbody>
                                </table>
                            </div>



                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-semibold mb-2">Sublets</h3>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="border px-4 py-2">Name</th>
                                            <th className="border px-4 py-2">Qty</th>
                                            <th className="border px-4 py-2">Cost Per</th>
                                            <th className="border px-4 py-2">Requested</th>
                                            <th className="border px-4 py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claim.sublets?.map((s, i) => (
                                            <tr key={i}>
                                                <td className="border px-4 py-2">{s.name}</td>
                                                <td className="border px-4 py-2">{s.quantity}</td>
                                                <td className="border px-4 py-2">${s.costPer}</td>
                                                <td className="border px-4 py-2">${s.requested}</td>
                                                <td className="border px-4 py-2">{s.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                            {claim.services?.map((service, serviceIndex) => (
                                <div key={serviceIndex} className="bg-white p-4 rounded-lg shadow mt-4">
                                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleCategory(claim._id, serviceIndex)}>
                                        {expandedCategories[claim._id]?.has(serviceIndex) ? (
                                            <BiMinusBack className="w-6 h-6 text-blue-600" />
                                        ) : (
                                            <BiPlus className="w-6 h-6 text-blue-600" />
                                        )}
                                        <span className="text-lg font-bold">{service.categoryName}</span>
                                    </div>

                                    {expandedCategories[claim._id]?.has(serviceIndex) && (
                                        <div className="ml-6 mt-3 space-y-4">
                                            {service.subcategories.map((subcat, subIndex) => (
                                                <div key={subIndex} className="border-l-2 pl-4">
                                                    <div
                                                        className="flex items-center gap-2 cursor-pointer"
                                                        onClick={() => toggleSubcategory(claim._id, serviceIndex, subIndex)}
                                                    >
                                                        {expandedSubcategories[claim._id]?.[serviceIndex]?.has(subIndex) ? (
                                                            <BiMinusBack className="w-5 h-5 text-green-600" />
                                                        ) : (
                                                            <BiPlus className="w-5 h-5 text-green-600" />
                                                        )}
                                                        <span className="font-semibold">{subcat.name}</span>
                                                    </div>

                                                    {expandedSubcategories[claim._id]?.[serviceIndex]?.has(subIndex) && (
                                                        <div className="ml-6 mt-2 space-y-4">
                                                            {subcat.parts && (
                                                                <table className="w-full border-collapse bg-white rounded shadow">
                                                                    <thead>
                                                                        <tr className="bg-gray-50">
                                                                            <th className="border px-2 py-1">Part Number</th>
                                                                            <th className="border px-2 py-1">Part Name</th>
                                                                            <th className="border px-2 py-1">Qty</th>
                                                                            <th className="border px-2 py-1">Cost per</th>
                                                                            <th className="border px-2 py-1">Tax</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {subcat.parts.map((p, i) => (
                                                                            <tr key={i}>
                                                                                <td className="border px-2 py-1">{p.partNumber}</td>
                                                                                <td className="border px-2 py-1">{p.partName}</td>
                                                                                <td className="border px-2 py-1">{p.quantity}</td>
                                                                                <td className="border px-2 py-1">${p.costPer}</td>
                                                                                <td className="border px-2 py-1">${p.taxPercent}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            )}

                                                            {subcat.labour && (
                                                                <table className="w-full border-collapse bg-white rounded shadow mt-2">
                                                                    <thead>
                                                                        <tr className="bg-gray-50">
                                                                            <th className="border px-2 py-1">Labour Name</th>
                                                                            <th className="border px-2 py-1">Rate</th>
                                                                            <th className="border px-2 py-1">Hours</th>
                                                                            <th className="border px-2 py-1">Total</th>
                                                                            <th className="border px-2 py-1">Tax</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {subcat.labour.map((l, i) => (
                                                                            <tr key={i}>
                                                                                <td className="border px-2 py-1">{l.labourName}</td>
                                                                                <td className="border px-2 py-1">${l.Rate}</td>
                                                                                <td className="border px-2 py-1">{l.Hours}</td>
                                                                                <td className="border px-2 py-1">${l.hourRate}</td>
                                                                                <td className="border px-2 py-1">${l.labourTax}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}


                            <div className="flex justify-center mt-10">
                                <table className="w-[1000px] border-collapse bg-white shadow rounded-lg">
                                    <tbody>
                                        <tr className="bg-gray-50">
                                            <td className="border px-4 py-2">Total</td>
                                            <td className="border px-4 py-2 text-right">Requested</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Parts Total</td>
                                            <td className="border px-4 py-2 text-right">${totalP}</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="border px-4 py-2">Labour Total</td>
                                            <td className="border px-4 py-2 text-right">${totalL}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Sublet Total</td>
                                            <td className="border px-4 py-2 text-right">${totalS}</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="border px-4 py-2 font-semibold">Grand Total</td>
                                            <td className="border px-4 py-2 font-bold text-right">${totalP + totalL + totalS}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mx-20 mt-4">
                                <h2 className="text-xl font-bold mb-4">Other Details</h2>
                                <div className="flex gap-4">

                                    <div className="bg-white shadow rounded-lg p-4 flex-1 text-center">
                                        <span className="font-semibold block mb-1">Arrived</span>
                                        <span className="text-gray-700">Yes</span>
                                    </div>

                                    <div className="bg-white shadow rounded-lg p-4 flex-1 text-center">
                                        <span className="font-semibold block mb-1">Commercial Use</span>
                                        <span className="text-gray-700">No</span>
                                    </div>

                                    <div className="bg-white shadow rounded-lg p-4 flex-1 text-center">
                                        <span className="font-semibold block mb-1">Physical Damage</span>
                                        <span className="text-gray-700">None</span>
                                    </div>

                                    <div className="bg-white shadow rounded-lg p-4 flex-1 text-center">
                                        <span className="font-semibold block mb-1">Modifications</span>
                                        <span className="text-gray-700">Minor</span>
                                    </div>

                                </div>
                            </div>


                        </div>
                    );



                })}
                {client && (
                    <div className="mx-40 mt-6 bg-white p-6 rounded-lg shadow flex items-center gap-12">

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {client.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="mt-2 font-semibold text-lg">{client.name}</span>
                        </div>


                        <div className="flex gap-80">
                            <div className="mx-30 flex flex-col">
                                <span className="font-semibold">Phone</span>
                                <span className="text-gray-700">{client.phone}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Email</span>
                                <span className="text-gray-700">{client.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Address</span>
                                <span className="text-gray-700">{client.address}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Vehicle No</span>
                                <span className="text-gray-700">{client.vehicleNo}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyClaims;
