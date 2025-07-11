import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import pagess from "../../../assets/images/pagess.png"
import howtoworkbg from "../../../assets/images/howtoworkbg.png"
import howtoworkimg1 from "../../../assets/images/howtoworkimg1.png"
import howtoworkimg2 from "../../../assets/images/howtoworkimg2.png"
import howtoworkimg3 from "../../../assets/images/howtoworkimg3.png"
const HowItWorks = () => {
  return (
    <section id='howitWorks' className=" text-white pt-24 pb-12 px-4 text-center bg-center  bg-no-repeat">
      {/* Top Heading and Text   style={{backgroundImage: `url('${howtoworkbg}')`}} */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-Inter sm:text-4xl font-extrabold leading-20  mb-4">How it Works </h2>
        <p className=" text-lg">
          Unlock the largest vehicle selection with our Car Wrap Visualizer™! Choose from over 1.2 million cars & see how any car—from 1990 to 2026, any make or model—looks with premium wraps from top brands like 3M, Avery Dennison, and Hexis.
        </p>

      </div>

      <div className='max-w-[1320px] mx-auto space-y-10 mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
          <div>
            <div className='bg-[#2B2C2C] md:p-10 p-4 flex flex-col justify-center rounded-4xl '>
              <h3 className='font-Lato text-3xl leading-9'>
                🎨 Customize and Show Off
              </h3>
              <p className='mb-6 mt-3'>
                Use the Car Wrap Visualizer™ to showcase any wrap on any vehicle — select any year, make, and model from 1990 to 2026. Whether in person, through a shared link, or embedded on your website, clients can see hyper-realistic previews of their own car in real time.
              </p>

              <img src={howtoworkimg1} alt="" className='w-full rounded-xl' />
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex gap-5'>
              <div className='w-4 bg-gradient-to-t to-green-300 from-blue-300'></div>
              <div className='text-left p-4'>
                <p > “I can test wild wrap ideas without touching a single roll of vinyl — it’s a game-changer, customers can view their vehicles in different colors and make decisions instantly.”Jamie Li – Auto Stylist, Chrome Garage”</p>
                <p className=' mt-4'>🛠 Built for car enthusiasts, designers, and wrap pros</p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1320px] mx-auto'>
          <div className='flex items-center'>
            <div className='flex gap-5'>
              <div className='w-2 bg-gradient-to-t to-green-300 from-blue-300'></div>
              <div className='text-left p-4'>
                <p > “It’s the easiest way I’ve found to help clients ‘see’ the wrap before we apply it.”</p>
                <p className=' mt-4'>Carlos Mendez – Owner, WrapHouse Customs</p>
              </div>
            </div>
          </div>
          <div>
            <div className='bg-[#2B2C2C] md:p-10 p-4 flex flex-col justify-center rounded-4xl '>
              <h3 className='font-Lato text-3xl leading-9'>
                👥 Engage with Clients
              </h3>
              <p className='mb-6 mt-3'>
                Send a personalized link where customers can explore colors and styles on their exact vehicle. Follow up with a high-quality visual proposal that eliminates guesswork and builds excitement.
              </p>

              <img src={howtoworkimg2} className='rounded-xl' alt="" />
            </div>
          </div>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1320px] mx-auto'>
          <div>
            <div className='bg-[#2B2C2C] md:p-10 p-4 flex flex-col justify-center rounded-4xl '>
              <h3 className='font-Lato text-3xl leading-9'>
                💼 Close More Deals
              </h3>
              <p className='mb-6 mt-3'>
                With stunning previews and an interactive experience, clients decide faster and with confidence — helping you win more business, faster.
              </p>

              <img src={howtoworkimg3} className='rounded-xl' alt="" />
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex gap-5'>
              <div className='w-2 bg-gradient-to-t to-green-300 from-blue-300'></div>
              <div className='text-left p-4'>
                <p > “The visualizer helps us seal deals 2x faster. Clients love seeing their car before we even start.”</p>
                <p className=' mt-4'>Aisha Khan – Sales Manager, Elite Wrap Studio</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='mt-10'>
        <Link to="/signup" className='bg-white text-gray-700 p-4 rounded-lg transition hover:scale-105'>
          Start Free Trial
        </Link>
      </div>


    </section>
  );
};

export default HowItWorks;
