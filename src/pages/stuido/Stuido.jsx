import React, { useState, useRef, useContext, useEffect } from 'react';
import YearSelector from './Components/YearSelector';
import MakeSelector from './Components/MakeSelector';
import ModelSelector from './Components/ModelSelector';
import colorfullcar from '../../assets/images/carshowRoom.png';
import logo3m from '../../assets/images/3m.png';
import vector from '../../assets/images/vector.png';
import loaderGif from '../../assets/loading.gif';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { generateStudioImageAPIFn } from '../../redux/features/Studio/studioFus';
import { useLocation } from 'react-router-dom';

const Studio = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFinish, setSelectedFinish] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const [bookingData, setBookingData] = useState(null);
    const [bookingError, setBookingError] = useState(false);
    const [loadingBooking, setLoadingBooking] = useState(true);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
    const [animation, setAnimation] = useState(false);
    const [savedImages, setSavedImages] = useState([]);
    const [selectedSavedId, setSelectedSavedId] = useState(null);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('wrapHistory') || '[]');
        setSavedImages(history);
    }, [generatedImage]); // update after image generation


    const imageRef = useRef(null);

    const wrapFilmColors = {
        Gloss: [
            { name: 'Gloss Black', colorCode: '#000000' },
            { name: 'Gloss White', colorCode: '#FFFFFF' },
        ],
        Matte: [
            { name: 'Matte Black', colorCode: '#1C1C1C' },
            { name: 'Matte White', colorCode: '#D3D3D3' },
        ]
    };

    const brands = [
        { name: '3M', logo: logo3m, colors: wrapFilmColors },
        { name: 'Avery Dennison', logo: vector, colors: wrapFilmColors }
    ];



    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        const bookingId = pathSegments[pathSegments.length - 1];

        const fetchBooking = async () => {
            try {
                const response = await axios.get(
                    `https://carwrapvisualizer-backend-52873ccc984d.herokuapp.com/api/v1/public/get-booking/${bookingId}`
                );

                if (response?.data?.status === 'success') {
                    console.log('✅ Booking Data:', response.data.data);
                    setBookingData(response.data.data);
                    setBookingError(false);
                } else {
                    setBookingError(true);
                }
            } catch (error) {
                console.error('❌ Error fetching booking:', error);
                setBookingError(true);
            } finally {
                setLoadingBooking(false);
            }
        };

        fetchBooking();
    }, [location]);



    const generateImage = async (year, make, model, finish, color) => {
        if (localStorage.getItem('wrapCredits') === null) {
            localStorage.setItem('wrapCredits', '5'); // default on first use
        }

        let remainingCredits = parseInt(localStorage.getItem('wrapCredits'), 10);

        if (remainingCredits <= 0) {
            alert('❌ You have used all 5 wrap credits.');
            return;
        }

        setAnimation(true);

        try {
            const response = await dispatch(
                generateStudioImageAPIFn({ year, make, model, finish, color, description: '' })
            );

            const images = response?.payload?.data?.image || [];
            const inlineData = images.find((img) => img.inlineData)?.inlineData?.data;
            console.log(response)
            console.log(inlineData)
            if (!inlineData) {
                setAnimation(false);
                alert('Too many requests. Please wait and try again.');
                return;
            }

            const imageUrl = `data:image/png;base64,${inlineData}`;
            setGeneratedImage(imageUrl);

            // Save to localStorage
            const newRecord = {
                id: Date.now(),
                year, make, model, finish, color,
                image: imageUrl
            };

            const history = JSON.parse(localStorage.getItem('wrapHistory') || '[]');
            const updatedHistory = [...history, newRecord];
            localStorage.setItem('wrapHistory', JSON.stringify(updatedHistory));

            // Update credits
            remainingCredits -= 1;
            localStorage.setItem('wrapCredits', remainingCredits.toString());

            setTimeout(() => {
                imageRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
            console.error(error);
            alert(error.message || 'Something went wrong');
        } finally {
            setAnimation(false);
        }
    };


    if (loadingBooking) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-black">
                <p>Loading booking details...</p>
            </div>
        );
    }

    if (bookingError || !bookingData) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-black">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">🚫 Booking Not Found</h2>
                    <p className="text-lg">The booking ID is invalid or has been removed. Please check the link again.</p>
                </div>
            </div>
        );
    }


    return (
        <>
            {animation && (
                <div className='absolute top-0 left-0 w-full bg-[#000000d2] flex justify-center h-screen items-center z-50'>
                    <img src={loaderGif} alt='Loading...' className='w-36' />
                </div>
            )}

            <div className='text-white pt-10'>


                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    {/* Image Preview */}
                    <div ref={imageRef} className="mb-6 w-full text-center">
                        {generatedImage ? (
                            <img src={generatedImage} alt="Generated Car" className="rounded max-w-4xl mx-auto" />
                        ) : (
                            <img src={colorfullcar} alt="Default Car" className="rounded max-w-4xl mx-auto" />
                        )}
                    </div>

                    {/* Vehicle Selectors */}
                    <div className="grid sm:grid-cols-3 gap-4 w-full max-w-4xl mb-10">
                        <YearSelector onSelect={setSelectedYear} value={selectedYear} />
                        <MakeSelector selectedYear={selectedYear} onSelect={setSelectedMake} value={selectedMake} />
                        <ModelSelector
                            selectedYear={selectedYear}
                            selectedMake={selectedMake}
                            value={selectedModel}
                            onSelect={setSelectedModel}
                        />
                    </div>

                    {/* Brand Selectors */}
                    <div className="bg-[#2B2C2C] p-5 rounded-xl w-full max-w-4xl mb-6">
                        <h4 className="text-xl font-semibold mb-4">Select Wrap Brand</h4>
                        <div className="flex gap-10 justify-center flex-wrap">
                            {brands.map((brand, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSelectedBrand(brand);
                                        setSelectedCategory(null);
                                    }}
                                    className={`cursor-pointer border-2 p-2 rounded-lg ${selectedBrand?.name === brand.name ? 'border-blue-500' : 'border-transparent'}`}
                                >
                                    <img src={brand.logo} alt={brand.name} className="h-14 mx-auto" />
                                    <p className="mt-2 text-center">{brand.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category Buttons */}
                    {selectedBrand && (
                        <div className="mb-6">
                            <div className="flex flex-wrap justify-center gap-4">
                                {Object.keys(selectedBrand.colors).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded ${selectedCategory === cat ? 'bg-blue-600' : 'bg-gray-700'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Colors List */}
                    {selectedCategory && selectedBrand && (
                        <div className="w-full max-w-4xl grid gap-4">
                            {selectedBrand.colors[selectedCategory].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center border border-[#353535] bg-black rounded cursor-pointer"
                                    onClick={() => {
                                        setSelectedFinish(selectedCategory);
                                        setSelectedColor(item.colorCode);
                                        generateImage(selectedYear, selectedMake, selectedModel, selectedCategory, item.colorCode);
                                    }}
                                >
                                    <div className="p-4">
                                        <div
                                            className="w-10 h-10 rounded-full border"
                                            style={{ backgroundColor: item.colorCode }}
                                        ></div>
                                    </div>
                                    <p className="flex-1 border-x border-[#353535] p-4">{item.name}</p>
                                    <span className="p-4">{selectedCategory}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {savedImages.length > 0 && (
                    <div className="w-full max-w-4xl mb-4">
                        <label className="block text-white mb-1 font-medium">🔁 Select Previous Wrap:</label>
                        <select
                            className="w-full p-2 rounded bg-[#1f1f1f] text-white"
                            onChange={(e) => {
                                const selected = savedImages.find(img => img.id === parseInt(e.target.value));
                                if (selected) {
                                    setSelectedYear(selected.year);
                                    setSelectedMake(selected.make);
                                    setSelectedModel(selected.model);
                                    setSelectedBrand({ name: 'Custom', colors: wrapFilmColors }); // or detect from saved
                                    setSelectedFinish(selected.finish);
                                    setSelectedColor(selected.color);
                                    setGeneratedImage(selected.image);
                                }
                                setSelectedSavedId(e.target.value);
                            }}
                        >
                            <option value="">-- Select a saved image --</option>
                            {savedImages.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.year} {item.make} {item.model} ({item.finish})
                                </option>
                            ))}
                        </select>
                    </div>
                )}


                {bookingData && (
                    <div className="bg-[#1a1a1a] text-white mt-10 px-6 py-4 rounded-xl max-w-4xl w-full mx-auto shadow-lg text-sm">
                        <h3 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-1">
                            📋 Booking Summary
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                            <div><span className="font-medium">👤 Name:</span> {bookingData.firstName} {bookingData.lastName}</div>
                            <div><span className="font-medium">📧 Email:</span> {bookingData.email}</div>
                            <div><span className="font-medium">📞 Phone:</span> {bookingData.phone}</div>
                            <div><span className="font-medium">🚘 Vehicle:</span> {bookingData.year} {bookingData.make} {bookingData.model}</div>
                            <div><span className="font-medium">🎨 Wrap Color:</span> {bookingData.wrapColor}</div>
                            <div><span className="font-medium">🗓️ Booking Date:</span> {new Date(bookingData.bookingDate).toLocaleDateString()}</div>
                            <div><span className="font-medium">💬 Notes:</span> {bookingData.notes || '—'}</div>
                        </div>
                    </div>
                )}
                <div className='w-full text-center'>
                    <button
                        onClick={async () => {
                            const selected = savedImages.find(i => i.id === parseInt(selectedSavedId));
                            if (!selected) return alert("No image selected");

                            try {
                                const publicId = bookingData?.publicAccessId;
                                const payload = {
                                    publicId,
                                    year: selected.year,
                                    make: selected.make,
                                    model: selected.model,
                                    wrapColor: selected.finish
                                };

                                const res = await axios.post("http://13.51.196.87:8000/api/v1/public/update-booking", payload);

                                if (res.data?.status === 'success') {
                                    alert('✅ Booking updated successfully');
                                } else {
                                    alert('❌ Failed to update booking');
                                }
                            } catch (err) {
                                console.error(err);
                                alert('🔥 Error while updating booking');
                            }
                        }}
                        className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 mx-auto rounded-full transition"
                    >
                        Update Booking
                    </button>
                </div>


            </div>
        </>
    );
};

export default Studio;