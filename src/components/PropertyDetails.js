import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch("/properties.json") // Fetch from the public folder
      .then((res) => res.json())
      .then((data) => {
        const foundProperty = data.find((prop) => prop.id === parseInt(id));
        setProperty(foundProperty);
      });
  }, [id]);

  if (!property) {
    return <div className="text-center text-red-500 text-xl mt-10">Property not found.</div>;
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800">{property.title}</h2>
      <p className="text-gray-600 text-lg">{property.location}</p>
      <img src={property.image} alt={property.title} className="rounded-lg w-full h-80 object-cover mt-6" />
      <p className="text-xl font-bold text-blue-600 mt-6">${property.price}</p>
      <p className="text-lg text-gray-700 mt-4">{property.description || "No description available."}</p>
      <div className="mt-6 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-2xl font-semibold">Property Details</h3>
        <p className="text-md text-gray-600">Type: {property.type}</p>
        <p className="text-md text-gray-600">Bedrooms: {property.bedrooms || "N/A"}</p>
        <p className="text-md text-gray-600">Bathrooms: {property.bathrooms || "N/A"}</p>
      </div>
      <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-600">
        Contact Seller
      </button>
    </div>
  );
};

export default PropertyDetails;
