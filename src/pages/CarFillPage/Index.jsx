import React, { useState, useRef, useContext } from 'react';
import YearSelector from './Components/YearSelector';
import MakeSelector from './Components/MakeSelector';
import ModelSelector from './Components/ModelSelector';
import garage from '../../assets/images/garage.png';
import colorfullcar from '../../assets/images/carshowRoom.png';
import logo3m from '../../assets/images/3m.png';
import vector from '../../assets/images/vector.png';
import avery from '../../assets/images/vvivid.svg';
import vvivid from '../../assets/images/vvivid.png';
import inozetek from '../../assets/images/inozetek.png';
import { AuthContext } from '../../context/AuthContext';
// import loaderGif from "../../assets/loading.gif";
import loaderGif from '../../assets/loading.gif';
import { useDispatch } from 'react-redux';
import { generateCarImageAPIFn } from '../../redux/features/Studio/studioFus';
import { Link } from 'react-router-dom';
const CarFillPage = ({ bg }) => {
  // console.log(bg)
  const dispatch = useDispatch();
  const wrapFilmColors = {
    Gloss: [
      { name: 'Gloss Black (G12)', colorCode: '#000000' },
      { name: 'Gloss White (G10)', colorCode: '#FFFFFF' },
      { name: 'Gloss Hot Rod Red (G13)', colorCode: '#C8102E' },
      { name: 'Gloss Burnt Orange (G14)', colorCode: '#BF5700' },
      { name: 'Gloss Bright Yellow (G15)', colorCode: '#FFD100' },
      { name: 'Gloss Sunflower (G25)', colorCode: '#FFC72C' },
      { name: 'Gloss Kelly Green (G46)', colorCode: '#00843D' },
      { name: 'Gloss Intense Blue (G47)', colorCode: '#005EB8' },
      { name: 'Gloss Sky Blue (G77)', colorCode: '#00B2A9' },
      { name: 'Gloss Light Ivory (G79)', colorCode: '#F6E6C3' },
      { name: 'Gloss Dark Red (G83)', colorCode: '#8B0000' },
      { name: 'Gloss Hot Pink (G103)', colorCode: '#FF69B4' },
      { name: 'Gloss White Aluminum (G120)', colorCode: '#D6D6D6' },
      { name: 'Gloss Boat Blue (G127)', colorCode: '#0033A0' },
      { name: 'Gloss Anthracite (G201)', colorCode: '#383838' },
      { name: 'Gloss Red Metallic (G203)', colorCode: '#B22222' },
      { name: 'Gloss Charcoal Metallic (G211)', colorCode: '#36454F' },
      { name: 'Gloss Black Metallic (G212)', colorCode: '#1C1C1C' },
      { name: 'Gloss Deep Blue Metallic (G217)', colorCode: '#003366' },
      { name: 'Gloss Blue Metallic (G227)', colorCode: '#1F75FE' },
      { name: 'Gloss Gold Metallic (G241)', colorCode: '#D4AF37' },
      { name: 'Gloss Lemon Sting (G335)', colorCode: '#FFF700' },
      { name: 'Gloss Green Envy (G336)', colorCode: '#00FF00' },
      { name: 'Gloss Blue Fire (G337)', colorCode: '#007FFF' },
      { name: 'Gloss Liquid Copper (G344)', colorCode: '#B87333' },
      { name: 'Gloss Fierce Fuchsia (G348)', colorCode: '#C154C1' }
    ],
    Satin: [
      { name: 'Satin Black (S12)', colorCode: '#1C1C1C' },
      { name: 'Satin White (S10)', colorCode: '#D3D3D3' },
      { name: 'Satin Battleship Gray (S51)', colorCode: '#7A7A7A' },
      { name: 'Satin Key West (S57)', colorCode: '#00D6B4' },
      { name: 'Satin Apple Green (S196)', colorCode: '#8DB600' },
      { name: 'Satin Pearl White (SP10)', colorCode: '#D8D8D8' },
      { name: 'Satin Frozen Vanilla (SP240)', colorCode: '#F5E9B8' },
      { name: 'Satin Flip Psychedelic (SP281)', colorCode: '#6B3F99' },
      { name: 'Satin Smoldering Red (S363)', colorCode: '#9E1B32' }
    ],
    Matte: [
      { name: 'Matte Black (M12)', colorCode: '#212121' },
      { name: 'Matte White (M10)', colorCode: '#D3D3D3' },
      { name: 'Matte Red (M13)', colorCode: '#9B1B30' },
      { name: 'Matte Yellow (M15)', colorCode: '#F4D03F' },
      { name: 'Matte Military Green (M26)', colorCode: '#4B5320' },
      { name: 'Matte Indigo (M27)', colorCode: '#3D4F8A' },
      { name: 'Matte Riviera Blue (M67)', colorCode: '#3C6B8B' },
      { name: 'Matte Dark Gray (M261)', colorCode: '#585858' },
      { name: 'Matte Charcoal Metallic (M211)', colorCode: '#333333' }
    ],
    Flip: [
      { name: 'Gloss Flip Psychedelic (FPE)', colorCode: '#6B3F99' },
      { name: 'Gloss Flip Ghost Pearl (FPG)', colorCode: '#D1B2FF' },
      { name: 'Gloss Flip Electric Wave (FPEW)', colorCode: '#00B2FF' }
    ],
    Brushed: [
      { name: 'Brushed Steel (BRF)', colorCode: '#B0B0B0' },
      { name: 'Brushed Aluminum (BRM)', colorCode: '#A8A8A8' }
    ],
    'Carbon Fiber': [
      { name: 'Carbon Fiber Black (CF12)', colorCode: '#1C1C1C' },
      { name: 'Carbon Fiber Charcoal (CF21)', colorCode: '#333333' }
    ]
  };

  const brands = [
    {
      name: '3M',
      logo: logo3m, // Replace with your path
      colors: wrapFilmColors
    },
    {
      name: 'vector',
      logo: vector, // Replace with your path
      colors: wrapFilmColors
    },
  ];
  const { animation, setAnimation, fetchUserInfo, credits } = useContext(AuthContext);
  const [showNoCreditsPopup, setShowNoCreditsPopup] = useState(false); // ✅ Popup flag
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showTooManyRequestsPopup, setShowTooManyRequestsPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const imageRef = useRef(null);
  const generateImage = async (year, make, model, finish, color) => {
    try {
      setAnimation(true);


      if (credits <= 0) {

        setAnimation(false);
        setShowNoCreditsPopup(true);
        return;
      }

      const response = await dispatch(
        generateCarImageAPIFn({
          year,
          make,
          model,
          finish,
          color,
          description: ''
        })
      );

      if (response?.meta?.requestStatus === 'fulfilled') {
        const imageArray = response.payload?.data?.image || [];
        const inlineData = imageArray.find((img) => img.inlineData)?.inlineData?.data;
        console.log("img response ", response.payload)
        if (!inlineData) {
          console.log(inlineData);
          setAnimation(false);
          setShowTooManyRequestsPopup(true); // ✅ Show the new popup
          return;
        }

        const imageUrl = `data:image/png;base64,${inlineData}`;
        await fetchUserInfo();
        setAnimation(false);
        return imageUrl;

      } else {
        setAnimation(false);
        throw new Error(response.payload || 'Image generation failed');
      }
    } catch (error) {
      setAnimation(false);
      console.error(error);
      throw error;
    }
  };


  const handleConfirmSelection = async () => {
    try {
      const img = await generateImage(
        selectedYear,
        selectedMake,
        selectedModel,
        selectedFinish,
        selectedColor
      );
      setGeneratedImage(img);
    } catch (err) {
      alert(err.message);
    }
  };
  const handleFinishChange = e => {
    const finish = e.target.value;
    setSelectedFinish(finish);
    setSelectedColor(''); // reset color on finish change
  };

  const handleBrandClick = brand => {
    setSelectedBrand(brand);
    setSelectedCategory(null); // Reset category
  };

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  return (
    <>
      {animation && (
        <div className='absolute top-0 left-0 w-full  bg-[#000000d2] flex justify-center h-screen items-center'>
          <img src={loaderGif} alt='Loading...' className='w-36' />
        </div>
      )}

      {showNoCreditsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000d8] backdrop-blur-sm ">
          <div className="bg-[#0b0f1a] text-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🚀</span>
              <h2 className="text-lg font-semibold">You've Used All Your Free Credits</h2>
            </div>

            <p className="text-sm text-gray-300 mb-4">
              Start generating wraps, sending quotes, and managing customers with Car Wrap Visualizer
            </p>

            <p className="text-sm font-semibold text-white mb-2">
              Plans start at just <span className="text-yellow-400">$79/month</span>
            </p>

            <div className="flex items-start space-x-2 mb-2">
              <span className="text-yellow-400 text-xl">➕</span>
              <p className="text-sm text-gray-300">
                Add CRM for $49.99/month — automate follow-ups, marketing & warranty tracking
              </p>
            </div>

            <div className="flex items-start space-x-2 mb-6">
              <span className="text-yellow-300 text-xl">💡</span>
              <p className="text-sm text-gray-300">
                Show real wraps, close more jobs, and scale your shop — all in one platform.
              </p>
            </div>

            <Link
              to="/Subscription"
              className="w-full py-3 block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Join Car Wrap Visualizer™
            </Link>

            <button
              onClick={() => setShowNoCreditsPopup(false)}
              className="mt-4 w-full text-sm text-gray-400 hover:text-gray-200 transition"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}

      {showTooManyRequestsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000d8] backdrop-blur-sm">
          <div className="bg-[#0b0f1a] text-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-lg font-semibold">Too Many Requests</h2>
            </div>

            <p className="text-sm text-gray-300 mb-4">
              We’ve received too many requests from your account. This usually means the system is busy or you’ve just generated an image recently.
            </p>

            <p className="text-sm font-semibold text-white mb-4">
              Please wait a few seconds and try again.
            </p>

            <button
              onClick={() => setShowTooManyRequestsPopup(false)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Okay, Got It
            </button>

            <button
              onClick={() => setShowTooManyRequestsPopup(false)}
              className="mt-4 w-full text-sm text-gray-400 hover:text-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full bg-[#12161F] text-white px-6 py-3 rounded shadow-md mb-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold">
            Available Credits: <span >{credits}</span>
          </h2>
          <Link
            to="/Subscription"
            className="mt-2 sm:mt-0 text-sm font-semibold bg-[#ED217B] hover:bg-[#ED217B] text-white px-4 py-3 rounded-md transition"
          >
            Buy More Credits
          </Link>
        </div>
      </div>

      <div className={`flex max-w-7xl mx-auto  ${bg ? 'text-white ' : 'text-black'}  flex-col h-full `}>
        {/* Left Side Image */}
        <div className=' flex flex-col justify-center items-center'>
          <div ref={imageRef} className=''>
            {generatedImage ? (
              <img src={generatedImage} alt='Generated Car' className='w-full rounded' />
            ) : (
              <div className='w-full bg-cover bg-center'>
                <img src={colorfullcar} alt='Car' className='mx-auto max-w-4xl w-full' />
              </div>
            )}
          </div>
        </div>
        {/* Right Side Options */}
        <div className='sm:p-6 p-3'>
          <div className='space-y-4'>
            <div className='mx-auto max-w-3xl'>
              {/* Year Selector */}
              <h1 className='text-2xl  font-bold mb-4'>Select Vehicle</h1>

              <div className='grid sm:grid-cols-3 grid-cols-1  gap-3'>
                <label className='flex flex-col gap-2 text-black'>
                  <span className='text-white'> Year</span>
                  <YearSelector
                    onSelect={year => {
                      setSelectedYear(year);
                      setSelectedMake(''); // Reset make on year change
                    }}
                  />
                </label>
                {/* Make Selector */}
                <label className='flex flex-col gap-2 text-black'>
                  <span className='text-white'> Make</span>
                  <MakeSelector selectedYear={selectedYear} onSelect={setSelectedMake} />
                </label>
                {/* Model Selector */}
                <label className='flex flex-col gap-2 text-black'>
                  <span className='text-white'> Model</span>
                  <ModelSelector
                    selectedYear={selectedYear}
                    selectedMake={selectedMake}
                    onSelect={setSelectedModel}
                  />
                </label>
              </div>
            </div>
            <div className={`mx-auto max-w-4xl ${bg ? "text-white" : "text-black"} py-10 text-center`}>
              <div className='bg-[#2B2C2C]  p-5 rounded-xl'>
                <h4 className='text-xl text-white text-left mb-4'>Select Wrap Brand</h4>
                <div className='flex justify-center gap-12 mb-8'>
                  {brands.map(brand => (
                    <>
                      <div key={brand.name} onClick={() => handleBrandClick(brand)} className={`text-white border-2 rounded-lg transition ${brand.name === "vector" ? 'flex': ''} ${selectedBrand?.name === brand.name
                            ? 'border-blue-500'
                            : 'border-transparent'
                            }`}>
                        <img
                          key={brand.name}
                          src={brand.logo}
                          alt={brand.name}
                          className={`h-16 mx-auto cursor-pointer  p-1 transition `}
                          
                        /> {brand.name === "vector" ? (
                          <img
                            src={avery}
                            alt={brand.name}
                            className={`h-16 mx-auto cursor-pointer p-1 transition `}
                            onClick={() => handleBrandClick(brand)}
                          />
                        ) : ''}
                      </div>
                    </>
                  ))}
                </div>
              </div>
              {selectedBrand && (
                <div>
                  <div className='flex border border-[#8A8A8A] p-2 rounded w-fit mx-auto flex-wrap justify-center gap-4 my-6'>
                    {Object.keys(selectedBrand.colors).map(cat => (
                      <button
                        key={cat}
                        className={`px-4 py-2 rounded ${selectedCategory === cat ? 'bg-black text-white' : 'bg-[#ffffff0d]'
                          }`}
                        onClick={() => handleCategoryClick(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {selectedCategory && (
                    <div className='border-t pt-6'>
                      {/* <h6 className="text-lg font-medium mb-3">{selectedCategory} Colors</h6> */}
                      <div className='grid grid-cols-1'>
                        {selectedBrand.colors[selectedCategory].map((item, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-between border border-[#353535] text-white bg-black shadow-sm cursor-pointer hover:shadow-md transition'
                            onClick={async () => {
                              try {
                                setSelectedFinish(selectedCategory);
                                setSelectedColor(item.colorCode);

                                const img = await generateImage(
                                  selectedYear,
                                  selectedMake,
                                  selectedModel,
                                  selectedCategory,
                                  item.colorCode
                                );
                                setGeneratedImage(img);

                                // Scroll to image after slight delay to ensure it has rendered
                                setTimeout(() => {
                                  imageRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                              } catch (err) {
                                alert(err.message);
                              }
                            }}
                          >
                            <div className='p-4'>
                              <div
                                className='w-10  h-10 rounded-2xl border border-gray-400'
                                style={{ backgroundColor: item.colorCode }}
                              ></div>
                            </div>
                            <p className='grow  p-4 border-x border-[#353535]  text-md font-medium'>
                              {item.name}
                            </p>
                            <span className='text-sm  p-4'>{selectedCategory}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarFillPage;
