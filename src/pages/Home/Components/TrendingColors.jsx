// TrendingColors.jsx
import { Link } from 'react-router-dom';
import colorgrid from '../../../assets/images/colorgrid.png';
import purplecar from '../../../assets/images/purplecar.webp';

export default function TrendingColors() {
    return (
        <div className="w-full  bg-white py-20 text-black overflow-hidden">

            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* LEFT TITLE + TEXT + BUTTON */}
                <div>
                    <h2 className="text-6xl font-BeniRegular text-left sm:leading-28 leading-16 md:text-8xl font-extrabold tracking-wide uppercase">
                        Try Trending Colors.
                    </h2>

                    <p className="mt-4 text-gray-600 max-w-md">
                        Explore the most popular finishes: satin stealth, deep metallics, super-gloss, chrome, and more.
                    </p>
                    <div className="mt-6">
                        <Link to={'/tool'} className=" px-8 py-3 cursor-pointer bg-gradient-to-r from-[#F77442] via-[#E00265] to-[#BA02BA] transition-all rounded-full text-white font-semibold">
                            Start Visualizing
                        </Link>
                    </div>

                </div>

                {/* RIGHT COLOR GRID IMAGE */}
                <div className="flex justify-center md:justify-end">
                    <img
                        src={colorgrid}
                        alt="color grid"
                        className="w-[80%] md:w-[70%] rounded-lg shadow-lg"
                    />
                </div>
            </div>


            {/* SECOND ROW */}
            <div className="grid max-w-7xl mx-auto grid-cols-1  px-4 md:px-8 md:grid-cols-2 gap-16 items-center">

                {/* LEFT CAR IMAGE */}
                <div className="flex z-20 justify-center md:justify-start">
                    <img
                        src={purplecar}
                        alt="car wrap example"
                        className="rounded-2xl shadow-xl w-full md:w-[90%]"
                    />
                </div>

                {/* RIGHT TITLE + TEXT + BUTTON */}
                <div>
                    <h2 className="text-6xl font-BeniRegular text-left sm:leading-28 leading-16 md:text-8xl font-extrabold tracking-wide uppercase">
                        See Real-World Angles.
                    </h2>

                    <p className="mt-4 text-gray-600 max-w-md">
                        Front, rear, profile, ¾ — switch views to see how each wrap behaves from every angle.
                    </p>

                    <div className="mt-6">
                        <Link to={'/tool'} className=" px-8 py-3 cursor-pointer bg-gradient-to-r from-[#F77442] via-[#E00265] to-[#BA02BA] transition-all rounded-full text-white font-semibold">
                            Start Visualizing
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}
