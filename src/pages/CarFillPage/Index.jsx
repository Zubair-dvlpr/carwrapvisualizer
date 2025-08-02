import React, { useState, useRef, useContext, useEffect } from 'react';
import YearSelector from './Components/YearSelector';
import MakeSelector from './Components/MakeSelector';
import ModelSelector from './Components/ModelSelector';
import colorfullcar from '../../assets/images/carshowRoom.png';
import logo3m from '../../assets/images/3m.png';
import vector from '../../assets/images/vector.png';
import teckwrap from '../../assets/images/Teckwrap.png';
import Vvivid_Logo from '../../assets/images/Vvivid_Logo.webp';
import apa from '../../assets/images/apa-logo.jpg';
import frog from '../../assets/images/frog.png';
import { AuthContext } from '../../context/AuthContext';
// import loaderGif from "../../assets/loading.gif";
import loaderGif from '../../assets/loading.gif';
import { useDispatch } from 'react-redux';
import { generateCarImageAPIFn } from '../../redux/features/Studio/studioFus';
import { Link } from 'react-router-dom';
import { BrandDropdown } from './Components/BrandDropdown';
import { brand3MHex, brandAPAHex, brandAvery, brandTeckwrapHex, brandVinylFrogHex, brandVvividHex } from './Components/Brands';
import PopupModal from './Components/PopupModal';
const CarFillPage = ({ bg }) => {
  // console.log(bg)
  const dispatch = useDispatch();


  const brands = [
    {
      name: '3M',
      logo: logo3m, // Replace with your path
      colors: brand3MHex
    },
    {
      name: 'vector',
      logo: vector, // Replace with your path
      colors: brandAvery
    },
    {
      name: 'Teckwrap',
      logo: teckwrap,
      colors: brandTeckwrapHex
    },
    {
      name: 'Vvivid',
      logo: Vvivid_Logo,
      colors: brandVvividHex
    },
    {
      name: 'APA',
      logo: apa,
      colors: brandAPAHex
    },
    {
      name: 'Vinyl Frog',
      logo: frog,
      colors: brandVinylFrogHex
    }
  ];

  const { animation, setAnimation, fetchUserInfo, credits } = useContext(AuthContext);
  const [showNoCreditsPopup, setShowNoCreditsPopup] = useState(false); // ✅ Popup flag
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showTooManyRequestsPopup, setShowTooManyRequestsPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showIncompleteSelectionPopup, setShowIncompleteSelectionPopup] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const imageRef = useRef(null);
  useEffect(() => {
    console.log(credits, " udpated")
    fetchUserInfo()
  }, [])
  // fetchUserInfo();
  const generateImage = async (year, make, model, finish, color) => {
    try {
      setAnimation(true);

      if (credits <= 0) {

        setAnimation(false);
        setShowNoCreditsPopup(true);
        return;
      }

      const formatFinishLabel = (finishKey) => {
        const map = {
          Matte: 'Matte (flat, no reflections)',
          Satin: 'Satin (soft sheen, no gloss)',
          Gloss: 'Gloss (highly reflective)',
          Chrome: 'Chrome (mirror-like shine)',
          Carbon: 'Carbon (textured weave)',
          Flip: 'Flip (color-shifting)'
        };
        return map[finishKey] || finishKey;
      };

      const getColorNameByCode = (brand, finishKey, colorCode) => {
        const list = brand?.colors?.[finishKey] || [];
        const found = list.find(c => c.colorCode === colorCode);
        return found?.name || 'Unknown Color';
      };


      const response = await dispatch(
        generateCarImageAPIFn({
          year,
          make,
          model,
          finish: formatFinishLabel(finish),
          color,
          description: '',
          wrap: `${formatFinishLabel(finish)} ${getColorNameByCode(selectedBrand, finish, color)}`,
          promptType: 'side_view'
        })
      );


      if (response?.meta?.requestStatus === 'fulfilled') {
        const imageBytes = response.payload?.data?.image?.image?.imageBytes;
        const mimeType = response.payload?.data?.image?.image?.mimeType || 'image/png';

        if (!imageBytes) {
          setAnimation(false);
          setShowTooManyRequestsPopup(true);
          return;
        }

        const imageUrl = `data:${mimeType};base64,${imageBytes}`;
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
                  <span className=''> Year</span>
                  <YearSelector
                    onSelect={year => {
                      setSelectedYear(year);
                      setSelectedMake(''); // Reset make on year change
                    }}
                  />
                </label>
                {/* Make Selector */}
                <label className='flex flex-col gap-2 text-black'>
                  <span className=''> Make</span>
                  <MakeSelector selectedYear={selectedYear} onSelect={setSelectedMake} />
                </label>
                {/* Model Selector */}
                <label className='flex flex-col gap-2 text-black'>
                  <span className=''> Model</span>
                  <ModelSelector
                    selectedYear={selectedYear}
                    selectedMake={selectedMake}
                    onSelect={setSelectedModel}
                  />
                </label>
              </div>
            </div>
            <div className={`mx-auto max-w-4xl ${bg ? "text-white" : "text-black"} py-10 text-center`}>
              <div className='bg-[#2B2C2C] flex items-center gap-4 flex-col sm:flex-row justify-around  p-5 rounded-xl'>
                <h4 className='text-2xl text-white font-semibold text-left'>Select Wrap Brand</h4>

                <BrandDropdown
                  brands={brands}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={handleBrandClick}
                />


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
                        {cat.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>

                  {selectedCategory && (
                    <div className='border-t h-[480px] rounded overflow-y-scroll hide-scrollbar'>
                      {/* <h6 className="text-lg font-medium mb-3">{selectedCategory} Colors</h6> */}
                      <div className='grid grid-cols-1'>
                        {selectedBrand.colors[selectedCategory].map((item, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-between border border-[#353535] text-white bg-black shadow-sm cursor-pointer hover:shadow-md transition'
                            onClick={async () => {
                              if (!selectedYear || !selectedMake || !selectedModel) {
                                setShowIncompleteSelectionPopup(true);
                                return;
                              }

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

                                setTimeout(() => {
                                  imageRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                              } catch (err) {
                                console.error(err.message);
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
                            <span className='text-sm  p-4'>{selectedCategory.replace(/_/g, ' ')}</span>
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

      {showIncompleteSelectionPopup && (
        <PopupModal
          title="Select All Vehicle Details"
          message="Please select Year, Make, and Model before choosing a wrap color."
          onClose={() => setShowIncompleteSelectionPopup(false)}
          icon="⚠️"
        />
      )}

    </>
  );
};

export default CarFillPage;



