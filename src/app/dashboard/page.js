import React from "react";

const Dashboard = () => {
  // Fake data for profile
  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "/images/profile-pic.jpg" // Replace with actual image URL
  };

  // Fake data for favorites
  const favorites = [
    { id: 1, title: "Favorite Item 1" },
    { id: 2, title: "Favorite Item 2" },
    { id: 3, title: "Favorite Item 3" }
  ];

  // Fake data for world news
  const worldNews = [
    {
      id: 1,
      title: "World News 1",
      description: "Description of World News 1",
      date: "April 20, 2024"
    },
    {
      id: 2,
      title: "World News 2",
      description: "Description of World News 2",
      date: "April 19, 2024"
    },
    {
      id: 3,
      title: "World News 3",
      description: "Description of World News 3",
      date: "April 18, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Box */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <button className="absolute top-0 right-0 mr-2 mt-2 text-white">
              ❌
            </button>
            <div className="flex items-center mb-4">
              <img
                src={profileData.image}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-2"
              />
              <h2 className="text-lg font-bold">{profileData.name}</h2>
            </div>
            <p>{profileData.email}</p>
          </div>

          {/* Favorites */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <button className="absolute top-0 right-0 mr-2 mt-2 text-white">
              ❌
            </button>
            <h2 className="text-lg font-bold mb-4">Favorites</h2>
            <div className="relative">
              <button className="bg-transparent border border-gray-600 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-left">
                ⭐️ Favorites
              </button>
              {/* Dropdown content */}
              <div className="absolute bg-gray-800 border border-gray-600 text-gray-200 rounded-lg mt-1 w-full z-10 hidden">
                {favorites.map(item => (
                  <div key={item.id} className="p-2 hover:bg-gray-700">
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live World News */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <button className="absolute top-0 right-0 mr-2 mt-2 text-white">
              ❌
            </button>
            <h2 className="text-lg font-bold mb-4">Live News</h2>
            {worldNews.map(news => (
              <div key={news.id} className="mb-2">
                <h3 className="text-lg font-semibold">{news.title}</h3>
                <p className="text-sm text-gray-400">{news.description}</p>
                <p className="text-xs text-gray-400">{news.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="mt-8 bg-gray-800 p-4 rounded-lg">
          <button className="absolute top-0 right-0 mr-2 mt-2 text-white">
            ⚙️
          </button>
          <h2 className="text-lg font-bold mb-4">Settings</h2>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 w-full">
              Profile
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 w-full">
              Help
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 w-full">
              Contact
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Refer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
