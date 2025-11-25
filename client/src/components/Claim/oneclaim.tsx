import { useEffect, useState } from "react";
import Header from "../../common/hearder";
import { useParams } from "react-router";
import { BiMinusBack, BiPlus } from "react-icons/bi";
import axios from "axios";

const One = () => {

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

    interface Claim {
        _id: string;
        claimnumber: string;
        repairno: string;
        currentODOMeter: number;
        type: string;
        date: string;
        clientName: string;  
        assignedTo: string;
        vehicleNo: string;
        statusAmounts: Record<string, number>;
        sublets: Sublet[];
        services?: Service[];
    }

    const [claim, setClaim] = useState<Claim | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
    const [expandedSubcategories, setExpandedSubcategories] = useState<Record<number, Set<number>>>({});

    const [totalP, settotalP] = useState(0);
    const [totalL, settotall] = useState(0);
    const [totalS, settotalS] = useState(0);

    const [clientId, setClientId] = useState<string>("");
    const [client, setClient] = useState<any>(null);

    const claimId = useParams().id;

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await axios.get(`http://localhost:3000/claim/${claimId}`);
            const claimData = response.data.data;
            console.log("Data", claimData.clientName)

            setClaim(claimData);

          
            setClientId(claimData.clientName._id);
            console.log("Client id",claimData.clientName._id)

            if (claimData.sublets?.length > 0) {
                let totalSublet = 0;
                claimData.sublets.forEach((s: any) => {
                    totalSublet += s.requested;
                });
                settotalS(totalSublet);
            }

       
            if (claimData.services?.length > 0) {
                let totalParts = 0;
                let totalLabour = 0;

                claimData.services.forEach((cat: any) => {
                    cat.subcategories.forEach((sub: any) => {
                        sub.parts?.forEach((p: any) => {
                            totalParts += p.costPer * p.quantity + p.taxPercent;
                        });

                        sub.labour?.forEach((l: any) => {
                            totalLabour += l.Rate * l.Hours + l.labourTax;
                        });
                    });
                });

                settotalP(totalParts);
                settotall(totalLabour);
            }
        };

        fetchDetails();
    }, [claimId]);


    useEffect(() => {
        if (!clientId) return;

        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/client/${clientId}`);
                setClient(response.data.data);
            } catch (err) {
                console.error("Error fetching client:", err);
            }
        };

        fetchClient();
    }, [clientId]);

    const toggleCategory = (index: number) => {
        setExpandedCategories(prev => {
            const s = new Set(prev);
            s.has(index) ? s.delete(index) : s.add(index);
            return s;
        });
    };

    const toggleSubcategory = (categoryIndex: number, subIndex: number) => {
        setExpandedSubcategories(prev => {
            const copy = { ...prev };
            if (!copy[categoryIndex]) copy[categoryIndex] = new Set();
            copy[categoryIndex].has(subIndex)
                ? copy[categoryIndex].delete(subIndex)
                : copy[categoryIndex].add(subIndex);
            return copy;
        });
    };

    return (
        <>
            <Header />

            <div className="bg-gray-100 min-h-screen pb-20">

                {claim ? (
                    <div className="mx-40 pt-12 space-y-6">

                        <p className="text-4xl font-semibold">CL-{claim.claimnumber}</p>

                        <div className="grid grid-cols-6 gap-y-2 text-sm bg-white p-4 rounded-lg shadow">
                            <p className="font-semibold text-gray-600">TYPE</p>
                            <p className="font-semibold text-gray-600">RO NUMBER</p>
                            <p className="font-semibold text-gray-600">CURRENT ODO</p>
                            <p className="font-semibold text-gray-600">DATE</p>
                            <p className="font-semibold text-gray-600">CLIENT NAME</p>
                            <p className="font-semibold text-gray-600">VEHICLE NUMBER</p>

                            <p className="font-semibold">{claim.type}</p>
                            <p className="font-semibold">{claim.repairno}</p>
                            <p className="font-semibold">{claim.currentODOMeter}</p>
                            <p className="font-semibold">{new Date(claim.date).toLocaleDateString("en-US")}</p>

                        
                            <p className="font-semibold">
                                {client ? client.name : "Loading..."}
                            </p>

                            <p className="font-semibold">{claim.vehicleNo}</p>
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

                        {claim.sublets && (
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-2xl font-semibold mb-4">Sublets</h2>

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
                                        {claim.sublets.map((s, i) => (
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
                        )}

               
                        {claim?.services?.map((service, serviceIndex) => (
                            <div key={serviceIndex} className="bg-white p-4 rounded-lg shadow mt-6">

                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => toggleCategory(serviceIndex)}
                                >
                                    {expandedCategories.has(serviceIndex)
                                        ? <BiMinusBack className="w-6 h-6 text-blue-600" />
                                        : <BiPlus className="w-6 h-6 text-blue-600" />}
                                    <span className="text-lg font-bold">{service.categoryName}</span>
                                </div>

                                {expandedCategories.has(serviceIndex) && (
                                    <div className="ml-6 mt-3 space-y-4">
                                        {service.subcategories.map((subcat, subIndex) => (
                                            <div key={subIndex} className="border-l-2 pl-4">

                                                <div
                                                    className="flex items-center gap-2 cursor-pointer"
                                                    onClick={() => toggleSubcategory(serviceIndex, subIndex)}
                                                >
                                                    {expandedSubcategories[serviceIndex]?.has(subIndex)
                                                        ? <BiMinusBack className="w-5 h-5 text-green-600" />
                                                        : <BiPlus className="w-5 h-5 text-green-600" />}
                                                    <span className="font-semibold">{subcat.name}</span>
                                                </div>

                                                {expandedSubcategories[serviceIndex]?.has(subIndex) && (
                                                    <div className="ml-6 mt-2 space-y-4">

                                                        {/* PARTS TABLE */}
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
                ) : (
                    <p className="text-center py-20">Loading claim details...</p>
                )}

                {client && (
                    <div className="mx-40 mt-6 bg-white p-6 rounded-lg shadow flex items-center gap-12">

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {client.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="mt-2 font-semibold text-lg">{client.name}</span>
                        </div>

                        <div className="flex gap-80">
                            <div className="flex flex-col">
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

export default One;
