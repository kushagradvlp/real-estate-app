import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import homeImage1 from "../assets/images/home_image_1.jpg";
import homeImage2 from "../assets/images/home_image_2.jpg";
import homeImage3 from "../assets/images/home_image_3.jpg";
const imageMap = [homeImage1, homeImage2, homeImage3];


const Home = () => {
  return (
    <div className="text-center bg-orange-400 text-white py-20 px-6">
      <h1 className="text-5xl font-bold">The Smarter, Faster, Dreamier Home Search</h1>
      <p className="text-xl mt-4">Find your perfect home with RealEstateAI</p>
      <div className="hidden md:flex space-x-20 text-xl font-medium text-gray-700">
        <Link to="/listings" className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-gray-100">Homes for Sale</Link>
        <Link to="/prices" className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-gray-100">Sold Home Prices</Link>
      </div>
    </div>
  );
};


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-6 bg-white shadow-md border-b border-gray-200">
      <div className="text-3xl font-bold text-gray-900">RealEstateAI</div>
      <div className="hidden md:flex space-x-20 text-xl font-medium text-gray-700">
        <Link to="/" className="hover:text-gray-900 transition duration-300">Home</Link>
        <Link to="/listings" className="hover:text-gray-900 transition duration-300">Listings</Link>
        <Link to="/chatbot" className="hover:text-gray-900 transition duration-300">Chatbot</Link>
        <Link to="/dashboard" className="hover:text-gray-900 transition duration-300">Dashboard</Link>
        <Link to="/login" className="border border-gray-900 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-900 hover:text-white transition duration-300">Login</Link>
      </div>
    </nav>
  );
};


const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");


  useEffect(() => {
    fetch("/properties.json") // Replace with API endpoint later
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((property, index) => ({
          ...property,
          image: imageMap[index % 3],  // Assigning imported images
        }));
        setProperties(updatedData);
        setFilteredProperties(updatedData);
      });
  }, []);
  
  useEffect(() => {
    let filtered = properties.filter((property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "all" || property.type === selectedType)
    );

    if (sortOrder === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(filtered);
  }, [searchQuery, selectedType, sortOrder, properties]);

  return (
    <div className="p-16">
      <h2 className="text-5xl font-bold text-gray-800 text-center mb-12">Featured Listings</h2>
      
      {/* Search, Filter, and Sort Section */}
      <div className="flex justify-center gap-8 mb-8">
        <input
          type="text"
          placeholder="Search for properties..."
          className="border border-gray-400 p-3 rounded-lg w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border border-gray-400 p-3 rounded-lg"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
        </select>
        <select
          className="border border-gray-400 p-3 rounded-lg"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {filteredProperties.map((property) => (
          <div key={property.id} className="border shadow-lg rounded-lg p-8">
            <img src={property.image} alt={property.title} className="rounded-lg w-full h-40 object-cover" />
            <h3 className="text-xl font-semibold mt-6">{property.title}</h3>
            <p className="text-gray-700 text-lg">{property.location}</p>
            <p className="text-xl font-bold text-blue-600">${property.price}</p>
            <p className="text-md text-gray-600 capitalize">{property.type}</p>
            <Link to={`/property/${property.id}`} className="block mt-6 bg-orange-500 text-white text-center py-3 rounded-lg hover:bg-orange-600">View Details</Link>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Property Locations</h3>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "500px" }}
            center={{ lat: 43.65107, lng: -79.347015 }} // Default to Toronto
            zoom={10}
          >
            {filteredProperties.map((property) => (
              property.latitude && property.longitude && (
                <Marker
                  key={property.id}
                  position={{ lat: property.latitude, lng: property.longitude }}
                />
              )
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};



const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch("/properties.json") // Replace with API endpoint later
      .then((res) => res.json())
      .then((data) => {
        const selectedProperty = data.find((p) => p.id === parseInt(id));
        setProperty(selectedProperty);
      });
  }, [id]);

  if (!property) return <div className="text-center py-20 text-2xl">Loading...</div>;

  return (
    <div className="p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img src={property.image} alt={property.title} className="rounded-lg w-full h-96 object-cover" />
        <h2 className="text-4xl font-bold mt-4">{property.title}</h2>
        <p className="text-lg text-gray-700 mt-2">{property.location}</p>
        <p className="text-2xl font-bold text-blue-600 mt-4">${property.price}</p>
        <p className="text-gray-700 mt-4">{property.description}</p>
      </div>
    </div>
  );
};

export { Navbar, Home, Listings, PropertyDetails };