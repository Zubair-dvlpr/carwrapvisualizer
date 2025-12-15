import { FaStar } from "react-icons/fa";
import herobgtop from '../../../assets/images/hero-bg-top.png';
import bannercar from '../../../assets/images/bannercar.png';
import iPhone15 from '../../../assets/images/iPhone-15.webp';
import { Link } from "react-router-dom";
export default function HeroBanner() {
    return (
        <section className="relative w-full bg-black sm:pb-32 text-white overflow-hidden">
            {/* Background Grid / Glow (optional styling layer) */}
            <img src={herobgtop} alt="hero-bg-top.png" className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent opacity-80 to-black/90" />
            <div className="absolute inset-0 h-full bg-gradient-to-r from-black via-gray-600 to-black opacity-20 pointer-events-none ">

            </div>
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center px-6 pt-44 pb-48 sm:pb-96 text-center lg:text-left">
                {/* Top Badge */}
                <div className="bg-gradient-to-l ">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FF006919] backdrop-blur-[1px] border border-white/20 text-xs font-medium mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
                            <path d="M0 16.7619C0.911734 16.7198 1.6832 16.3691 2.3144 15.7099C2.9456 15.0506 3.26822 14.2651 3.26822 13.3534C3.26822 14.2651 3.5768 15.0506 4.208 15.7099C4.8392 16.3691 5.61067 16.7198 6.52241 16.7619C5.61067 16.804 4.8392 17.1546 4.208 17.8139C3.90284 18.1247 3.66258 18.4931 3.50123 18.8977C3.33988 19.3022 3.26067 19.7349 3.26822 20.1704C3.26822 19.2586 2.95963 18.4731 2.3144 17.8139C1.6832 17.1546 0.911734 16.804 0 16.7619ZM3.26822 6.66267C5.03558 6.57851 6.53643 5.89121 7.77078 4.60075C9.00513 3.3103 9.6223 1.78139 9.6223 0C9.6223 1.78139 10.2395 3.3103 11.4738 4.60075C12.7082 5.89121 14.209 6.56448 15.9904 6.66267C14.8262 6.71878 13.7602 7.04139 12.7783 7.65857C11.8105 8.26171 11.039 9.07526 10.4639 10.0852C9.90284 11.0951 9.6223 12.1752 9.6223 13.3534C9.6223 11.572 9.00513 10.0291 7.77078 8.73862C6.53643 7.43414 5.03558 6.74683 3.26822 6.66267ZM7.92507 21.7694C9.25761 21.7133 10.3938 21.1943 11.3195 20.2265C12.2453 19.2586 12.7082 18.1084 12.7082 16.7619C12.7082 18.1084 13.1711 19.2586 14.0968 20.2265C15.0226 21.1943 16.1447 21.7133 17.4772 21.7694C16.1447 21.8255 15.0226 22.3445 14.0968 23.3123C13.1711 24.2802 12.7082 25.4304 12.7082 26.7769C12.7082 25.4304 12.2453 24.2802 11.3195 23.3123C10.435 22.3716 9.21544 21.8173 7.92507 21.7694ZM17.4772 15.1208C18.8098 15.0647 19.9319 14.5457 20.8577 13.5778C21.7834 12.61 22.2323 11.4598 22.2323 10.0992C22.2323 11.4458 22.6952 12.596 23.6209 13.5638C24.5467 14.5316 25.6828 15.0506 27.0154 15.1067C25.6828 15.1628 24.5467 15.6818 23.6209 16.6497C22.6952 17.6175 22.2323 18.7677 22.2323 20.1143C22.2323 18.7677 21.7694 17.6175 20.8577 16.6497C19.9319 15.6959 18.8098 15.1769 17.4772 15.1208Z" fill="white" />
                            <path d="M0 16.7619C0.911734 16.7198 1.6832 16.3691 2.3144 15.7099C2.9456 15.0506 3.26822 14.2651 3.26822 13.3534C3.26822 14.2651 3.5768 15.0506 4.208 15.7099C4.8392 16.3691 5.61067 16.7198 6.52241 16.7619C5.61067 16.804 4.8392 17.1546 4.208 17.8139C3.90284 18.1247 3.66258 18.4931 3.50123 18.8977C3.33988 19.3022 3.26067 19.7349 3.26822 20.1704C3.26822 19.2586 2.95963 18.4731 2.3144 17.8139C1.6832 17.1546 0.911734 16.804 0 16.7619ZM3.26822 6.66267C5.03558 6.57851 6.53643 5.89121 7.77078 4.60075C9.00513 3.3103 9.6223 1.78139 9.6223 0C9.6223 1.78139 10.2395 3.3103 11.4738 4.60075C12.7082 5.89121 14.209 6.56448 15.9904 6.66267C14.8262 6.71878 13.7602 7.04139 12.7783 7.65857C11.8105 8.26171 11.039 9.07526 10.4639 10.0852C9.90284 11.0951 9.6223 12.1752 9.6223 13.3534C9.6223 11.572 9.00513 10.0291 7.77078 8.73862C6.53643 7.43414 5.03558 6.74683 3.26822 6.66267ZM7.92507 21.7694C9.25761 21.7133 10.3938 21.1943 11.3195 20.2265C12.2453 19.2586 12.7082 18.1084 12.7082 16.7619C12.7082 18.1084 13.1711 19.2586 14.0968 20.2265C15.0226 21.1943 16.1447 21.7133 17.4772 21.7694C16.1447 21.8255 15.0226 22.3445 14.0968 23.3123C13.1711 24.2802 12.7082 25.4304 12.7082 26.7769C12.7082 25.4304 12.2453 24.2802 11.3195 23.3123C10.435 22.3716 9.21544 21.8173 7.92507 21.7694ZM17.4772 15.1208C18.8098 15.0647 19.9319 14.5457 20.8577 13.5778C21.7834 12.61 22.2323 11.4598 22.2323 10.0992C22.2323 11.4458 22.6952 12.596 23.6209 13.5638C24.5467 14.5316 25.6828 15.0506 27.0154 15.1067C25.6828 15.1628 24.5467 15.6818 23.6209 16.6497C22.6952 17.6175 22.2323 18.7677 22.2323 20.1143C22.2323 18.7677 21.7694 17.6175 20.8577 16.6497C19.9319 15.6959 18.8098 15.1769 17.4772 15.1208Z" fill="url(#paint0_linear_1_247)" />
                            <defs>
                                <linearGradient id="paint0_linear_1_247" x1="7.31513" y1="13.3885" x2="27.0154" y2="13.3885" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F77442" />
                                    <stop offset="0.475962" stopColor="#E00265" />
                                    <stop offset="0.975962" stopColor="#BA02BA" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span>HUNDREDS OF COLORS. 15+ BRANDS. EVERY VEHICLE FROM 1990–2026.</span>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-6xl font-BeniRegular text-center md:text-9xl max-w-xl sm:leading-28 leading-16">
                    SEE YOUR CAR IN ANY WRAP COLOR INSTANTLY.
                </h1>

                {/* Subheading */}
                <p className="mt-4 max-w-4xl text-center font-Inter  text-sm md:text-base">
                    Choose your year, make, and model and preview wrap colors from the world’s top brands in real time. Front, rear, side, and top views.  Hundreds of finishes. Every brand you know — no photo upload needed.
                </p>

                {/* CTA Button */}
                <div className="mt-8">
                    <Link to={'/tool'} className="px-8 py-3 cursor-pointer bg-gradient-to-r from-[#F77442] via-[#E00265] to-[#BA02BA] transition-all rounded-full text-white font-semibold">
                        Start Visualizing
                    </Link>
                </div>


            </div>

            {/* Floating Car Image */}
            <div className="absolute left-0 bottom-0 w-full lg:w-[55%] opacity-90 mt-10">
                <img
                    src={bannercar}
                    alt="Car Visualizer"
                    className="w-full object-contain"
                />
            </div>

            {/* Phone Mockup */}
            <div className="absolute right-1/12 bottom-0 hidden lg:block w-[28%]">
                <img
                    src={iPhone15}
                    alt="Phone App Mockup"
                    className="w-full object-contain drop-shadow-2xl"
                />
            </div>

            <div className="custom-shape-divider-bottom-1765570074 absolute sm:bottom-0 -bottom-10 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg data-name="Layer 1" className="sm:h-[192px] h-28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" fill="white" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </section>
    );
}
