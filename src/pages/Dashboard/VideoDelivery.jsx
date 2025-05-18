import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const VideoDelivery = () => {
  const [loading, setLoading] = useState(true);
  const { projects, setProjects, selectedProject, setSelectedProject, handleProjectClick } = useContext(AuthContext);

  const [icon, setIcon] = useState("📁");
  // Fetch projects data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.theugcmachine.com/projects/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          },
        });
        const data = await response.json();
        if (data.success) {
          setProjects(data.projects); // Set projects data
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);



  const handleBackClick = () => {
    setSelectedProject(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="dashboard-title mb-3">Video Delivery</h1>
            {/* Disclaimer */}
            <p className="text-[#22DEAE] text-sm mb-2">Disclaimer: Videos will be available for 7 days only</p>

          </div>
          <p className="text-[#9B9EB5] text-sm tracking-[0.56px]">
            {selectedProject
              ? `${selectedProject.videoURLs.length || 0} Videos Ready For Delivery`
              : "Select a Project"
            }
          </p>
        </div>
        {selectedProject && (
          <button
            onClick={handleBackClick}
            className="px-6 bg-gradient-to-r from-[#1AE1AB] py-4 to-[#712FFF] font-bold uppercase font-[Apercu] text-white rounded-full cursor-pointer"
          >
            Back
          </button>
        )}
      </div>

      {/* Loading Message */}
      {loading ? (
        <div className="text-center text-gray-500 text-xl mt-6">
          Loading projects, please wait...
        </div>
      ) : (
        // Display Projects
        !selectedProject ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="shadow-lg rounded-lg overflow-hidden flex flex-col cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="p-4 text-center">
                  <span className="text-9xl">{icon}</span>
                  <h2 className="text-lg font-semibold">{project.projectName}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Display selected project details
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {selectedProject.videoURLs.length > 0 ? (
              selectedProject.videoURLs.map((url, index) => (
                <div key={index} className="shadow-lg rounded-lg overflow-hidden flex flex-col">
                  <video
                    src={url}
                    controls
                    className="h-96 rounded-2xl"
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold">Video {index + 1}</h2>
                  </div>
                </div>
              ))
            ) : (
              <p>No videos available for this project.</p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default VideoDelivery;
