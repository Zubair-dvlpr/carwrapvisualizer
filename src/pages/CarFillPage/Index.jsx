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
import loaderGif from '../../assets/loading.gif';
import { useDispatch } from 'react-redux';
import { generateCarImageAPIFn } from '../../redux/features/Studio/studioFus';
import { Link } from 'react-router-dom';
// import { BrandDropdown } from './Components/BrandDropdown'; // desktop only now
import { brand3MHex, brandAPAHex, brandAvery, brandTeckwrapHex, brandVinylFrogHex, brandVvividHex } from './Components/Brands';
import PopupModal from './Components/PopupModal';
import InstagramCarousel from './Components/InstagramCarousel';
import { FaCompress, FaExpand } from 'react-icons/fa';

const CarFillPage = ({ bg }) => {
  const dispatch = useDispatch();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef(null);


  const toggleFullscreen = () => {
    // Only allow fullscreen when API images exist
    if (!generatedImages || generatedImages.length === 0) return;
    if (!isFullscreen) {
      if (fullscreenRef.current?.requestFullscreen) {
        fullscreenRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };


  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  


  const angles = [
    { label: 'Default', value: 'default' },
    { label: 'Side View', value: 'side_view' },
    { label: 'Front Angle', value: 'front_view' },
    { label: 'Rear Angle', value: 'rear_view' },
    { label: 'Top Down', value: 'top_down_view' },
  ];

  const brands = [
    { name: '3M', logo: logo3m, colors: brand3MHex },
    { name: 'Avery', logo: vector, colors: brandAvery },
    { name: 'Teckwrap', logo: teckwrap, colors: brandTeckwrapHex },
    { name: 'Vvivid', logo: Vvivid_Logo, colors: brandVvividHex },
    { name: 'APA', logo: apa, colors: brandAPAHex },
    { name: 'Vinyl Frog', logo: frog, colors: brandVinylFrogHex },
  ];

  const { animation, setAnimation, fetchUserInfo, credits } = useContext(AuthContext);
  const [showNoCreditsPopup, setShowNoCreditsPopup] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showTooManyRequestsPopup, setShowTooManyRequestsPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAngles, setSelectedAngles] = useState(['default']);
  const [showTooManyAnglesPopup, setShowTooManyAnglesPopup] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showIncompleteSelectionPopup, setShowIncompleteSelectionPopup] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);
  const imageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const formatFinishLabel = (finishKey) => {
    const map = {
      Matte: 'Matte',
      Satin: 'Satin',
      Gloss: 'Gloss',
      Chrome: 'Chrome',
      Carbon: 'Carbon',
      Flip: 'Flip',
      Matte_Metallic: 'Matte_Metallic',
    };
    return map[finishKey] || String(finishKey || '').replace(/_/g, ' ');
  };

  const getColorNameByCode = (brand, finishKey, colorCode) => {
    const list = brand?.colors?.[finishKey] || [];
    const found = list.find((c) => c.colorCode === colorCode);
    return found?.name || 'Unknown Color';
  };

  const generateImage = async (year, make, model, finish, color, anglesToSend) => {
    try {
      setAnimation(true);
      const requiredCredits = Math.max(1, (anglesToSend?.length || 1));
      if (credits < requiredCredits) {
        setAnimation(false);
        setShowNoCreditsPopup(true);
        return;
      }

      let sanitizedAngles = Array.from(new Set(anglesToSend && anglesToSend.length ? anglesToSend : ['default']));
      if (sanitizedAngles.length > 4) sanitizedAngles = sanitizedAngles.slice(0, 4);
      const primaryPromptType = sanitizedAngles[0] || 'default';

      const response = await dispatch(
        generateCarImageAPIFn({
          year,
          make,
          model,
          finish: formatFinishLabel(finish),
          finishType: formatFinishLabel(finish),
          color,
          description: '',
          wrap: `${formatFinishLabel(finish)} ${getColorNameByCode(selectedBrand, finish, color)}`,
          promptType: primaryPromptType,
          angles: sanitizedAngles,
        })
      );

      const raw = response?.payload?.data;
      let items = [];
      if (Array.isArray(raw)) items = raw;
      else if (Array.isArray(raw?.image)) items = raw.image.map((img) => ({ image: img }));
      else if (raw?.image) items = [raw];

      const imageUrls = items
        .map((it) => {
          const bytes = it?.image?.imageBytes;
          const mime = it?.image?.mimeType || 'image/png';
          return bytes ? `data:${mime};base64,${bytes}` : null;
        })
        .filter(Boolean);

      if (response?.meta?.requestStatus === 'fulfilled' && imageUrls.length > 0) {
        await fetchUserInfo();
        setGeneratedImages(imageUrls);
        setShowTooManyRequestsPopup(false);
        setAnimation(false);
        return imageUrls;
      } else {
        setAnimation(false);
        setShowTooManyRequestsPopup(true);
        return [];
      }
    } catch (error) {
      setAnimation(false);
      console.error(error);
      throw error;
    }
  };

  const toggleAngle = (value) => {
    setSelectedAngles((prev) => {
      if (prev.includes(value)) {
        const next = prev.filter((v) => v !== value);
        return next.length ? next : ['default'];
      }
      if (prev.length >= 4) {
        setShowTooManyAnglesPopup(true);
        return prev;
      }
      return [...prev, value];
    });
  };

  const onBrandChange = (brandName) => {
    const brand = brands.find((b) => b.name === brandName) || null;
    setSelectedBrand(brand);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedFinish(category);
  };



  

  return (
    <>
      {animation && (
        <div className="absolute top-0 left-0 w-full bg-[#000000d2] flex justify-center h-screen items-center z-50">
          <img src={loaderGif} alt="Loading..." className="w-36" />
        </div>
      )}

      {showNoCreditsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000d8] backdrop-blur-sm ">
          <div className="bg-[#0b0f1a] text-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🚀</span>
              <h2 className="text-lg font-semibold">You've Used All Your Free Credits</h2>
            </div>
            <p className="text-sm text-gray-300 mb-4">Start generating wraps, sending quotes, and managing customers with Car Wrap Visualizer</p>
            <p className="text-sm font-semibold text-white mb-2">Plans start at just <span className="text-yellow-400">$79/month</span></p>
            <div className="flex items-start space-x-2 mb-2">
              <span className="text-yellow-400 text-xl">➕</span>
              <p className="text-sm text-gray-300">Add CRM for $49.99/month — automate follow-ups, marketing & warranty tracking</p>
            </div>
            <div className="flex items-start space-x-2 mb-6">
              <span className="text-yellow-300 text-xl">💡</span>
              <p className="text-sm text-gray-300">Show real wraps, close more jobs, and scale your shop — all in one platform.</p>
            </div>
            <Link to="/Subscription" className="w-full py-3 block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200">Join Car Wrap Visualizer™</Link>
            <button onClick={() => setShowNoCreditsPopup(false)} className="mt-4 w-full text-sm text-gray-400 hover:text-gray-200 transition">Maybe later</button>
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
            <p className="text-sm text-gray-300 mb-4">We’ve received too many requests from your account. This usually means the system is busy or you’ve just generated an image recently.</p>
            <p className="text-sm font-semibold text-white mb-4">Please wait a few seconds and try again.</p>
            <button onClick={() => setShowTooManyRequestsPopup(false)} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200">Okay, Got It</button>
            <button onClick={() => setShowTooManyRequestsPopup(false)} className="mt-4 w-full text-sm text-gray-400 hover:text-gray-200 transition">Close</button>
          </div>
        </div>
      )}

      {showTooManyAnglesPopup && (
        <PopupModal title="Angle Limit" message="For best speed and reliability, select up to 4 angles per request." onClose={() => setShowTooManyAnglesPopup(false)} icon="🖼️" />
      )}

      <div className="w-full bg-[#12161F] text-white px-6 py-3 rounded shadow-md mb-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold">Available Credits: <span>{credits}</span></h2>
          <Link to="/Subscription" className="mt-2 sm:mt-0 text-sm font-semibold bg-[#ED217B] hover:bg-[#ED217B] text-white px-4 py-3 rounded-md transition">Buy More Credits</Link>
        </div>
      </div>

      <div className={`flex max-w-7xl mx-auto ${bg ? 'text-white' : 'text-black'} flex-col h-full`}>
        {/* Preview */}
        <div className="flex flex-col justify-center items-center relative" ref={fullscreenRef}>
          <div className="w-full sm:w-fit relative">
            {generatedImages && generatedImages.length > 0 ? (
              <InstagramCarousel images={generatedImages} aspect="square" />
            ) : (
              <div className="w-full bg-cover bg-center">
                <img src={colorfullcar} alt="Car" className={`mx-auto w-full 'max-w-4xl'`} />
              </div>
            )}
            {/* Fullscreen toggle button bottom-right */}
            {generatedImages && generatedImages.length > 0 && !isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="absolute bottom-4 right-4 bg-black/60 text-white p-3 rounded-full shadow-lg hover:bg-black/80"
              >
                <FaExpand size={18} />
              </button>
            )}
          </div>


          {/* Exit fullscreen button top-right */}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-full shadow-lg hover:bg-black/80 z-50"
            >
              <FaCompress size={18} />
            </button>
          )}
        </div>

        {/* Vehicle selectors */}
        <div className="sm:p-6 p-3">
          <div className="space-y-6">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-2xl font-bold mb-4">Select Vehicle</h1>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
                <label className="flex flex-col gap-2 text-black">
                  <span>Year</span>
                  <YearSelector onSelect={(year) => { setSelectedYear(year); setSelectedMake(''); }} />
                </label>
                <label className="flex flex-col gap-2 text-black">
                  <span>Make</span>
                  <MakeSelector selectedYear={selectedYear} onSelect={setSelectedMake} />
                </label>
                <label className="flex flex-col gap-2 text-black">
                  <span>Model</span>
                  <ModelSelector selectedYear={selectedYear} selectedMake={selectedMake} onSelect={setSelectedModel} />
                </label>
              </div>
            </div>

            {/* Select Wrap Angle */}
            <div className={`mx-auto max-w-4xl ${bg ? 'text-white' : 'text-black'} py-6`}>
              <div className="bg-[#2B2C2C] p-4 rounded-xl">
                <h4 className="text-xl mb-4 text-white font-semibold text-center">Select Wrap Angle</h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                  {angles.map((a) => {
                    const active = selectedAngles.includes(a.value);
                    return (
                      <button
                        key={a.value}
                        onClick={() => toggleAngle(a.value)}
                        className={`relative rounded-lg cursor-pointer border transition select-none text-xs sm:text-sm px-2 py-2 sm:py-3 text-center leading-tight 
                          ${active ? 'bg-black border-white text-white' : 'bg-[#ffffff0d] border-[#3d3d3d] text-white hover:border-white/60'}`}
                        aria-pressed={active}
                      >
                        {a.label}
                        {active && (
                          <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-gray-300 text-center">{selectedAngles.length}/4 angles selected · More angles = slower response</p>
              </div>
            </div>

            {/* Brand + Finish under Model */}
            <div className="mx-auto max-w-4xl w-full">
              <div className="bg-[#2B2C2C] p-4 rounded-xl text-white">
                <h4 className="text-xl mb-4 font-semibold text-center">Select Brand & Finish</h4>

                {/* Brand picker: native select on mobile, pills on desktop */}
                <div className="flex flex-col  sm:items-center sm:justify-between gap-3">
                  <div className="w-full">
                    {isMobile ? (
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-200">Brand</label>
                        <select
                          className="w-full bg-black text-white rounded-lg border border-[#3d3d3d] px-3 py-2 focus:outline-none"
                          value={selectedBrand?.name || ''}
                          onChange={(e) => onBrandChange(e.target.value)}
                        >
                          <option value="" disabled>Choose a brand…</option>
                          {brands.map((b) => (
                            <option key={b.name} value={b.name}>{b.name}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="flex flex-wrap justify-center gap-2">
                        {brands.map((b) => (
                          <button
                            key={b.name}
                            onClick={() => onBrandChange(b.name)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition 
                              ${selectedBrand?.name === b.name ? 'bg-black border-white' : 'bg-[#ffffff0d] border-[#3d3d3d] hover:border-white/60'}`}
                          >
                            <img src={b.logo} alt={b.name} className="h-5 w-auto" />
                            <span>{b.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Finish categories (appear after brand) */}
                  <div className="w-full">
                    {selectedBrand ? (
                      <div className="flex flex-col  gap-2">
                        <label className="text-base font-semibold sm:text-center text-gray-200">Finish</label>
                        <div className="flex overflow-x-auto md:justify-center hide-scrollbar gap-2 py-1">
                          {Object.keys(selectedBrand.colors).map((cat) => (
                            <button
                              key={cat}
                              className={`whitespace-nowrap px-3 py-2 rounded-lg border text-xs sm:text-sm 
                                ${selectedCategory === cat ? 'bg-black border-white' : 'bg-[#ffffff0d] border-[#3d3d3d] hover:border-white/60'}`}
                              onClick={() => handleCategoryClick(cat)}
                            >
                              {cat.replace(/_/g, ' ')}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-300">Select a brand to choose finishes</p>
                    )}
                  </div>
                </div>

                {/* Colors list */}
                {selectedBrand && selectedCategory && (
                  <div className="mt-4 border-t border-[#3d3d3d] pt-4 h-[460px] rounded overflow-y-auto hide-scrollbar">
                    <div className="grid grid-cols-1">
                      {selectedBrand.colors[selectedCategory].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border border-[#353535] text-white bg-black shadow-sm cursor-pointer hover:shadow-md transition"
                          onClick={async () => {
                            if (!selectedYear || !selectedMake || !selectedModel) {
                              setShowIncompleteSelectionPopup(true);
                              return;
                            }
                            try {
                              setSelectedFinish(selectedCategory);
                              setSelectedColor(item.colorCode);
                              const imgs = await generateImage(
                                selectedYear,
                                selectedMake,
                                selectedModel,
                                selectedCategory,
                                item.colorCode,
                                selectedAngles
                              );
                              setGeneratedImages(imgs || []);
                              setTimeout(() => imageRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                            } catch (err) {
                              console.error(err.message);
                            }
                          }}
                        >
                          <div className="p-4">
                            <div className="w-10 h-10 rounded-2xl border border-gray-400" style={{ backgroundColor: item.colorCode }} />
                          </div>
                          <p className="grow p-4 border-x border-[#353535] text-md font-medium">{item.name}</p>
                          <span className="text-sm p-4">{selectedCategory.replace(/_/g, ' ')} </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showIncompleteSelectionPopup && (
        <PopupModal title="Select All Vehicle Details" message="Please select Year, Make, and Model before choosing a wrap color." onClose={() => setShowIncompleteSelectionPopup(false)} icon="⚠️" />
      )}
    </>
  );
};

export default CarFillPage;
