import React, { useEffect, useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import ultimateplanbg from '../../assets/images/ultimateplanbg.png';
import pricebelowSection from '../../assets/images/pricebelowSection.png';
import { useDispatch } from 'react-redux';
import { stripeActiveSubscriptionsAPIFn, stripeFetchPlansAPIFn, stripeCheckoutSessionAPIFn } from '../../redux/features/stripe/stripeFns';

const PlansList = ({ location }) => {
  const dispatch = useDispatch();

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [error, setError] = useState(null);
  const [processingPlanId, setProcessingPlanId] = useState(null);

  // Dummy descriptions per plan id
  const planDescriptions = {
    price_1RQY8r05VZZMHB0BVeUPJ46Y: "For small shops just starting out or with light needs.",
    price_1RQY8R05VZZMHB0BfxC6pdwl: "Start with a first step",
    price_1RQY7k05VZZMHB0BVaVvwJBT: "Designed for high-volume shops, chains, or white-label partners.",
  };

  // Dummy features list per plan id
  const planFeatures = {
    price_1RQY8r05VZZMHB0BVeUPJ46Y: [
      "250 wrap generations/month",
      "All vehicles (1990–2026), all makes & models",
      "Finishes: Gloss, Satin, Matte, Carbon Fibre, Brushed Metal",
      "1 seat/user login",
      "Standard resolution exports",
      "Commercial use license ",
      "Lead Generation: Invite unlimited customers Customers can preview up to 2 designs Customers can book appointments after selecting a color",
      "Add-On: Purchase additional images at a discounted rate (up to 250 extra images/month)",
    ],
    price_1RQY8R05VZZMHB0BfxC6pdwl: [
      "1000 wrap generations/month",
      "All features from Basic",
      "2 seats/user logins",
      "High-resolution exports (up to 2K)",
      "Priority email support",
      "Lead Generation: Invite unlimited customers Customers can preview up to 5 designs Customers can book appointments directly",
      "Add-On: Purchase additional images at a discounted rate (up to 600 extra images/month)",
      "Tints",
    ],
    price_1RQY7k05VZZMHB0BVaVvwJBT: [
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
      if (data?.meta?.requestStatus === "fulfilled") {
        setPlans(data.payload?.data?.plans || []);
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
      if (data?.meta?.requestStatus === "fulfilled") {
        console.log("Active subscription:", data);
        // You can handle active subscription data here if needed
      } else {
        setError("Failed to load active subscription.");
        console.error("Failed to fetch active subscription", data);
      }
    } catch (err) {
      setError("Unexpected error while loading subscription.");
      console.error("Error fetching subscription", err);
    } finally {
      setLoadingSubscription(false);
    }
  };

  useEffect(() => {
    fetchPlans();
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

  if (loadingPlans || loadingSubscription) return <p>Loading plans...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="plans-list grid gap-8 grid-cols-1 md:grid-cols-3">
        {Array.isArray(plans) &&
          plans.map((plan, idx) => {
            const isSecondPlan = idx === 1;
            // price can be array or object, handle both
            const priceObj = Array.isArray(plan.prices)
              ? plan.prices[0]
              : plan.prices;

            const priceId = priceObj?.id;
            const planDesc = planDescriptions?.[priceId] || "No description available.";
            const features = planFeatures?.[priceId] || [];
            const price = priceObj?.unit_amount;
            const currency = priceObj?.currency?.toUpperCase();
            const interval = priceObj?.recurring?.interval || "one-time";

            return (
              <div
                key={plan.id}
                className={`plan-card p-4 rounded-lg flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300`}
                style={{
                  backgroundColor: location === "home" ? "transparent" : "#fff",
                  color: location === "home" ? "#fff" : "#000",
                  ...(isSecondPlan && plan.images?.length
                    ? {
                        backgroundImage: `url(${ultimateplanbg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        color: "#fff",
                      }
                    : {}),
                }}
              >
                <div>
                  {/* Plan Name */}
                  <h3 className="text-xl font-bold mb-3">{plan.name}</h3>

                  {/* Plan Description */}
                  <p className="mb-3">{planDesc}</p>

                  {/* Border line only for center plan */}
                  {isSecondPlan && <div className="border-b mb-3"></div>}

                  {/* Features List */}
                  <ul className="my-6 space-y-2">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <IoIosCheckmarkCircle
                          className={`mr-2 mt-1.5 text-base flex-shrink-0 ${
                            isSecondPlan
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
                    className="w-full py-3 rounded font-semibold cursor-pointer bg-[#ED217B] hover:brightness-110 hover:scale-105 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processingPlanId === plan.id ? "Processing..." : "Get this plan"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <section
        className="flex flex-col md:flex-row mt-3 items-stretch text-white bg-center bg-no-repeat bg-cover rounded-2xl justify-center w-full mx-auto py-12 px-4 gap-4"
        style={{ backgroundImage: `url(${pricebelowSection})` }}
      >
        {/* Wrapflow Features */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">Wrapflow</h3>
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
          <h3 className="text-2xl font-bold mb-4">Ultimate Plans</h3>
          <ul className="space-y-3 text-base">
            {Ultimateplans.map((feature, i) => (
              <li key={i} className="flex items-center">
                <IoIosCheckmarkCircle className="text-white mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default PlansList;
