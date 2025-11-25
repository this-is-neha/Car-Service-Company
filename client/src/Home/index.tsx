import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../common/hearder";

const images = ["/images/image.png", "/images/ser.jpg"];

const Homepage = () => {
  const [currentImage, setCurrentImage] = useState(0);
const role=localStorage.getItem("role")
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-500 px-4 py-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-10">
       
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Welcome to the Ford
              <br />
              Service center
            </h1>
            <p className="text-gray-600 font-semibold text-xl mb-8">
              Explore the services 
            </p>


             {role === "admin" && (
  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
    <Link
      to="/employe"
      className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-md text-center"
    >
      View Workers
    </Link>

    <Link
      to="/client"
      className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition shadow-md text-center"
    >
      View Clients
    </Link>
      <Link
      to="/all/payment"
      className="bg-orange-400 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition shadow-md text-center"
    >
      View Payment
    </Link>
  </div>
)}

          </div>

          
          <div className="flex-1 flex justify-end">
            <img
              src={images[currentImage]}
              alt="Dashboard Hero"
              className="w-[9000px] h-[600px] object-cover rounded-2xl drop-shadow-xl"
            />
          </div>
        </div>

      
   

<div className="flex flex-wrap gap-2 justify-start">
  {[
    "Insurance Claim Handling",
    "Motor Accident Support",
    "Workshop Management",
    "Document & File Tracking",
    "Customer Service Assistance",
    "Vehicle Assessment Reporting",
  ].map((service, i) => (
    <div
      key={i}
      className="bg-white p-10 mt-10  mx-2  rounded-3xl shadow-lg hover:shadow-2xl transition border border-gray-200 flex flex-col justify-between h-full w-[600px]"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{service}</h3>
      <p className="text-gray-600 text-base leading-relaxed">
        High quality, reliable and fast service.
      </p>
    </div>
  ))}
</div>

      </div>
    </>
  );
};

export default Homepage;
