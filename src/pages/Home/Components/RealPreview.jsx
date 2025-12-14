// RealPreview.jsx
import { Link } from 'react-router-dom';
import goldcar from '../../../assets/images/goldcar.webp';
import mapphoto from '../../../assets/images/mapphoto.png';
export default function RealPreview() {
    return (
        <div className="max-w-7xl mx-auto bg-no-repeat bg-bottom text-white py-20" style={{ backgroundImage: `url(${mapphoto})` }}>
            <div className="flex flex-col md:flex-row items-center gap-10">

                {/* Car Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={goldcar}
                        alt="car preview"
                        className="rounded-xl shadow-xl"
                    />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-6xl font-BeniRegular sm:leading-28 leading-16 md:text-8xl font-extrabold tracking-wide uppercase">
                        Real Wrap Previews From Real Drivers.
                    </h2>

                    <p className="mt-4 text-gray-300">
                        Browse real vehicles and wrap colors created by people using our platform.
                        See how different finishes look on actual cars.
                    </p>

                    <div className="mt-6">
                        <Link to={'/tool'} className=" px-8 py-3 cursor-pointer bg-gradient-to-r from-[#F77442] via-[#E00265] to-[#BA02BA] transition-all rounded-full text-white font-semibold">
                            Start Visualizing
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Banner */}
            <div className="mt-16">
                <div className="text-center bg-gradient-to-r from-[#FE8645] via-[#FF0C7D] to-[#C702C7] py-12 rounded-xl text-white font-bold md:text-4xl sm:text-2xl text-lg">
                    NEW WRAP BRANDS & COLORS ADDED WEEKLY.
                </div>
            </div>
        </div>
    );
}
