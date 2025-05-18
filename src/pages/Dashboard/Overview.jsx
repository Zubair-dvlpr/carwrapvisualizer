import React, { useEffect, useState } from 'react';
import { FaUsers, FaChartLine, FaProjectDiagram } from 'react-icons/fa';
import welcomebg from '../../assets/images/welcomebg.webp'
import welcvideoCreatedomebg from '../../assets/icons/videoCreated.svg'
import folderIcon from '../../assets/icons/folder.svg'
import AvailableIcon from '../../assets/icons/available.svg'
import { Link } from 'react-router-dom';
import PricingPlan from './PricingPlan';
import GetPlan from '../../assets/icons/GetPlan';
import pricingplan from "../../assets/icons/pricingplan.svg";
const Overview = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [credits, setCredits] = useState(0);

  const infoData = [
    { id: 1, icon: welcvideoCreatedomebg, value: totalVideos, label: "Videos Created", bgGradient: "from-[#712fff] to-[#1ae1ab]" },
    { id: 2, icon: folderIcon, value: totalProjects, label: "Active Projects", bgGradient: "from-[#712fff] to-[#1ae1ab]" },
    { id: 3, icon: AvailableIcon, value: credits, label: "Available Credits", bgGradient: "from-[#712fff] to-[#1ae1ab]" },
  ];



  const user = JSON.parse(localStorage.getItem("user"));
  // Fetch Projects from API
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await fetch("https://api.theugcmachine.com/projects/", {
  //         method: "GET",
  //         headers: {
  //           "Authorization": `Bearer ${user.token}`,
  //           "Content-Type": "application/json"
  //         }
  //       });
  //       const data = await response.json();
  //       if (data.success) {
  //         // Set total projects
  //         setTotalProjects(data.projects.length);

  //         // Calculate total video count (sum of videoURLs.length for all projects)
  //         const videoCount = data.projects.reduce((acc, project) => {
  //           return acc + (project.videoURLs ? project.videoURLs.length : 0);
  //         }, 0);

  //         // Set total videos
  //         setTotalVideos(videoCount);
  //       } else {
  //         console.error("API returned failure:", data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch projects:", error);
  //     } finally {

  //     }
  //   };

  //   fetchProjects();
  // }, []);





  const [billingData, setBillingData] = useState([]);
    const [showplans, setShowplans] = useState(false);
    const [newplans, setNewplans] = useState([]);
    const [newloading, setNewLoading] = useState(true);
    // Retrieve the user object from localStorage
    // const user = JSON.parse(localStorage.getItem("user"));
    // useEffect(() => {
    //   const fetchPlans = async () => {
    //     if (!user?.token) {
    //       alert("User not authenticated");
    //       return;
    //     }
  
    //     try {
    //       const response = await fetch('https://api.theugcmachine.com/billing/plans', {
    //         headers: {
    //           'Authorization': `Bearer ${user.token}`
    //         }
    //       });
    //       const data = await response.json();
    //       // console.log("ddd", data);
    //       if (data?.success && Array.isArray(data.plans)) {
    //         // Map and format plans
    //         const formattedPlans = data.plans.map(plan => ({
    //           id: plan.id,
    //           name: plan.name.toUpperCase() + ' PLAN',
    //           price: `$${(plan.prices[0].amount).toFixed(2)}`,
    //           credits: plan.credits,
    //           priceId: plan.prices[0].id,
    //           customCharacters: plan.credits >= 2000 ? "10" : plan.credits >= 950 ? "03" : "01", // Custom logic
    //           btnprice: `$${(plan.prices[0].amount / plan.credits).toFixed(4)}`,
    //           icon: pricingplan
    //         }));
    //         setNewplans(formattedPlans);
    //         setNewLoading(false); // Set loading to false once data is fetched
  
    //       } else {
    //         alert("Failed to load plans");
    //         setNewLoading(false); // Ensure loading is turned off on failure
    //       }
    //     } catch (error) {
    //       console.error("Error fetching plans:", error);
    //       // alert("Error loading pricing plans.");
    //       setNewLoading(false); // Ensure loading is turned off on failure
    //     }
    //   };
  
    //   fetchPlans();
  
    // }, []);
  
  
  
  
  
    const [userData, setUserData] = useState(null);
    const currentPlan = newplans.find(plan => plan.id === userData?.plan);
  
    // useEffect(() => {
    //   if (!user) {
    //     console.error("User is not available in localStorage");
    //     return;
    //   }
  
    //   const planData = async () => {
    //     const apiUrl = `https://api.theugcmachine.com/user/`;
  
    //     try {
    //       const response = await fetch(apiUrl, {
    //         method: 'GET',
    //         headers: {
    //           'Authorization': `Bearer ${user.token}`,
    //           'Content-Type': 'application/json',
    //         },
    //       });
  
    //       const data = await response.json();
    //       // console.log("API Response:", data);
  
    //       if (data.success && data.user) {
    //         setUserData(data.user); // ✅ Save user data here
    //         setCredits(data.user.credits);
    //         console.log("API Response user:", data);
    //       }
  
    //     } catch (error) {
    //       console.error("Error fetching billing data:", error);
    //     }
    //   };
  
    //   planData();
    // }, []);
    // Add user as a dependency, so the effect runs when `user` changes
  
  
    // useEffect(() => {
    //   const fetchBillingData = async () => {
    //     const apiUrl = "https://api.theugcmachine.com/billing/invoices";
  
    //     try {
    //       const response = await fetch(apiUrl, {
    //         method: 'GET',
    //         headers: {
    //           'Authorization': `Bearer ${user.token}`, // Include the Bearer token
    //           'Content-Type': 'application/json',
    //         },
    //       });
  
    //       const data = await response.json();
    //       // console.log("API Response:", data); // Log the response
  
    //       if (data.success && data.invoices) {
    //         setBillingData(data.invoices); // Set billing data if the API response is successful
    //       }
  
    //     } catch (error) {
    //       console.error("Error fetching billing data:", error);
    //     }
    //   };
  
    //   fetchBillingData();
    // }, [user.token]); // Re-run when user.token changes

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="relative bg-cover text-white p-10 bg-no-repeat rounded-4xl shadow-lg"
        style={{ backgroundImage: `url(${welcomebg})`, backgroundSize: "100% 100%" }}>
        <div className="relative z-10">
          <h1 className="text-3xl font-semibold capitalize">Welcome to Your Dashboard</h1>
          <p className="mt-4 mb-10 text-lg">Hi John, Ready to Create Your AI UGC Videos?”</p>
          <Link to="/NewProject" className=" Apercu cursor-pointer px-7 py-4  bg-gradient-to-r from-[#1AE1AB] to-[#712FFF]  text-white rounded-full">
            CREATE NEW PROJECT
          </Link>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {infoData.map((item) => (
          <div key={item.id} className={`relative border overflow-hidden border-white rounded-lg flex flex-col items-start `}>
            <div className='z-10 p-6'>
              <div className={`w-fit p-4 rounded-2xl bg-gradient-to-t ${item.bgGradient}`}> <img src={item.icon} alt="" /> </div>
              <h2 className="text-[32px] capitalize Aspekta mt-6 font-bold">{item.value}</h2>
              <p className="text-[24px] font-light Aspekta capitalize mt-2">{item.label}</p>
            </div>
            <div className={`w-full h-full absolute blur-sm top-0 bg-gradient-to-t ${item.bgGradient}`} style={{ background: "linear-gradient(180deg, rgba(26, 225, 171, 0.10) 0%, rgba(113, 47, 255, 0.10) 100%)" }}>

            </div>
          </div>
        ))}
      </div>




      {
              // showplans ? <PricingPlan activeP={currentPlan.name} newplans={newplans} newloading={newloading} showplans={showplans} setShowplans={setShowplans} /> : ""
            }
      
      
            {/* Subscription Box */}
            {/* {userData && currentPlan && !showplans && (
              <div className="bg-[#090A1E] rounded-2xl p-6 mb-8">
                
                <div className='flex items-end justify-between'>
                  <div className="flex flex-col text-white space-x-4">
                    <GetPlan />
                    <div className='mt-4 flex flex-col gap-2'>
                      <h2 className="text-lg font-semibold">{currentPlan.name}</h2>
                      <p className="">
                        <span className='price'> {currentPlan.price} </span> / month
                      </p>
                    </div>
      
                    <hr className="my-4 max-w-[279px] text-[#ffffff33]" />
                    <p className="text-[#9B9EB5] text-sm tracking-[0.56px] uppercase">
                      Next payment: {userData.nextBillingDate}
                    </p>
                  </div>
      
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={() => setShowplans(!showplans)}
                      className="px-7 py-4 bg-transparent border border-[#1AE1AB] text-[#1AE1AB] rounded-full hover:text-white uppercase hover:bg-[#1AE1AB]">
                      UPGRADE PLAN
                    </button>
                    <button className="px-7 py-4 bg-transparent uppercase border border-[#9B9EB5] text-[#9B9EB5] rounded-full hover:text-white hover:bg-[#9B9EB5]">
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>
            )}
       */}
            {/* {userData && currentPlan ? (
              ""
            ) : (
              <PricingPlan newplans={newplans} newloading={newloading} />
            )} */}

      {/* Subscription Box */}
      {/* <div className="bg-[#090A1E] rounded-2xl p-6 mb-8">
        <div className='flex flex-col sm:flex-row items-end justify-between'>
          <div className="flex flex-col text-white space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M25.1628 10.655C25.6462 10.655 26.0378 10.2632 26.0378 9.77999C26.0378 9.29675 25.6462 8.90499 25.1628 8.90499V10.655ZM13.9997 24.224L13.1722 24.5083C13.2935 24.8617 13.626 25.099 13.9997 25.099C14.3734 25.099 14.7059 24.8617 14.8272 24.5083L13.9997 24.224ZM2.83649 8.90499C2.35325 8.90499 1.96149 9.29675 1.96149 9.77999C1.96149 10.2632 2.35325 10.655 2.83649 10.655V8.90499ZM20.9731 4.92036L24.3822 8.80398L25.6974 7.64951L22.2883 3.76588L20.9731 4.92036ZM24.4551 10.8979L15.2692 22.9903L16.6627 24.0488L25.8487 11.9565L24.4551 10.8979ZM12.7302 22.9903L3.54422 10.8979L2.15069 11.9565L11.3367 24.0488L12.7302 22.9903ZM3.6172 8.80398L7.02631 4.92036L5.71114 3.76588L2.30203 7.64951L3.6172 8.80398ZM16.4804 4.375H19.7765V2.625H16.4804V4.375ZM18.961 10.655H25.1628V8.90499H18.961V10.655ZM15.6666 3.82146L18.1473 10.1015L19.7749 9.45853L17.2942 3.17854L15.6666 3.82146ZM14.8272 24.5083L19.7887 10.0642L18.1335 9.49574L13.1722 23.9398L14.8272 24.5083ZM8.22283 4.375H11.7946V2.625H8.22283V4.375ZM11.7946 4.375H16.4804V2.625H11.7946V4.375ZM2.83649 10.655H9.03826V8.90499H2.83649V10.655ZM9.03826 10.655H18.961V8.90499H9.03826V10.655ZM10.9934 3.14833L8.23704 9.42834L9.83948 10.1317L12.5958 3.85167L10.9934 3.14833ZM14.8272 23.9398L9.8658 9.49574L8.21072 10.0642L13.1722 24.5083L14.8272 23.9398ZM3.54422 10.8979C3.06945 10.273 3.10084 9.39221 3.6172 8.80398L2.30203 7.64951C1.23608 8.86382 1.1733 10.6699 2.15069 11.9565L3.54422 10.8979ZM15.2692 22.9903C14.6263 23.8365 13.3731 23.8365 12.7302 22.9903L11.3367 24.0488C12.6798 25.817 15.3195 25.817 16.6627 24.0488L15.2692 22.9903ZM24.3822 8.80398C24.8986 9.39221 24.9299 10.273 24.4551 10.8979L25.8487 11.9565C26.826 10.6699 26.7632 8.86382 25.6974 7.64951L24.3822 8.80398ZM22.2883 3.76588C21.6527 3.04187 20.7389 2.625 19.7765 2.625V4.375C20.2312 4.375 20.6671 4.57179 20.9731 4.92036L22.2883 3.76588ZM7.02631 4.92036C7.33228 4.57179 7.76811 4.375 8.22283 4.375V2.625C7.26038 2.625 6.34668 3.04187 5.71114 3.76588L7.02631 4.92036Z" fill="url(#paint0_linear_79_1311)" />
              <defs>
                <linearGradient id="paint0_linear_79_1311" x1="13.9997" y1="2.625" x2="13.9997" y2="25.375" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#712FFF" />
                  <stop offset="1" stopColor="#1AE1AB" />
                </linearGradient>
              </defs>
            </svg>
            <div className='mt-4 flex flex-col gap-2'>
              <h2 className="text-lg font-semibold">Starter Plan</h2>
              <p className=""> <span className='price'>  $999 </span> / month</p>
            </div>

            <hr className="my-4 max-w-[279px] text-[#ffffff33]" />
            <p className="text-[#9B9EB5] text-sm tracking-[0.56px] uppercase"> Next payment: Nov 25th, 2025 </p>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <Link to="/pricingPlan"
              className="px-7 py-4 bg-transparent border border-[#1AE1AB] text-[#1AE1AB] rounded-full hover:text-white uppercase hover:bg-[#1AE1AB]">
              UPGRADE PLAN
            </Link>
            <button className="px-7  cursor-pointer  py-4 bg-transparent uppercase border border-[#9B9EB5] text-[#9B9EB5] rounded-full hover:text-white hover:bg-[#9B9EB5]">
              Cancel Subscription
            </button>
          </div>

        </div>
       

      </div> */}
      {/* Create New Project Button */}
      <div className="mt-6">
        <Link to="/NewProject"  className="w-full block text-center py-3 bg-gradient-to-r from-[#1AE1AB] to-[#712FFF] text-white text-lg font-semibold rounded-full cursor-pointer">
          Create New Project
        </Link>
      </div>
    </div>
  );
};

export default Overview;
