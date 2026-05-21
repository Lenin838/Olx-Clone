import Navbar from "../Navbar/Navbar"
import { useLocation } from "react-router-dom";
import { useState } from "react";


const Details = () => {
  const location = useLocation(); 
  const { item } = location.state || {}; 
  const [searchQuery, setSearchQuery] = useState('');

  if (!item) {
    return (
        <div>
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="flex flex-col items-center justify-center h-screen pt-20">
                <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
                <p className="text-gray-500">The product you are looking for does not exist or has been removed.</p>
            </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-white">
          <Navbar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />

          <div className="pt-24 px-4 sm:px-10 md:px-20 lg:px-40 pb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center h-[500px]">
                      <img className="max-h-full max-w-full object-contain" src={item.imageUrl} alt={item.title} />
                  </div>

                  <div className="flex flex-col gap-6">
                      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
                          <h1 className="text-4xl font-bold text-gray-900 mb-2">₹ {item.price}</h1>
                          <p className="text-xl text-gray-700 mb-4">{item.title}</p>
                          <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
                              <span>{item.category}</span>
                              <span>{item.createdAt}</span>
                          </div>
                      </div>

                      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
                          <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                          <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
                      </div>

                      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-teal-50">
                          <h2 className="text-xl font-bold text-teal-900 mb-2">Seller Information</h2>
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-teal-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                  {item.userName?.charAt(0).toUpperCase()}
                              </div>
                              <p className="text-lg font-semibold text-gray-800">{item.userName}</p>
                          </div>
                          <button className="w-full mt-6 bg-teal-900 text-white py-3 rounded font-bold hover:bg-teal-800 transition-colors">
                              Chat with Seller
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Details;