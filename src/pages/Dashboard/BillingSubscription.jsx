import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaDownload, FaRegCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import GetPlan from '../../assets/icons/GetPlan';
import PricingPlan from './PricingPlan';
import pricingplan from "../../assets/icons/pricingplan.svg";
const BillingSubscription = () => {
  const [billingData, setBillingData] = useState([]);
  const [showplans, setShowplans] = useState(false);
  const [newplans, setNewplans] = useState([]);
  const [newloading, setNewLoading] = useState(true);
  // Retrieve the user object from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchPlans = async () => {
      if (!user?.token) {
        alert("User not authenticated");
        return;
      }

      try {
        const response = await fetch('https://api.theugcmachine.com/billing/plans', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        // console.log("ddd", data);
        if (data?.success && Array.isArray(data.plans)) {
          // Map and format plans
          const formattedPlans = data.plans.map(plan => ({
            id: plan.id,
            name: plan.name.toUpperCase() + ' PLAN',
            price: `$${(plan.prices[0].amount).toFixed(2)}`,
            credits: plan.credits,
            priceId: plan.prices[0].id,
            customCharacters: plan.credits >= 2000 ? "10" : plan.credits >= 950 ? "03" : "01", // Custom logic
            btnprice: `$${(plan.prices[0].amount / plan.credits).toFixed(4)}`,
            icon: pricingplan
          }));
          setNewplans(formattedPlans);
          setNewLoading(false); // Set loading to false once data is fetched

        } else {
          alert("Failed to load plans");
          setNewLoading(false); // Ensure loading is turned off on failure
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        // alert("Error loading pricing plans.");
        setNewLoading(false); // Ensure loading is turned off on failure
      }
    };

    fetchPlans();

  }, []);





  const [userData, setUserData] = useState(null);
  const currentPlan = newplans.find(plan => plan.id === userData?.plan);

  useEffect(() => {
    if (!user) {
      console.error("User is not available in localStorage");
      return;
    }

    const planData = async () => {
      const apiUrl = `https://api.theugcmachine.com/user/`;

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        // console.log("API Response:", data);

        if (data.success && data.user) {
          setUserData(data.user); // ✅ Save user data here
        }

      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    planData();
  }, []);
  // Add user as a dependency, so the effect runs when `user` changes


  useEffect(() => {
    const fetchBillingData = async () => {
      const apiUrl = "https://api.theugcmachine.com/billing/invoices";

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`, // Include the Bearer token
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        // console.log("API Response:", data); // Log the response

        if (data.success && data.invoices) {
          setBillingData(data.invoices); // Set billing data if the API response is successful
        }

      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    fetchBillingData();
  }, [user.token]); // Re-run when user.token changes

  // Function to handle PDF download
  const handleDownload = (pdfUrl) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';
    link.download = true;
    link.click();
  };

  return (
    <div className=" max-w-6xl mx-auto">
      {/* Title and Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="dashboard-title">Billing & Subscription</h1>
        <button className="px-6 bg-gradient-to-r from-[#1AE1AB] py-4 to-[#712FFF] font-bold uppercase font-[Apercu] text-white rounded-full cursor-pointer">
          Change Payment Method
        </button>
      </div>

      {
        showplans ? <PricingPlan activeP={currentPlan.name} newplans={newplans} newloading={newloading} showplans={showplans} setShowplans={setShowplans} /> : ""
      }


      {/* Subscription Box */}
      {userData && currentPlan && !showplans && (
        <div className="bg-[#090A1E] rounded-2xl p-6 mb-8">
          {/* {console.log("sssssss", userData)} */}
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

      {userData && currentPlan ? (
        ""
      ) : (
        <PricingPlan newplans={newplans} newloading={newloading} />
      )}


      {/* Billing History */}
      <h2 className="text-xl font-bold mb-4">Billing History</h2>
      <div className="overflow-x-auto border shadow-lg rounded-2xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#090A1E] text-white">
              <th className="p-4 text-left text-base font-semibold">Product</th>
              <th className="p-4 text-left text-base font-semibold">Reference</th>
              <th className="p-4 text-left text-base font-semibold">Date</th>
              <th className="p-4 text-left text-base font-semibold">Amount</th>
              <th className="p-4 text-left text-base font-semibold">Status</th>
              <th className="p-4 text-left text-base font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((item, index) => (
              <tr key={index} className="border-t text-[#9B9EB5] text-sm">
                <td className="p-4">Product Name</td> {/* Ensure no spaces here */}
                <td className="p-4">{item.id}</td> {/* Ensure no spaces here */}
                <td className="p-4">{new Date(item.createdAt * 1000).toLocaleDateString()}</td>
                <td className="p-4">{(item.total / 100).toFixed(2)} USD</td>
                <td className="p-4">
                  <span
                    className={`px-4 py-1 flex items-center gap-1 text-sm font-semibold rounded-lg ${item.status === "paid" ? "text-[#1AE1AB]" : "text-[#FFA800]"
                      }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => handleDownload(item.pdf)}
                  >
                    <MdOutlineFileDownload />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default BillingSubscription;
