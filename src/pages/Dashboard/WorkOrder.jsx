import React, { useContext, useEffect, useState } from "react";
import { FiEdit, FiCalendar, FiCreditCard, FiUpload, FiFile, FiX } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';
import YearSelector from "../CarFillPage/Components/YearSelector";
import MakeSelector from "../CarFillPage/Components/MakeSelector";
import ModelSelector from "../CarFillPage/Components/ModelSelector";
import { AuthContext } from "../../context/AuthContext";

const brandOptions = [
    "3M", "Avery Dennison", "Oracal (Orafol)", "KPMF (Kay Premium Marking Films)", "Hexis",
    "Inozetek", "Arlon", "APA America (APA Spa)", "TeckWrap", "VViViD Vinyl",
    "Rwraps (Rvinyl)", "SOTT", "CheetahWrap", "PremiumTech", "Metro Wrap (by Metro Restyling)",
    "FEELISONG", "Icarus Wraps", "NDFOS", "TactiColor", "G-SWELL"
];
const wrapColors = {
    '3M': [
        { name: "Gloss Black (G12)", colorCode: "#000000" },
        { name: "Gloss White (G10)", colorCode: "#FFFFFF" },
        { name: "Gloss Hot Rod Red (G13)", colorCode: "#C8102E" },
        { name: "Gloss Burnt Orange (G14)", colorCode: "#BF5700" }
    ],
    // Add other brand color options here
};
export default function WorkOrder() {
    const { domain } = useContext(AuthContext);
    const location = useLocation();
    const booking = location.state?.booking;
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bookingDate: '',
        completionDate: '',
        brand: '',
        wrapColor: '',
        ppfCost: '',
        checkInTime: '',
        decalsCost: '',
        windowTintingCost: '',
        frontPercentage: '',
        rearPercentage: '',
        notes: '',
        customerQuote: '',
        price: '',
        vipbooking: '',
        repeat_customer: '',
        dealership: '',
    });

    useEffect(() => {
        if (booking) {
            const formatDate = (isoString) => {
                return isoString ? new Date(isoString).toISOString().split('T')[0] : '';
            };
            console.log("Received booking:", booking);
            setFormData(prev => ({
                ...prev,
                firstName: booking.firstName,
                lastName: booking.lastName,
                email: booking.email,
                phone: booking.phone,
                bookingDate: formatDate(booking.bookingDate),
                completionDate: formatDate(booking.completionDate),
                year: booking.year,
                make: booking.make,
                model: booking.model,
                brand: booking.brand,
                wrapColor: booking.wrap_color,
                customerQuote: booking.customer_quote,
                price: booking.price || '',
                vipbooking: booking.vipbooking || '',
                repeat_customer: booking.repeat_customer || '',
                dealership: booking.dealership || '',

                // NEW FIELDS from booking if available:
                estimatedSQ: booking.estimatedSQ || '',
                estimatedRolls: booking.estimatedRolls || '',
                estimatedMaterialCost: booking.estimatedMaterialCost || '',
                netMaterialRevenue: booking.netMaterialRevenue || '',
                ppfCost: booking.ppfCost || '',
                decalsCost: booking.decalsCost || '',
                windowTintingCost: booking.windowTintingCost || '',
                frontPercentage: booking.frontPercentage || '',
                rearPercentage: booking.rearPercentage || '',
                notes: booking.notes || ''
            }));

            // Set year/make/model from booking
            setSelectedYear(booking.year || '');
            setSelectedMake(booking.make || '');
            setSelectedModel(booking.model || '');

            // Update local states too:
            setSelectedBrand(booking.brand || '');
            setSelectedColor(booking.wrap_color || '');
        }
    }, [booking]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const removeFile = () => setSelectedFile(null);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        payload.append('booking_id', booking.id);
        Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
        payload.append('year', selectedYear);
        payload.append('make', selectedMake);
        payload.append('model', selectedModel);
        payload.append('estimatedSQ', document.getElementById("estimatedSQ")?.value);
        payload.append('estimatedRolls', document.getElementById("estimatedRolls")?.value);
        payload.append('estimatedMaterialCost', document.getElementById("estimatedMaterialCost")?.value);
        payload.append('netMaterialRevenue', document.getElementById("netMaterialRevenue")?.value);
        payload.append('checkInTime', document.getElementById("checkInTime")?.value);
        if (selectedFile) payload.append('file', selectedFile);

        try {
            const res = await fetch(`${domain}/booking/save_work_order.php`, {
                method: 'POST',
                body: payload
            });

            const result = await res.json();
            if (result.success) {
                alert("Work order saved successfully!");
            } else {
                alert("Failed to save work order.");
            }
        } catch (error) {
            console.error("Error submitting work order:", error);
            alert("An error occurred.");
        }
    };


    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Top section with 2 columns */}
            <div className="flex justify-between items-start">
                {/* Left column */}
                <div className="flex-1 pr-6">
                    <h2 className="text-2xl font-semibold mb-4">Car Wrap Visualizer™</h2>
                    <div className="max-w-[170px]">
                        <label htmlFor="typeOrCustomer" className="block mb-2 font-medium text-gray-700">
                            Type or Customer
                        </label>
                        <select
                            id="typeOrCustomer"
                            value={formData.dealership}
                            onChange={handleChange}
                            className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-2"
                        >
                            <option className="bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]">Dealer</option>
                            <option className="bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]">Customer</option>
                            <option className="bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]">Other</option>
                        </select>
                    </div>
                </div>

                {/* Right column */}
                <div className="flex-1 pl-6 flex flex-col items-end">
                    <div className="flex space-x-3 mb-4 text-gray-700">
                        <button
                            type="button"
                            aria-label="Edit"
                            className="flex flex-col items-center space-x-1 "
                        >
                            <span className="text-[#111827] font-Lato text-xs leading-6">Modify</span>
                            <span className="bg-[#d9d9d963] rounded-[99px] px-5  cursor-pointer py-3 mt-1.5"> <RiEditLine /> </span>

                        </button>
                        <button
                            type="button"
                            aria-label="Canal Appointment"
                            className="flex flex-col items-center space-x-1"
                        >
                            <span className="text-[#111827] font-Lato text-xs leading-6">Cancel Appointment</span>
                            <span className="bg-[#d9d9d963]  cursor-pointer rounded-[99px] px-5 py-3 mt-1.5"> <RxCross1 /> </span>


                        </button>
                        <button
                            type="button"
                            aria-label="Credit Used"
                            className="flex flex-col items-center space-x-1 hover:text-blue-600"
                        >
                            <span className="text-[#111827] font-Lato text-xs leading-6">Credit Used</span>
                            <span className="bg-[#d9d9d963] rounded-[99px] px-4 py-3 mt-1.5 text-[#111827] font-Lato text-xs "> 8/10 </span>

                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-[#EB227C] cursor-pointer text-white px-6 py-4 rounded-full hover:scale-95 transition">
                            Book IN
                        </button>
                        <button className="bg-[#447B52]  cursor-pointer text-white px-6 py-4 rounded-full hover:scale-95 transition">
                            Vehicle Completed
                        </button>
                    </div>
                </div>
            </div>

            {/* Heading and paragraph below */}
            <div>
                <h3 className="text-xl font-semibold mb-1">Work Order</h3>
                <p className="text-gray-600">Please complete the work order and to update status information.</p>
            </div>

            {/* Form */}
            <form className="space-y-8" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block labelStyle">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="inputStyle w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block labelStyle">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="inputStyle  w-full"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="block labelStyle">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email} onChange={handleChange}
                            placeholder="Email"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block labelStyle">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone} onChange={handleChange}
                            placeholder="Phone Number"
                            className="inputStyle  w-full"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="bookingDate" className="block labelStyle">
                            Booking Date
                        </label>
                        <input
                            type="date"
                            id="bookingDate"
                            name="bookingDate"
                            value={formData.bookingDate} onChange={handleChange}
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="checkInTime" className="block labelStyle">
                            Check In Time
                        </label>
                        <input
                            type="time"
                            id="checkInTime"
                            value={formData.checkInTime}
                            onChange={handleChange}
                            name="checkInTime"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="completionDate" className="block labelStyle">
                            Completion Date
                        </label>
                        <input
                            type="date"
                            id="completionDate"
                            value={formData.completionDate} onChange={handleChange}
                            name="completionDate"
                            className="inputStyle  w-full"
                        />
                    </div>
                </div>

                {/* Vehicle heading */}
                <h3 className="text-xl font-Poppins font-semibold mt-12 mb-4">Vehicle</h3>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="completionDate" className="block labelStyle">
                            Year
                        </label>
                        <YearSelector value={selectedYear} onSelect={(year) => {
                            setSelectedYear(year);
                            setSelectedMake('');
                            setSelectedModel('');
                        }} />
                    </div>
                    <div>
                        <label htmlFor="completionDate" className="block labelStyle">
                            Make
                        </label>
                        <MakeSelector
                            selectedYear={selectedYear}
                            value={selectedMake}
                            onSelect={(make) => {
                                setSelectedMake(make);
                                setSelectedModel('');
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="completionDate" className="block labelStyle">
                            Model
                        </label>
                        <ModelSelector
                            selectedYear={selectedYear}
                            selectedMake={selectedMake}
                            value={selectedModel}
                            onSelect={setSelectedModel}
                        />
                    </div>

                </div>

                {/* Vehicle heading */}
                <h3 className="text-lg font-semibold mt-12 mb-4">Material</h3>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Brand Select */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Brand</label>
                        <select
                            value={selectedBrand}
                            onChange={(e) => {
                                const brand = e.target.value;
                                setSelectedBrand(brand);
                                setFormData(prev => ({ ...prev, brand: brand, wrapColor: '' })); // reset wrap color
                                setSelectedColor('');
                            }}
                            className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3"
                        >
                            <option value="">Select Brand</option>
                            {brandOptions.map((brand, idx) => (
                                <option key={idx} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>

                    {/* Wrap Color Select */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Wrap Color</label>
                        <select
                            value={selectedColor}
                            onChange={(e) => {
                                const color = e.target.value;
                                setSelectedColor(color);
                                setFormData(prev => ({ ...prev, wrapColor: color }));
                            }}
                            className={`w-full bg-[#F6F9FF] ${!wrapColors[selectedBrand] ? 'opacity-55' : 'opacity-100'} focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}
                            disabled={!wrapColors[selectedBrand]}
                        >
                            <option value="">Select Color</option>
                            {(wrapColors[selectedBrand] || []).map((color, idx) => (
                                <option key={idx} value={color.name}>{color.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="estimatedSQ" className="block labelStyle">
                            Estimated SQ
                        </label>
                        <input
                            type="number"
                            id="estimatedSQ"
                            name="estimatedSQ"
                            value={formData.estimatedSQ}
                            onChange={handleChange}
                            placeholder="Estimated SQ"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedRolls" className="block labelStyle">
                            Estimated Rolls
                        </label>
                        <input
                            type="number"
                            id="estimatedRolls"
                            value={formData.estimatedRolls}
                            onChange={handleChange}

                            name="estimatedRolls"
                            placeholder="Estimated Rolls"
                            className="inputStyle  w-full"
                        />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="estimatedMaterialCost" className="block labelStyle">
                            Estimated Material Cost
                        </label>
                        <input
                            type="number"
                            id="estimatedMaterialCost"
                            name="estimatedMaterialCost"
                            value={formData.estimatedMaterialCost}
                            onChange={handleChange}

                            placeholder="Estimated Material Cost"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="customerQuote" className="block labelStyle">
                            Customer Quote
                        </label>
                        <input
                            type="number"
                            id="customerQuote"
                            name="customerQuote"
                            value={formData.customerQuote} onChange={handleChange}
                            placeholder="Customer Quote"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="netMaterialRevenue" className="block labelStyle">
                            Net Material Revenue
                        </label>
                        <input
                            type="number"
                            id="netMaterialRevenue"
                            value={formData.netMaterialRevenue}
                            onChange={handleChange}

                            name="netMaterialRevenue"
                            placeholder="Net Material Revenue"
                            className="inputStyle  w-full"
                        />
                    </div>
                </div>

                {/* Additional Services heading */}
                <h3 className="text-lg font-semibold mt-12 mb-4">Additional Services</h3>

                {/* Row 6 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                        <label htmlFor="ppfCost" className="block labelStyle">
                            Paint protection film (PPF) (Enter cost)
                        </label>
                        <input
                            type="number"
                            id="ppfCost"
                            value={formData.ppfCost}
                            onChange={handleChange}
                            name="ppfCost"
                            placeholder="Enter cost"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="decalsCost" className="block labelStyle">
                            Decals/graphics installation (Enter cost)
                        </label>
                        <input
                            type="number"
                            id="decalsCost"
                            name="decalsCost"
                            value={formData.decalsCost} onChange={handleChange}
                            placeholder="Enter cost"
                            className="inputStyle  w-full"
                        />
                    </div>

                    {/* Upload file */}
                    <div>
                        <label className="block labelStyle">
                            Upload File
                        </label>
                        <div className="flex flex-col items-center border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-100 relative">
                            <label
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center cursor-pointer"
                            >
                                <div className="flex items-center space-x-2">
                                    <FiUpload className="w-5 h-5 text-gray-700" />
                                    <span className="font-medium text-gray-700">Upload file</span>
                                </div>
                                <input
                                    id="file-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            {selectedFile && (
                                <div className="flex items-center justify-between w-full mt-2 border border-gray-200 rounded p-2 bg-gray-50">
                                    <div className="flex items-center space-x-2">
                                        <FiFile className="w-5 h-5 text-gray-500" />
                                        <span className="text-sm text-gray-700">
                                            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                                        </span>
                                    </div>
                                    <button type="button" onClick={removeFile}>
                                        <FiX className="w-4 h-4 text-gray-600 cursor-pointer" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Row 7 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="windowTintingCost" className="block labelStyle">
                            Window Tinting (Enter cost)
                        </label>
                        <input
                            type="number"
                            value={formData.windowTintingCost} onChange={handleChange}
                            id="windowTintingCost"
                            name="windowTintingCost"
                            placeholder="Enter cost"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="frontPercentage" className="block labelStyle">
                            Front Percentage
                        </label>
                        <input
                            type="number"
                            value={formData.frontPercentage} onChange={handleChange}
                            id="frontPercentage"
                            name="frontPercentage"
                            placeholder="Front Percentage"
                            className="inputStyle  w-full"
                        />
                    </div>
                </div>

                {/* Row 8 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="rearPercentage" className="block labelStyle">
                            Rear Percentage
                        </label>
                        <input
                            type="number"
                            id="rearPercentage"
                            value={formData.rearPercentage} onChange={handleChange}
                            name="rearPercentage"
                            placeholder="Rear Percentage"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="notes" className="block labelStyle">
                            Notes / Special Instructions
                        </label>
                        <textarea
                            id="notes"
                            value={formData.notes} onChange={handleChange}
                            name="notes"
                            placeholder="Notes / Special Instructions"
                            rows={3}
                            className="inputStyle  resize-none w-full"
                        />
                    </div>
                </div>


                <button type="submit" className="bg-[#EB227C] text-white px-16 py-4 cursor-pointer rounded-full ">
                    Save
                </button>
            </form>
        </div>
    );
}
