import React, { useContext, useState } from "react";
import { FiEdit, FiCalendar, FiCreditCard, FiUpload, FiFile, FiX } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import YearSelector from "../CarFillPage/Components/YearSelector";
import MakeSelector from "../CarFillPage/Components/MakeSelector";
import ModelSelector from "../CarFillPage/Components/ModelSelector";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const BookingAppointment = () => {
    const { domain } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bookingDate: '',
        completionDate: '',
        vipStatus: '',
        repeatCustomer: '',
        dealershipType: '',
        price: '',
        ppfCost: '',
        decalsCost: '',
        windowTintingCost: '',
        frontPercentage: '',
        rearPercentage: '',
        additionalTotal: '',
        customerTotal: '',
        notes: ''
    });


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
    const handleFileChange = (e) => {
        if (e.target.files.length) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const removeFile = () => setSelectedFile(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData(e.target); // Use a new variable to avoid conflict

        // Add dropdown state values
        formPayload.append('vip', formState.vipStatus);
        formPayload.append('repeatCustomer', formState.repeatCustomer);
        formPayload.append('dealership', formState.dealershipType);
        formPayload.append('year', selectedYear);
        formPayload.append('make', selectedMake);
        formPayload.append('model', selectedModel);
        formPayload.append('brand', selectedBrand);
        formPayload.append('wrapColor', selectedColor);

        // File
        if (selectedFile) {
            formPayload.append('file', selectedFile);
        }

        // Validation
        if (!formState.vipStatus || !formState.repeatCustomer || !formState.dealershipType) {
            alert("Please select VIP, Repeat Customer, and Dealership Type");
            return;
        }

        try {
            const response = await fetch(`${domain}/booking/submit.php`, {
                method: 'POST',
                body: formPayload,
            });

            const result = await response.json();
            if (result.success) {
                alert('Booking submitted successfully!');
                navigate("/appointment");
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong.');
        }
    };




    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Top section with 2 columns */}
            <div className="grid md:grid-cols-2 grid-cols-1">
                {/* Left column */}
                <div className="flex-1  pr-6">
                    <h2 className="text-2xl font-semibold">Car Wrap Visualizer™</h2>
                    {/* Heading and paragraph below */}
                    <div className="mt-3">
                        <h3 className="text-xl font-semibold mb-1">Booking Appointment</h3>
                        <p className="text-gray-600">Client will receive a text message and email confirming the appointment </p>
                    </div>
                </div>

                {/* Right column */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    {/* VIP */}
                    <div>
                        <label htmlFor="VIP" className="block mb-2 font-medium text-gray-700">
                            VIP
                        </label>
                        <select
                            id="VIP"
                            form="bookingForm"
                            value={formState.vipStatus}
                            onChange={(e) => setFormState(prev => ({ ...prev, vipStatus: e.target.value }))}
                            className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-2"
                        >
                            <option value="">Select VIP Status</option>
                            <option value="vip_dealer">VIP Dealer</option>
                            <option value="vip_customer">VIP Customer</option>
                            <option value="vip_partner">Business Partner</option>
                            <option value="vip_other">Other</option>
                        </select>
                    </div>

                    {/* Repeat Customer */}
                    <div>
                        <label htmlFor="repeatCustomer" className="block mb-2 font-medium text-gray-700">
                            Repeat Customer
                        </label>
                        <select
                            id="repeatCustomer"
                            form="bookingForm"
                            value={formState.repeatCustomer}
                            onChange={(e) => setFormState(prev => ({ ...prev, repeatCustomer: e.target.value }))}
                            className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-2"
                        >
                            <option value="">Select Option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="unsure">Not Sure</option>
                        </select>
                    </div>

                    {/* Dealership */}
                    <div>
                        <label htmlFor="Dealership" className="block mb-2 font-medium text-gray-700">
                            Dealership Type
                        </label>
                        <select
                            id="Dealership"
                            form="bookingForm"
                            value={formState.dealershipType}
                            onChange={(e) => setFormState(prev => ({ ...prev, dealershipType: e.target.value }))}
                            className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-2"
                        >
                            <option value="">Select Dealership</option>
                            <option value="authorized">Authorized Dealer</option>
                            <option value="independent">Independent Dealer</option>
                            <option value="fleet">Fleet Account</option>
                            <option value="private">Private Seller</option>
                            <option value="none">Not Applicable</option>
                        </select>
                    </div>
                </div>

            </div>



            {/* Form */}
            <form id="bookingForm" className="space-y-8" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block labelStyle">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={(e) => setFormState(prev => ({ ...prev, firstName: e.target.value }))}
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
                            value={formState.lastName}
                            onChange={(e) => setFormState(prev => ({ ...prev, lastName: e.target.value }))}
                            placeholder="Last Name"
                            className="inputStyle  w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block labelStyle">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Email"
                            className="inputStyle  w-full"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div>
                        <label htmlFor="phone" className="block labelStyle">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Phone Number"
                            className="inputStyle  w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="bookingDate" className="block labelStyle">
                            Booking Date
                        </label>
                        <input
                            type="date"
                            id="bookingDate"
                            value={formState.bookingDate}
                            onChange={(e) => setFormState(prev => ({ ...prev, bookingDate: e.target.value }))}
                            name="bookingDate"
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
                            value={formState.completionDate}
                            onChange={(e) => setFormState(prev => ({ ...prev, completionDate: e.target.value }))}
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
                        <YearSelector onSelect={(year) => {
                            setSelectedYear(year);
                            setSelectedMake(''); // Reset make on year change
                        }} />
                    </div>
                    <div>
                        <label htmlFor="completionDate" className="block labelStyle">
                            Make
                        </label>
                        <MakeSelector selectedYear={selectedYear} onSelect={setSelectedMake} />
                    </div>
                    <div>
                        <label htmlFor="completionDate" className="block labelStyle">
                            Model
                        </label>
                        <ModelSelector selectedYear={selectedYear} selectedMake={selectedMake} onSelect={setSelectedModel} />
                    </div>

                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Brand Select */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Brand</label>
                        <select
                            value={selectedBrand}
                            onChange={(e) => {
                                setSelectedBrand(e.target.value);
                                setSelectedColor(''); // reset color on brand change
                            }}
                            className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3"
                        >
                            <option className="bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]" value="">Select Brand</option>
                            {brandOptions.map((brand, idx) => (
                                <option className="bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]" key={idx} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>

                    {/* Wrap Color Select */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Wrap Color</label>
                        <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className={`w-full bg-[#F6F9FF] ${!wrapColors[selectedBrand] ? 'opacity-55' : 'opacity-100'} focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}
                            disabled={!wrapColors[selectedBrand]}
                        >
                            <option className="bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]" value="">Select Color</option>
                            {(wrapColors[selectedBrand] || []).map((color, idx) => (
                                <option key={idx} className="bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]" value={color.name}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="Price" className="block labelStyle">
                            Price
                        </label>
                        <input
                            type="number"
                            id="Price"
                            name="Price"
                            value={formState.price}
                            onChange={(e) => setFormState(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="Enter Customer Cost"
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
                            name="ppfCost"
                            value={formState.ppfCost}
                            onChange={(e) => setFormState(prev => ({ ...prev, ppfCost: e.target.value }))}
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
                            value={formState.decalsCost}
                            onChange={(e) => setFormState(prev => ({ ...prev, decalsCost: e.target.value }))}
                            placeholder="Enter cost"
                            className="inputStyle  w-full"
                        />
                    </div>

                    {/* Upload file */}
                    <div>
                        <label className="block labelStyle">
                            Upload File
                        </label>
                        <div className="flex flex-col items-center  bg-[#F6F9FF] rounded p-4 cursor-pointer hover:shadow-xl relative">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="windowTintingCost" className="block labelStyle">
                            Window Tinting (Enter cost)
                        </label>
                        <input
                            type="number"
                            id="windowTintingCost"
                            name="windowTintingCost"
                            value={formState.windowTintingCost}
                            onChange={(e) => setFormState(prev => ({ ...prev, windowTintingCost: e.target.value }))}
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
                            id="frontPercentage"
                            name="frontPercentage"
                            value={formState.frontPercentage}
                            onChange={(e) => setFormState(prev => ({ ...prev, frontPercentage: e.target.value }))}
                            placeholder="Front Percentage"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="rearPercentage" className="block labelStyle">
                            Rear Percentage
                        </label>
                        <input
                            type="number"
                            id="rearPercentage"
                            value={formState.rearPercentage}
                            onChange={(e) => setFormState(prev => ({ ...prev, rearPercentage: e.target.value }))}
                            name="rearPercentage"
                            placeholder="Rear Percentage"
                            className="inputStyle  w-full"
                        />
                    </div>
                </div>

                {/* Row 8 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="additionalTotal" className="block labelStyle">
                            Additional Total
                        </label>
                        <input
                            type="number"
                            id="additionalTotal"
                            name="additionalTotal"
                            value={formState.additionalTotal}
                            onChange={(e) => setFormState(prev => ({ ...prev, additionalTotal: e.target.value }))}
                            placeholder="Additional Total"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="customerTotal " className="block labelStyle">
                            Customer Total
                        </label>
                        <input
                            type="number"
                            id="customerTotal"
                            name="customerTotal"
                            value={formState.customerTotal}
                            onChange={(e) => setFormState(prev => ({ ...prev, customerTotal: e.target.value }))}
                            placeholder="Customer Total"
                            className="inputStyle  w-full"
                        />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="notes" className="block labelStyle">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formState.notes}
                            onChange={(e) => setFormState(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Notes / Special Instructions"
                            rows={3}
                            className="inputStyle  resize-none w-full"
                        />
                    </div>
                </div>


                <div className="flex md:flex-row flex-col gap-3">
                    <button type="submit" className="bg-[#EB227C] text-white px-16 py-4 cursor-pointer rounded-full ">
                        Book Now
                    </button>

                    <button type="submit" className="bg-[#2B892B] text-white px-16 py-4 cursor-pointer rounded-full ">
                        Send Quote
                    </button>

                    <button type="submit" className="bg-[#2B892B] text-white px-16 py-4 cursor-pointer rounded-full ">
                        Generate Visualizer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookingAppointment
