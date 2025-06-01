import React, { useState } from "react";
import { FaHeadset, FaEnvelope, FaMinus, FaPlus } from "react-icons/fa";


const SupportHelp = () => {

    const [activeIndex, setActiveIndex] = useState(null);

     const faqs = [
    {
      question: "What is AI UGC?",
      answer:
        "AI UGC (Artificial Intelligence User-Generated Content) refers to content that is created or enhanced using AI technologies. It leverages machine learning algorithms to generate engaging, personalized content, making content creation faster and more efficient."
    },
    {
      question: "Can I choose different voices & avatars?",
      answer:
        "Yes, you can choose from a variety of voices and avatars. Our platform offers multiple voice options along with customizable avatars, allowing you to tailor the presentation of your content to match your unique style and preferences."
    },
    {
      question: "How do I get my videos?",
      answer:
        "Once your video has been processed, it will be available in your account dashboard. You can easily download, share, or embed your videos directly from there, ensuring seamless access to your content."
    },
    {
      question: "What is UGC Machine?",
      answer:
        "UGC Machine is an innovative AI-powered platform that helps you create high-quality, ad-ready User-Generated Content (UGC)-style videos in minutes. Our advanced AI uses a diverse range of avatars and intelligent script generation (or your own script!) to produce engaging video content, saving you significant time and money."
    },
    {
      question: "How does UGC Machine create UGC-style videos with AI?",
      answer:
        "It's simple! Provide product info or your own script, and our AI generates an engaging narrative. Then, choose from our diverse selection of AI avatars, and our system quickly produces your video, typically in a 9:16 format ideal for social platforms."
    },
    {
      question: "Are the 'people' in the videos real? How is the quality?",
      answer:
        "Our videos feature highly realistic AI-generated avatars from our extensive library, designed to look and sound authentic. UGC Machine is engineered to produce high-quality, engaging content suitable for professional ad campaigns."
    },
    {
      question: "Why choose UGC Machine over traditional UGC creators?",
      answer:
        "UGC Machine offers unparalleled speed (videos in minutes), cost-savings (up to 80% less than traditional UGC), and scalability (create hundreds of variations). It’s perfect for agile marketers needing high-volume, affordable ad creatives fast."
    },
    {
      question: "How fast can I get my videos?",
      answer:
        "Incredibly fast! Once you've submitted your details and chosen an avatar, UGC Machine's efficient system typically has your videos ready for download within just a couple of minutes."
    },
    {
      question: "What can I do with the videos? Can I edit them further?",
      answer:
        "Your videos are delivered in a 9:16 format, perfect for TikTok, Instagram Reels, etc. They are ad-ready as is, but you can easily use tools like CapCut for additional captions or edits if desired."
    },
    {
      question: "Is UGC Machine easy to use? Do I need technical skills?",
      answer:
        "Absolutely! UGC Machine is designed for everyone. If you can fill out a form and click a few buttons, you can create compelling videos. No technical or video editing skills are required."
    },
    {
      question: "How much does it cost? Is there a free trial?",
      answer:
        "We offer various plans starting from our Basic plan at $67.99/month. We aim for accessible pricing for scalable video creation."
    },
    {
      question: "Can I use these videos for paid ads? Who owns them?",
      answer:
        "Yes, the videos are ideal for paid advertising campaigns. You own the completed video content you generate using our platform for your campaigns, according to our terms of service."
    },
    {
      question: "How does UGC Machine benefit marketing agencies?",
      answer:
        "UGC Machine offers powerful advantages for marketing agencies. You can seamlessly integrate AI UGC creation into your services or refer clients and earn commissions, allowing you to deliver scalable, high-quality ad creatives efficiently and generate recurring revenue."
    },
    {
      question: "How is UGC Machine different from other video tools or marketplaces?",
      answer:
        "UGC Machine is uniquely focused on AI-driven UGC-style ad creatives with a diverse avatar library and intelligent script generation. We offer superior scalability and speed at a fraction of the cost compared to general video tools or manual UGC marketplaces."
    },
    {
      question: "This sounds great! How do I get started with UGC Machine?",
      answer:
        "It's easy! Visit our pricing page, choose the plan that best suits your needs, sign up, and you can start creating your first AI UGC video in minutes."
    }
  ];


    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="max-w-6xl text-black mx-auto">
            {/* Title */}
            <h1 className="dashboard-title mb-6">Support & Help</h1>

            {/* Support Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Contact Support */}
                <div className="shadow-lg rounded-lg px-6 py-10 flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <g clip-path="url(#clip0_79_1545)">
                            <path d="M41.2969 41.4221C40.3264 41.4221 39.5391 42.209 39.5391 43.1799V46.9455C39.5391 47.916 40.3264 48.7033 41.2969 48.7033C42.2678 48.7033 43.0547 47.916 43.0547 46.9455V43.1799C43.0547 42.209 42.2678 41.4221 41.2969 41.4221Z" fill="url(#paint0_linear_79_1545)" />
                            <path d="M31.8829 39.5389H9.28906C8.31815 39.5389 7.53125 40.3262 7.53125 41.2967C7.53125 42.2676 8.31815 43.0545 9.28906 43.0545H31.8829C32.8538 43.0545 33.6407 42.2676 33.6407 41.2967C33.6407 40.3262 32.8538 39.5389 31.8829 39.5389Z" fill="url(#paint1_linear_79_1545)" />
                            <path d="M20.5862 47.0705H9.28906C8.3186 47.0705 7.53125 47.8574 7.53125 48.8283C7.53125 49.7987 8.3186 50.5861 9.28906 50.5861H20.5862C21.5567 50.5861 22.344 49.7987 22.344 48.8283C22.344 47.8574 21.5567 47.0705 20.5862 47.0705Z" fill="url(#paint2_linear_79_1545)" />
                            <path d="M38.5894 24.0743C38.9327 24.4176 39.3827 24.5892 39.8322 24.5892C40.2822 24.5892 40.7322 24.4176 41.075 24.0743C41.7617 23.3876 41.7617 22.2748 41.075 21.5881L38.4118 18.9249C37.7256 18.2382 36.6128 18.2387 35.9261 18.9249C35.2395 19.6115 35.2395 20.7243 35.9261 21.411L38.5894 24.0743Z" fill="url(#paint3_linear_79_1545)" />
                            <path d="M54.4766 30.125H50.8282C51.1459 29.9185 51.4471 29.6777 51.725 29.3999L58.3818 22.7431C59.4255 21.6994 60 20.3123 60 18.8365C60 17.3607 59.425 15.9732 58.3818 14.9318C54.8396 11.3882 48.6118 5.16037 45.0691 1.61911C44.0263 0.574951 42.6393 0 41.163 0C39.6877 0 38.3006 0.574493 37.2569 1.61819L30.6001 8.27499C29.5729 9.30222 29.0359 10.6366 28.9888 11.9856C27.5844 12.0332 26.272 12.6027 25.2759 13.6006L8.75015 30.125H5.52338C2.43713 30.125 0 32.6317 0 35.6483V54.4766C0 57.5629 2.50671 60 5.52338 60H37.5311C38.9438 60 40.2745 59.474 41.2985 58.5155C42.2859 59.436 43.6093 60 45.0623 60H54.4766C57.5629 60 60 57.4933 60 54.4766V35.6483C60 32.5621 57.4933 30.125 54.4766 30.125ZM27.7625 16.0854C28.5452 15.3017 29.816 15.3012 30.6001 16.0854C31.2868 16.7715 32.3996 16.7715 33.0862 16.0854C33.7724 15.3992 33.7729 14.2863 33.0862 13.5997C32.3012 12.8146 32.3021 11.5453 33.0862 10.7607L39.743 4.10385C40.5286 3.31833 41.7989 3.31924 42.5826 4.10431C46.1261 7.64694 52.3531 13.8739 55.8966 17.4184C56.6885 18.2089 56.673 19.4801 55.8957 20.257L49.2393 26.9138C48.8599 27.2928 48.3559 27.502 47.8198 27.502C47.2838 27.502 46.7798 27.2928 46.4003 26.9138C45.7141 26.2276 44.6013 26.2276 43.9146 26.9138C43.2285 27.5999 43.228 28.7128 43.9146 29.3999C44.1339 29.6187 44.296 29.8801 44.3939 30.1653C43.2051 30.3094 42.1321 30.8322 41.2985 31.6095C40.2731 30.6505 38.9429 30.125 37.5311 30.125H27.0355L30.4239 26.7366C31.1105 26.05 31.1105 24.9371 30.4239 24.2505C29.7377 23.5643 28.6244 23.5643 27.9382 24.2505L22.0638 30.125H13.7224L27.7625 16.0854ZM56.4844 54.4766C56.4844 55.5844 55.5872 56.4844 54.4766 56.4844H45.0623C43.9554 56.4844 43.0545 55.5835 43.0545 54.4766C43.0545 53.5057 42.2676 52.7188 41.2967 52.7188C40.3262 52.7188 39.5389 53.5057 39.5389 54.4766C39.5389 55.5693 38.6554 56.4844 37.5311 56.4844H5.52338C4.41559 56.4844 3.51562 55.5872 3.51562 54.4766V35.6483C3.51562 34.5401 4.41284 33.6406 5.52338 33.6406H37.5311C38.6458 33.6406 39.5393 34.5447 39.5393 35.6483C39.5393 36.6193 40.3262 37.4062 41.2971 37.4062C42.2676 37.4062 43.055 36.6193 43.055 35.6483C43.055 34.5415 43.9554 33.6406 45.0627 33.6406H54.4766C55.5849 33.6406 56.4844 34.5378 56.4844 35.6483V54.4766Z" fill="url(#paint4_linear_79_1545)" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_79_1545" x1="41.2969" y1="41.4221" x2="41.2969" y2="48.7033" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#1AE1AB" />
                                <stop offset="1" stopColor="#712FFF" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_79_1545" x1="20.586" y1="39.5389" x2="20.586" y2="43.0545" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#1AE1AB" />
                                <stop offset="1" stopColor="#712FFF" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_79_1545" x1="14.9376" y1="47.0705" x2="14.9376" y2="50.5861" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#1AE1AB" />
                                <stop offset="1" stopColor="#712FFF" />
                            </linearGradient>
                            <linearGradient id="paint3_linear_79_1545" x1="38.5006" y1="18.4101" x2="38.5006" y2="24.5892" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#1AE1AB" />
                                <stop offset="1" stopColor="#712FFF" />
                            </linearGradient>
                            <linearGradient id="paint4_linear_79_1545" x1="30" y1="0" x2="30" y2="60" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#1AE1AB" />
                                <stop offset="1" stopColor="#712FFF" />
                            </linearGradient>
                            <clipPath id="clip0_79_1545">
                                <rect width="60" height="60" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <h2 className="text-2xl mt-4 capitalize"> Submit a Support Ticket </h2>
                </div>

                {/* Email Support */}
                <div className=" shadow-lg rounded-lg p-6 flex flex-col items-center text-center">

                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <path d="M20.8076 16.8078L22.9286 18.9288C26.8352 15.0234 33.1658 15.0234 37.0706 18.9288L39.1934 16.8078C34.115 11.7306 25.886 11.7294 20.8076 16.8078Z" fill="url(#paint0_linear_79_1555)" />
                        <path d="M49.9998 25.9998C49.9998 14.952 41.049 6 30 6C18.954 6 10.0002 14.952 10.0002 25.9998C7.791 25.9998 6 27.7908 6 30V42C6 44.2092 7.791 46.0002 10.0002 46.0002H16.0002C17.1048 46.0002 18 45.1056 18 43.9998V34.0002C18 32.9004 17.5008 31.2498 16.8906 30.336L14.0004 26.0004C14.0004 17.1624 21.1632 10.0002 30.0006 10.0002C38.8404 10.0002 46.0008 17.1624 46.0008 26.0004L43.11 30.336C42.4998 31.2498 42 32.9004 42 34.0002V44.559C39.0684 47.889 34.7856 49.9998 30 49.9998H25.9998V54H30C36.5388 54 42.324 50.8494 45.9726 46.0002H49.9998C52.209 46.0002 54 44.2092 54 42V30C54 27.7908 52.209 25.9998 49.9998 25.9998ZM13.9998 42H9.9996V30H11.859L13.5618 32.5548C13.7418 32.838 13.9914 33.6666 13.9992 34.0038L13.9998 42ZM49.9998 42H46.0002V34.0038C46.008 33.666 46.2582 32.838 46.4376 32.5548L48.1404 30H49.9998V42Z" fill="url(#paint1_linear_79_1555)" />
                        <defs>
                            <linearGradient id="paint0_linear_79_1555" x1="30.0005" y1="12.9995" x2="30.0005" y2="18.9288" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#1AE1AB" />
                                <stop offset="1" stopColor="#712FFF" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_79_1555" x1="30" y1="6" x2="30" y2="54" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#1AE1AB" />
                                <stop offset="1" stopColor="#712FFF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <h2 className="text-2xl mt-4 capitalize">Live Chat</h2>

                </div>
            </div>

            {/* FAQ Section */}
            <h2 className="text-[40px] capitalize font-bold mt-8 text-center mb-19">Frequently Asked Questions</h2>
            <div className="space-y-8 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`border p-4 rounded-md cursor-pointer transition-all ${activeIndex === index ? "border-[#1AE1AB]" : "border-gray-500"
                            }`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{faq.question}</h3>
                            {activeIndex === index ? (
                                <FaMinus className="text-[#1AE1AB] text-xl" />
                            ) : (
                                <FaPlus className=" text-xl" />
                            )}
                        </div>
                        {activeIndex === index && (
                            <p className="mt-2 ">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>

            
        </div>
    );
};

export default SupportHelp;
