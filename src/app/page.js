"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [mapv, setMapv] = useState("");
  const [regionv, setRegionv] = useState("");
  const [densityv, setDensityv] = useState("");
  const [namev, setNamev] = useState("");

  const fetchData = async (queryParams) => {
    try {
      console.log("first try");
      // Define the base URL
      const baseURL = "http://127.0.0.1:8000/api/servers/";

      // Initialize an empty array to store URL parameters
      const queryParams = [];

      // Check if mapv is provided
      if (mapv) {
        queryParams.push(`map=${mapv}`);
      }

      // Check if regionv is provided
      if (regionv) {
        queryParams.push(`region=${regionv}`);
      }

      // Check if densityv is provided
      if (densityv) {
        queryParams.push(`density=${densityv}`);
      }

      // Check if namev is provided
      if (namev) {
        queryParams.push(`name=${encodeURIComponent(namev)}`);
      }

      // Construct the complete URL
      const url = new URL(
        baseURL + (queryParams.length > 0 ? "?" + queryParams.join("&") : "")
      );
      if (queryParams) {
        Object.keys(queryParams).forEach((key) =>
          url.searchParams.append(key, queryParams[key])
        );
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch all servers initially
  }, [mapv, densityv, regionv]);

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setNamev(e.target.value); // Update the search input state
  };

  // Function to handle form submission for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchParams = { name: namev }; // Search by name
    fetchData(searchParams); // Fetch data based on search criteria
  };

  const handleSelectChange = (boxIndex, e) => {
    console.log("🚀 ~ handleSelectChange ~ boxIndex:", boxIndex);
    const { value } = e.target;
    console.log("🚀 ~ handleSelectChange ~ value:", value);
    if (boxIndex === 0) {
      setRegionv(value);
    } else if (boxIndex === 1) {
      setDensityv(value);
    } else if (boxIndex === 2) {
      setMapv(value);
    }
    // setSelectedOptions((prevState) => ({
    //   ...prevState,
    //   [boxIndex]: value,
    // }));
    // Fetch data based on selected options
    //fetchData();
  };

  const buttons = [
    { label: "Button 1" },
    { label: "Button 2" },
    // Add more buttons as needed
  ];

  const boxes = [
    {
      region: "Region",
      options: [
        { label: "All", value: "" },
        { label: "🇪🇺 Europe", value: "EU" },
        { label: "🇺🇸  America", value: "US" },

      ],
    },
    {
      region: "Density",
      options: [
        { label: "All", value: "" },
        { label: "Heavy", value: "Heavy Traffic" },
        { label: "Light", value: "Light Traffic" },
        { label: "None", value: "None" },
      ],
    },
    {
      region: "Map",
      options: [
        { label: "All", value: "" },
        { label: "FDR", value: "FDR" },
        { label: "SRP", value: "SRP" },
        { label: "Akina", value: "Akina" },
        { label: "Horizon", value: "Horizon" },
        { label: "415", value: "415" },
        { label: "Fruitlines", value: "Fruitlines" },
        { label: "California", value: "California" },
        { label: "Nordschleife", value: "Nordschleife" },
      ],
    },
  ];

  return (
    <div className="w-full my-10 gap-5 flex flex-col container-section">
      <div className="flex  items-center justify-center gap-5">
        {boxes.map((box, index) => (
          <form key={index} className="">
            <div className="bg-blur flex border border-content-primary/10 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 w-full p-2.5">
              <p>{box.region}:</p>
              <select
                id={`countries-${index}`}
                className="bg-transparent border-none focus:border-none"
                value={""}
                onChange={(e) => handleSelectChange(index, e)}
              >
                {box.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </form>
        ))}
      </div>

      <form class="max-w-lg mx-auto" onSubmit={handleSearchSubmit}>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by name..."
            required
            value={namev}
            onChange={handleSearchInputChange}
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="hidden xl:grid grid-cols-12 gap-x-3 text-base text-content-secondary font-inter w-full">
        <p className="col-span-3">Name</p>
        <p className="col-span-2 text-center">Traffic Density</p>
        <p className="col-span-2">Map</p>
        <p className="text-center">Region</p>
        <div className="flex justify-end items-start gap-2">
          <svg className="progress-ring" width="30" height="30">
            {/* SVG content */}
          </svg>
          <div className="relative flex-wrap group pt-[2px]">
            <div className="absolute p-3 hidden group-hover:inline-block -top-14 right-0 gap-3 bg-top-dark-83 rounded-md border border-border backdrop-blur-16 whitespace-nowrap">
              Servers updating after one minute.
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            >
              {/* SVG content */}
            </svg>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-6">
        {data?.servers?.map((row, index) => (
          <div
            key={index}
            className="hidden xl:grid grid-cols-12 gap-x-3 text-base text-content-secondary font-inter w-full rounded-lg p-4 pl-6 bg-top-light-2 border-l-8 border-top-light-10 hover:bg-top-light-10 translate-x-0 hover:translate-x-8 duration-1000"
          >
            <h6 className="col-span-3 h6-inter line-clamp-1 text-ellipsis text-content-primary">
              {row.name}
            </h6>
            <p className="translate-x-0 transition duration-1000 col-span-2 text-center">
              {row.density}
            </p>
            <p className="col-span-2 flex gap-2 items-center translate-x-0 transition duration-1000">
              {row.map}
            </p>
            <p className="flex items-center justify-center translate-x-0 transition duration-1000">
              {row.region}
            </p>
            <div className="justify-self-end self-center flex gap-2 items-center h-[120%]">
              <div className="relative h-full flex items-center">
                <button className="hidden hover:bg-top-light-10 rounded-sm p-1">
                  <img
                    src=""
                    alt=""
                    className="opacity-30 hover:opacity-60 h-5 w-5"
                  />
                </button>
              </div>
              <div className="relative h-full flex items-center">
                <button className="hidden hover:bg-top-light-10 rounded-sm p-1">
                  <img
                    src=""
                    alt=""
                    className="opacity-30 hover:opacity-60 h-5 w-5"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="rounded-md flex items-center justify-center p-2 px-3 w-10 h-10 sm:w-14 sm:h-14 sm:p-4 sm:px-5 text-md slnt-10 font-bold font-roboto bg-background text-content-primary border border-content-tertiary disabled:bg-top-light-10 disabled:border-0 hover:bg-top-light-10 transition-all duration-500"
          >
            {index === 0 || index === buttons.length - 1 ? (
              <img src="" alt="" />
            ) : (
              button.label
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
