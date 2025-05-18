import React, { useState } from 'react';
import YearSelector from './Components/YearSelector';
import MakeSelector from './Components/MakeSelector';
import ModelSelector from './Components/ModelSelector';
import garage from '../../assets/images/garage.png'
import colorfullcar from '../../assets/images/colorful-car.png'
const CarFillPage = () => {

    const wrapFilmColors = {
        'Gloss': [
            { name: "Gloss Black (G12)", colorCode: "#000000" },
            { name: "Gloss White (G10)", colorCode: "#FFFFFF" },
            { name: "Gloss Hot Rod Red (G13)", colorCode: "#C8102E" },
            { name: "Gloss Burnt Orange (G14)", colorCode: "#BF5700" },
            { name: "Gloss Bright Yellow (G15)", colorCode: "#FFD100" },
            { name: "Gloss Sunflower (G25)", colorCode: "#FFC72C" },
            { name: "Gloss Kelly Green (G46)", colorCode: "#00843D" },
            { name: "Gloss Intense Blue (G47)", colorCode: "#005EB8" },
            { name: "Gloss Sky Blue (G77)", colorCode: "#00B2A9" },
            { name: "Gloss Light Ivory (G79)", colorCode: "#F6E6C3" },
            { name: "Gloss Dark Red (G83)", colorCode: "#8B0000" },
            { name: "Gloss Hot Pink (G103)", colorCode: "#FF69B4" },
            { name: "Gloss White Aluminum (G120)", colorCode: "#D6D6D6" },
            { name: "Gloss Boat Blue (G127)", colorCode: "#0033A0" },
            { name: "Gloss Anthracite (G201)", colorCode: "#383838" },
            { name: "Gloss Red Metallic (G203)", colorCode: "#B22222" },
            { name: "Gloss Charcoal Metallic (G211)", colorCode: "#36454F" },
            { name: "Gloss Black Metallic (G212)", colorCode: "#1C1C1C" },
            { name: "Gloss Deep Blue Metallic (G217)", colorCode: "#003366" },
            { name: "Gloss Blue Metallic (G227)", colorCode: "#1F75FE" },
            { name: "Gloss Gold Metallic (G241)", colorCode: "#D4AF37" },
            { name: "Gloss Lemon Sting (G335)", colorCode: "#FFF700" },
            { name: "Gloss Green Envy (G336)", colorCode: "#00FF00" },
            { name: "Gloss Blue Fire (G337)", colorCode: "#007FFF" },
            { name: "Gloss Liquid Copper (G344)", colorCode: "#B87333" },
            { name: "Gloss Fierce Fuchsia (G348)", colorCode: "#C154C1" }

        ],
        'Satin': [
            { name: "Satin Black (S12)", colorCode: "#1C1C1C" },
            { name: "Satin White (S10)", colorCode: "#D3D3D3" },
            { name: "Satin Battleship Gray (S51)", colorCode: "#7A7A7A" },
            { name: "Satin Key West (S57)", colorCode: "#00D6B4" },
            { name: "Satin Apple Green (S196)", colorCode: "#8DB600" },
            { name: "Satin Pearl White (SP10)", colorCode: "#D8D8D8" },
            { name: "Satin Frozen Vanilla (SP240)", colorCode: "#F5E9B8" },
            { name: "Satin Flip Psychedelic (SP281)", colorCode: "#6B3F99" },
            { name: "Satin Smoldering Red (S363)", colorCode: "#9E1B32" }
        ],
        'Matte': [
            { name: "Matte Black (M12)", colorCode: "#212121" },
            { name: "Matte White (M10)", colorCode: "#D3D3D3" },
            { name: "Matte Red (M13)", colorCode: "#9B1B30" },
            { name: "Matte Yellow (M15)", colorCode: "#F4D03F" },
            { name: "Matte Military Green (M26)", colorCode: "#4B5320" },
            { name: "Matte Indigo (M27)", colorCode: "#3D4F8A" },
            { name: "Matte Riviera Blue (M67)", colorCode: "#3C6B8B" },
            { name: "Matte Dark Gray (M261)", colorCode: "#585858" },
            { name: "Matte Charcoal Metallic (M211)", colorCode: "#333333" }
        ],
        'Flip': [
            { name: "Gloss Flip Psychedelic (FPE)", colorCode: "#6B3F99" },
            { name: "Gloss Flip Ghost Pearl (FPG)", colorCode: "#D1B2FF" },
            { name: "Gloss Flip Electric Wave (FPEW)", colorCode: "#00B2FF" },
        ],
        'Brushed': [
            { name: "Brushed Steel (BRF)", colorCode: "#B0B0B0" },
            { name: "Brushed Aluminum (BRM)", colorCode: "#A8A8A8" }
        ],
        'Carbon Fiber': [
            { name: "Carbon Fiber Black (CF12)", colorCode: "#1C1C1C" },
            { name: "Carbon Fiber Charcoal (CF21)", colorCode: "#333333" }
        ]
    };


    const [selectedFinish, setSelectedFinish] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');

    const generateImage = async (year, make, model, finish, color) => {
        const response = await fetch('http://localhost/carApi/generateCarImage.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                year,
                make,
                model,
                finish,
                color,
                description: '' // Optional: you can pass description if needed
            })
        });
        const data = await response.json();
        if (data.status === 'success') {
            return 'data:image/png;base64,' + data.imageBase64;
        } else {
            throw new Error(data.message || 'Error generating image');
        }
    };


    const handleConfirmSelection = async () => {
        try {
            const img = await generateImage(selectedYear, selectedMake, selectedModel, selectedFinish, selectedColor);
            setGeneratedImage(img);
        } catch (err) {
            alert(err.message);
        }
    };
    const handleFinishChange = (e) => {
        const finish = e.target.value;
        setSelectedFinish(finish);
        setSelectedColor(''); // reset color on finish change
    };


    const colorOptions = selectedFinish ? wrapFilmColors[selectedFinish] : [];

    return (
        <div className="flex max-w-7xl mx-auto  flex-col md:flex-row h-full ">
            {/* Left Side Image */}
            <div className="md:w-1/2 flex flex-col justify-center items-center p-4">
                <div className="">
                    {generatedImage ? (
                        <img src={generatedImage} alt="Generated Car" className="w-full" />
                    ) : (
                        <div className="w-full bg-cover bg-center" style={{ backgroundImage: `url('${garage}')` }}>
                            <span className="block text-lg font-bold text-white bg-[#090A1E] bg-opacity-50 p-2 m-4">
                                INTRODUCING THE WORLD'S FIRST WRAP VISUALIZER
                            </span>
                            <img src={colorfullcar} alt="Car" className="mx-auto w-[500px] max-w-full" />
                        </div>
                    )}
                </div>
            </div>
            {/* Right Side Options */}
            <div className="md:w-1/2 p-6">
                <h1 className="text-3xl font-bold mb-4">WRAP VISUALIZER</h1>
                <p className="mb-6 text-gray-100">
                    See your wrap before you commit. Try different colors, finishes, and graphics with our Wrap Visualizer—it’s all about bringing your vision to life.
                </p>


                <div className="space-y-4">
                    {/* Year Selector */}
                    <div className='grid grid-cols-3 gap-3'>

                        <label className="block">
                            Year:
                            <YearSelector onSelect={(year) => {
                                setSelectedYear(year);
                                setSelectedMake(''); // Reset make on year change
                            }} />
                        </label>


                        {/* Make Selector */}
                        <label className="block">
                            Make:
                            <MakeSelector selectedYear={selectedYear} onSelect={setSelectedMake} />
                        </label>

                        {/* Model Selector */}
                        <label className="block">
                            Model:
                            <ModelSelector selectedYear={selectedYear} selectedMake={selectedMake} onSelect={setSelectedModel} />
                        </label>
                    </div>

                    {/* Surface Finish */}
                    <label className="block mb-4">
                        Choose Surface Finish:
                        <select className="w-full border p-2 mt-1" value={selectedFinish} onChange={handleFinishChange}>
                            <option className='bg-[#090A1E]' value="">Select Finish</option>
                            {Object.keys(wrapFilmColors).map((finish) => (
                                <option className='bg-[#090A1E]' key={finish} value={finish}>{finish}</option>
                            ))}
                        </select>
                    </label>


                    {/* Color Selector */}
                    <label className="block mb-4">
                        Choose a Color:
                        <select
                            className="w-full border p-2 mt-1"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            disabled={!selectedFinish}
                        >
                            <option className='bg-[#090A1E]' value="">Select Color</option>
                            {colorOptions.map((color) => (
                                <option className='bg-[#090A1E]' key={color.colorCode} value={color.colorCode}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Color Preview */}
                    {selectedColor && (
                        <div className="mt-4">
                            <p>Selected Color Preview:</p>
                            <div className="w-16 h-16 border mt-2" style={{ backgroundColor: selectedColor }}></div>
                        </div>
                    )}
                    <button
                        className="mt-4 bg-transparent border cursor-pointer hover:bg-pink-500 hover:text-white border-pink-400 text-pink-500 w-full px-4 py-2 rounded transition hover:scale-105"
                        onClick={handleConfirmSelection}
                    >
                        Confirm Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarFillPage;
