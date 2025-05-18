import React, { useState, useEffect, useContext } from "react";
import { Combobox } from "@headlessui/react";
import { FaCheck, FaChevronDown, FaCircle } from "react-icons/fa";
import searchIcon from "../../assets/icons/search.svg";
import { FaRegSquareCheck } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const projectStatusOptions = ["All Status", "Completed", "In Progress"];

const MyProjects = () => {
  const {  projects, setProjects , selectedProject, setSelectedProject, handleProjectClick } = useContext(AuthContext);
  // const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  // Fetch Projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.theugcmachine.com/projects/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        if (data.success) {
          const enriched = data.projects.map((proj, i) => ({
            id: proj.id,
            name: proj.projectName,
            status: proj.videoIDsInQueue.length === 0 ? "Completed" : "In Progress",
            videos: `${proj.videoIDs.length - proj.videoIDsInQueue.length }/${proj.videoIDs.length}`
          }));
          setProjects(enriched);
          console.log(data)
        } else {
          console.error("API returned failure:", data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

 
  // Filtered Projects
  const filteredProjects = projects.filter(
    (project) =>
      (project.name || "P Name").toLowerCase().includes(search.toLowerCase()) && // Default to empty string if project.name is undefined or null
      (filterStatus === "All Status" || project.status === filterStatus)
  );

  // Filtered Status Options
  const filteredStatusOptions =
    query === ""
      ? projectStatusOptions
      : projectStatusOptions.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );

      const handleViewClick = (projectID) => {
        // handleProjectClick(projectID); // This will set the selected project in the context
        navigate("/VideoDelivery"); // Navigate to the VideoDelivery page
      };
      
    
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="dashboard-title mb-8">My Projects</h1>
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-3 justify-between mb-6">
        {/* Search Input */}
        <div className="w-full relative md:w-1/2">
          <input
            type="text"
            placeholder="Search Project"
            className="w-full bg-[#ffffff1a] p-4 border rounded-2xl mb-2 md:mb-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={searchIcon}
            className="absolute top-1/2 -translate-y-1/2 right-2 z-10"
            alt=""
          />
        </div>

        {/* Filter Dropdown */}
        <Combobox value={filterStatus} onChange={setFilterStatus}>
          <div className="relative w-full md:w-1/2">
            <Combobox.Input
              className="w-full bg-[#ffffff1a] p-4 border rounded-2xl"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by Status"
            />
            <Combobox.Button className="absolute inset-y-0 right-4 flex items-center text-gray-500">
              <FaChevronDown />
            </Combobox.Button>
            <Combobox.Options className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md">
              {filteredStatusOptions.map((option, index) => (
                <Combobox.Option
                  key={index}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${active ? "bg-blue-500 text-white" : "text-black"
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex justify-between">
                      {option}
                      {selected && <FaCheck className="text-blue-500" />}
                    </div>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>

      {/* Projects Table */}
      <div className="overflow-x-auto border shadow-lg rounded-2xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-white bg-[#090A1E]">
              <th className="p-3 text-left text-base font-semibold">Project Name</th>
              <th className="p-3 text-left text-base font-semibold">Status</th>
              <th className="p-3 text-left text-base font-semibold">Videos Completed</th>
              <th className="p-3 text-left text-base font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">
                  Loading projects...
                </td>
              </tr>
            ) : filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">
                  No projects found.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project, index) => (
                <tr key={index} className="border-t text-[#9B9EB5] text-sm">
            {/* {console.log(filteredProjects)} */}
                  <td className="p-3">{project.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 flex items-center gap-1 text-sm font-semibold rounded-lg ${project.status === "Completed"
                          ? "text-[#1AE1AB]"
                          : "text-[#FFA800]"
                        }`}
                    >
                      {project.status === "Completed" ? (
                        <FaRegSquareCheck />
                      ) : (
                        <FaCircle />
                      )}{" "}
                      {project.status}
                    </span>
                  </td>
                  <td className="p-3">{project.videos}</td>
                  <td className="p-3">
                    <button
                    onClick={() => handleViewClick(project.id)} // Handle click to navigate
                     className="cursor-pointer flex items-center gap-2">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProjects;
