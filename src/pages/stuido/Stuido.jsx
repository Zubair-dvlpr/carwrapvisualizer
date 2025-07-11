import React, { useState, useRef, useContext } from 'react';
import YearSelector from './Components/YearSelector';
import MakeSelector from './Components/MakeSelector';
import ModelSelector from './Components/ModelSelector';
import colorfullcar from '../../assets/images/carshowRoom.png';
import logo3m from '../../assets/images/3m.png';
import vector from '../../assets/images/vector.png';
import loaderGif from '../../assets/loading.gif';
import { useDispatch } from 'react-redux';
import { generateCarImageAPIFn, generateStudioImageAPIFn } from '../../redux/features/Studio/studioFus';

const Studio = () => {
    const dispatch = useDispatch();
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFinish, setSelectedFinish] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
    const [animation, setAnimation] = useState(false);

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

    const generateImage = async (year, make, model, finish, color) => {
        try {
            setAnimation(true);

            const response = await dispatch(
                generateStudioImageAPIFn({ year, make, model, finish, color, description: '' })
            );

            if (response?.meta?.requestStatus === 'fulfilled') {
                const imageArray = response.payload?.data?.image || [];
                const inlineData = imageArray.find((img) => img.inlineData)?.inlineData?.data;

                if (!inlineData) {
                    setAnimation(false);
                    alert('Too many requests. Please wait and try again.');
                    return;
                }

                const imageUrl = `data:image/png;base64,${inlineData}`;
                setGeneratedImage(imageUrl);
                setTimeout(() => {
                    imageRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                alert(response.payload || 'Image generation failed');
            }

            setAnimation(false);
        } catch (error) {
            setAnimation(false);
            console.error(error);
            alert(error.message || 'Something went wrong');
        }
    };

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
            </div>
        </>
    );
};

export default Studio;