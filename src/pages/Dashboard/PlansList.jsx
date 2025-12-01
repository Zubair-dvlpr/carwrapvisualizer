import React, { useEffect, useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import ultimateplanbg from '../../assets/images/ultimateplanbg.png';
import pricebelowSection from '../../assets/images/pricebelowSection.png';
import { useDispatch, useSelector } from 'react-redux';
import { stripeActiveSubscriptionsAPIFn, stripeFetchPlansAPIFn, stripeCheckoutSessionAPIFn } from '../../redux/features/stripe/stripeFns';

const PlansList = ({ location }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.currentUser?.currentUser);
  // console.log("PlansList", user.data.user.accountType);
  const [plans, setPlans] = useState([]);
  const [addon, setAddon] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [error, setError] = useState(null);
  const [processingPlanId, setProcessingPlanId] = useState(null);
  const [activePlan, setActivePlan] = useState();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const toggleDesc = () => setShowFullDesc(prev => !prev);

  const MAX_LENGTH = 100; // Characters to show before "Read More"




  // Dummy features list per plan id
  const planFeatures = {
    "Enthusiast Plan": [
      "Access to 1990–2026 vehicles across all makes & models",
      "Finishes: Gloss, Satin, Matte, Carbon Fibre, Brushed Metal",
      "1 seat/user login",
      "Standard-resolution image exports",
      "Instant color preview on all vehicles",
      "Save favorite wraps to your personal gallery",
      "Perfect for hobbyists, enthusiasts, and small creators",
    ],
    "Basic Plan": [
      "250 wrap generations/month",
      "All vehicles (1990–2026), all makes & models",
      "Finishes: Gloss, Satin, Matte, Carbon Fibre, Brushed Metal",
      "1 seat/user login",
      "Standard resolution exports",
      "Commercial use license",
      "Lead Generation: Invite unlimited customers Customers can preview up to 2 designs Customers can book appointments after selecting a color",
      "Add-On: Purchase additional images at a discounted rate (up to 250 extra images/month)",
    ],
    "Ultimate Plan": [
      "1000 wrap generations/month",
      "All features from Basic",
      "2 seats/user logins",
      "High-resolution exports (up to 2K)",
      "Priority email support",
      "Lead Generation: Invite unlimited customers Customers can preview up to 5 designs Customers can book appointments directly",
      "Add-On: Purchase additional images at a discounted rate (up to 600 extra images/month)",
      "Tints",
    ],
    "Pro Plan": [
      "2,500 wrap generations/month",
      "All features from Pro",
      "5 seats/user logins",
      "White-label branding (remove our logo, add yours)",
      "4K export support",
      "API access (by request)",
      "Team dashboard for managing usage and credits",
      "Lead Generation: Invite unlimited customers Customers can preview up to 10 designs Customers can book appointments directly",
      "Add-On: Purchase additional images at a discounted rate (up to 2,000 extra images/month)",
      "Volume top-up: If usage exceeds plan limits, buy extra generations at a discounted rate",
    ],
  };


  const fetchPlans = async () => {
    setLoadingPlans(true);
    setError(null);
    try {
      const data = await dispatch(stripeFetchPlansAPIFn());
      console.log("ethiesssss plan ", data);
      if (data?.meta?.requestStatus === "fulfilled") {
        const stripePlans = data.payload?.data?.plans
        const addonPlan = stripePlans.filter(plan => plan.name == 'Shop Management Tool')
        const otherPlans = stripePlans.filter(plan => plan.name !== 'Shop Management Tool');
        setPlans(otherPlans || []);
        setAddon(addonPlan || []);
      } else {
        setError("Failed to load plans.");
        console.error("Failed to fetch plans", data);
      }
    } catch (err) {
      setError("Unexpected error while loading plans.");
      console.error("Error fetching plans", err);
    } finally {
      setLoadingPlans(false);
    }



  };

  const fetchActiveSubscription = async () => {
    setLoadingSubscription(true);
    setError(null);
    try {
      const data = await dispatch(stripeActiveSubscriptionsAPIFn());

      if (data?.meta?.requestStatus === "fulfilled" && data?.payload?.data) {
        setActivePlan(data.payload.data);
      } else {
        console.warn("No active subscription found — defaulting to Enthusiast or free user view");
        setActivePlan(null); // <-- allow plans to load normally
      }
    } catch (err) {
      console.error("Error fetching subscription:", err);
      setActivePlan(null); // fallback instead of throwing error
    } finally {
      setLoadingSubscription(false);
    }
  };


  useEffect(() => {
    fetchPlans();
    // console.log("ethi ", plans);
    fetchActiveSubscription();
  }, []);


  const handleSubscribe = async (plan) => {
    setProcessingPlanId(plan.id);
    try {
      // Determine priceId (support both array or single object)
      const price = Array.isArray(plan.prices)
        ? plan.prices[0]
        : plan.prices;
      const priceId = price?.id;

      if (!priceId) {
        alert("Invalid price data.");
        setProcessingPlanId(null);
        return;
      }

      const response = await dispatch(stripeCheckoutSessionAPIFn({ priceId })).unwrap();

      const sessionUrl = response?.data?.url;
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        alert("Failed to initiate checkout session.");
      }
    } catch (error) {
      console.error("Stripe subscription error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setProcessingPlanId(null);
    }
  };

  const Wrapflow = [
    "Smart Calendar: View bookings, appointments, and job timelines at a glance",
    "Online Booking: Let clients schedule installs with automated confirmations",
    "One-Click Invoicing: Instantly create  invoices and warranty documents",
    "Work Order System: Auto creates work orders for each appointment",
    "Smart Calculation: Auto-calculate square footage and vinyl needed per job",
    "Inventory Management: Track material levels, get low-stock alerts, and prep for upcoming jobs",
  ];
  const Ultimateplans = [
    "Photo Check-In: Log vehicle condition with photos on arrival",
    "Real-Time Job Tracking: Monitor every job from intake to completion",
    "Customer History: Store wrap records, notes, photos, and warranties",
    "Workflow Automation: Cut wasted time and keep your team focused",
    "Automated Job Alerts: Send SMS updates to customers at every stage",
  ];

  if (loadingPlans || loadingSubscription) return <div className="text-center py-8">
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#EB227C] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
    <div className="text-sm text-gray-500 mt-2">Loading Plans</div>
  </div>;

  if (error && plans.length === 0) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="plans-list grid gap-8 grid-cols-1 md:grid-cols-3">
        {Array.isArray(plans) &&
          plans.toReversed().map((plan, idx) => {
            const isSecondPlan = idx === 1;
            const priceObj = Array.isArray(plan.prices) ? plan.prices[0] : plan.prices;
            const priceId = priceObj?.id;
            const isEnthusiast = plan.name === "Enthusiast Plan";
            const planDesc = plan?.description || "No description available.";
            const displayDesc = showFullDesc || planDesc.length <= MAX_LENGTH
              ? planDesc
              : planDesc.slice(0, MAX_LENGTH) + '...';
            const features = planFeatures?.[plan.name] || [];
            const price = priceObj?.unit_amount;
            const currency = priceObj?.currency?.toUpperCase();
            const interval = priceObj?.recurring?.interval || "one-time";

            return (
              <div
                key={plan.id}
                className={`plan-card p-4 bg-cover bg-center rounded-lg ${plan?.default_price === activePlan?.priceId ? 'opacity-35' : 'opacity-100'} flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300`}
                style={plan.name === "Ultimate Plan"
                  ? { backgroundImage: `url(${ultimateplanbg})`, color: "white" }
                  : { backgroundColor: 'transparent' }}
              >
                <div>
                  <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                  <p className="mb-3">
                    {displayDesc}
                    {planDesc.length > MAX_LENGTH && (
                      <span
                        onClick={toggleDesc}
                        className="text-pink-500 cursor-pointer ml-1 underline"
                      >
                        {showFullDesc ? "Show Less" : "Read More"}
                      </span>
                    )}
                  </p>

                  {isSecondPlan && <div className="border-b mb-3"></div>}
                  <ul className="my-6 space-y-2">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <IoIosCheckmarkCircle
                          className={`mr-2 mt-1.5 text-base flex-shrink-0 ${plan.name === "Ultimate Plan"
                            ? "text-white"
                            : location === "home"
                              ? "text-white"
                              : "text-black"
                            }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ...price and button part */}
                <div>
                  {/* Price Centered */}
                  <div className="text-center text-base font-Poppins font-semibold mb-6">
                    {price !== undefined
                      ? `$${(price / 100).toFixed(2)} ${currency} / ${interval}`
                      : "Contact us for pricing"}
                  </div>

                  {/* Subscribe Button */}
                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={processingPlanId === plan.id}
                    className={`w-full ${plan?.default_price === activePlan?.priceId ? 'cursor-no-drop pointer-events-none' : 'cursor-pointer pointer-events-auto'} py-3 rounded font-semibold  bg-[#ED217B] hover:brightness-110 hover:scale-105 text-white transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {processingPlanId === plan.id ? "Processing..." : "Get this plan"}
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
      {user.data.user.role.role !== 'enthusiast' &&
        <section
          className=" mt-3  text-white bg-center bg-no-repeat bg-cover rounded-2xl  w-full mx-auto py-12 px-4 gap-4"
          style={{ backgroundImage: `url(${pricebelowSection})` }}
        >
          <h3 className='text-3xl font-bold mb-4 text-center'>Wrap Shop Workflow</h3>
          <div className='flex flex-col md:flex-row items-stretch justify-center'>
            {/* Wrapflow Features */}
            <div className="w-full md:w-1/2">
              {/* <h3 className="text-2xl font-bold mb-4">Wrapflow</h3> */}
              <ul className="space-y-3 text-base">
                {Wrapflow.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <IoIosCheckmarkCircle className="text-white mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ultimate Plans Features */}
            <div className="w-full md:w-1/2">
              {/* <h3 className="text-2xl font-bold mb-4">Ultimate Plans</h3> */}
              <ul className="space-y-3 text-base">
                {Ultimateplans.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <IoIosCheckmarkCircle className="text-white mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* {console.log(addon)} */}
          {/* Add-ons Button */}
          <div className="w-full mt-8 flex justify-center">
            {addon.map((plan, index) => {
              const priceObj = Array.isArray(plan.prices)
                ? plan.prices[0]
                : plan.prices;
              const price = priceObj?.unit_amount;
              const currency = priceObj?.currency?.toUpperCase();
              const interval = priceObj?.recurring?.interval || "one-time";

              const isActive = user?.data?.user?.accountType === "addon_access_paid";

              return (
                <button
                  key={index}
                  onClick={() => !isActive && handleSubscribe(plan)}
                  disabled={processingPlanId === plan.id || isActive}
                  className={`${isActive ? "bg-[#bd4d7e] cursor-not-allowed" : "bg-[#ED217B] hover:bg-pink-700 cursor-pointer"
                    } text-white font-semibold px-9 py-4 rounded-full transition`}
                >
                  {isActive
                    ? "Add on Active"
                    : processingPlanId === plan.id
                      ? "Processing..."
                      : `Add on – ${price !== undefined
                        ? `$${(price / 100).toFixed(2)} ${currency} / ${interval}`
                        : "Contact us for pricing"
                      }`}
                </button>
              );
            })}
          </div>


        </section>

      }
    </>
  );
};

export default PlansList;
