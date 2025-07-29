import React, { useState, useRef, useContext, useEffect } from 'react';
import YearSelector from './Components/YearSelector';
import MakeSelector from './Components/MakeSelector';
import ModelSelector from './Components/ModelSelector';
import colorfullcar from '../../assets/images/carshowRoom.png';
import logo3m from '../../assets/images/3m.png';
import vector from '../../assets/images/vector.png';
import teckwrap from '../../assets/images/Teckwrap.png';
import { AuthContext } from '../../context/AuthContext';
// import loaderGif from "../../assets/loading.gif";
import loaderGif from '../../assets/loading.gif';
import { useDispatch } from 'react-redux';
import { generateCarImageAPIFn } from '../../redux/features/Studio/studioFus';
import { Link } from 'react-router-dom';
const CarFillPage = ({ bg }) => {
  // console.log(bg)
  const dispatch = useDispatch();
  const brand3MHex = {
    Gloss: [
      { name: 'Red Metallic (G203)', colorCode: '#8C1A1F' },
      { name: 'Dragon Fire Red (G363)', colorCode: '#CA2726' },
      { name: 'Dark Red (G83)', colorCode: '#CD2027' },
      { name: 'Flame Red (G53)', colorCode: '#CD191D' },
      { name: 'Hot Rod Red (G13)', colorCode: '#DA3526' },
      { name: 'Fiery Orange (G364)', colorCode: '#CA5934' },
      { name: 'Liquid Copper (G344)', colorCode: '#ED4726' },
      { name: 'Burnt Orange (G14)', colorCode: '#F47922' },
      { name: 'Deep Orange (G24)', colorCode: '#F47D20' },
      { name: 'Bright Orange (G54)', colorCode: '#F28420' },
      { name: 'Sunflower (G25)', colorCode: '#EDAC1E' },
      { name: 'Bright Yellow (G15)', colorCode: '#FEC70B' },
      { name: 'Lucid Yellow (G55)', colorCode: '#FFF22A' },
      { name: 'Green Envy (G336)', colorCode: '#07663F' },
      { name: 'Kelly Green (G46)', colorCode: '#129246' },
      { name: 'Light Green (G16)', colorCode: '#75BF4F' },
      { name: 'Atomic Teal (G356)', colorCode: '#079892' },
      { name: 'Midnight Blue (GP272)', colorCode: '#070808' },
      { name: 'Boat Blue (G127)', colorCode: '#0D1625' },
      { name: 'Deep Metallic Blue (G217)', colorCode: '#203167' },
      { name: 'Blue Metallic (G227)', colorCode: '#233269' },
      { name: 'Blue Raspberry (G378)', colorCode: '#2A2977' },
      { name: 'Cosmic Blue (G377)', colorCode: '#0C51A1' },
      { name: 'Intense Blue (G47)', colorCode: '#0B54A0' },
      { name: 'Blue Fire (G337)', colorCode: '#036494' },
      { name: 'Sky Blue (G77)', colorCode: '#52C6EA' },
      { name: 'Fierce Fuchsia (G348)', colorCode: '#C31E64' },
      { name: 'Hot Pink (G103)', colorCode: '#E3477D' },
      { name: 'Black Rose (GP99)', colorCode: '#3A1B1D' },
      { name: 'Plum Explosion (GP258)', colorCode: '#422671' },
      { name: 'Ember Black (GP282)', colorCode: '#1F0803' },
      { name: 'White Aluminum (G120)', colorCode: '#A5A4A3' },
      { name: 'Sterling Silver (G251)', colorCode: '#969696' },
      { name: 'Storm Grey (G31)', colorCode: '#A5A3A0' },
      { name: 'White (G10)', colorCode: '#FFFFFF' },
      { name: 'Light Ivory (G79)', colorCode: '#FAE2AE' },
      { name: 'Galaxy Black (GP292)', colorCode: '#12240C' },
      { name: 'Black Metallic (G212)', colorCode: '#080A09' },
      { name: 'Black (G12)', colorCode: '#050504' },
      { name: 'Anthracite (G201)', colorCode: '#454645' },
      { name: 'Charcoal Metallic (G211)', colorCode: '#444344' }
    ],
    Satin: [
      { name: 'Vampire Red (SP273)', colorCode: '#6A090F' },
      { name: 'Smoldering Red (S363)', colorCode: '#961A1E' },
      { name: 'Bitter Yellow (S335)', colorCode: '#C49B2A' },
      { name: 'Apple Green (S196)', colorCode: '#489C44' },
      { name: 'Key West (S57)', colorCode: '#69C8C9' },
      { name: 'Ocean Shimmer (S327)', colorCode: '#00789D' },
      { name: 'Perfect Blue (S347)', colorCode: '#0273AC' },
      { name: 'Thundercloud (S271)', colorCode: '#2B343E' },
      { name: 'Dark Grey (S261)', colorCode: '#3F3E41' },
      { name: 'Black (S12)', colorCode: '#1A1617' },
      { name: 'Battleship Gray (S51)', colorCode: '#758183' },
      { name: 'White Aluminum (S120)', colorCode: '#C4C2C0' },
      { name: 'Frozen Vanilla (SP240)', colorCode: '#E4E8E0' },
      { name: 'White (S10)', colorCode: '#F9FAF9' },
      { name: 'Pearl White (SP10)', colorCode: '#F0E9D5' }
    ],
    Matte: [
      { name: 'Red Metallic (M203)', colorCode: '#851D21' },
      { name: 'Red (M13)', colorCode: '#EE3E34' },
      { name: 'Pine Green Metallic (M206)', colorCode: '#294C33' },
      { name: 'Military Green (M26)', colorCode: '#3E441B' },
      { name: 'Indigo (M27)', colorCode: '#1A2834' },
      { name: 'Slate Blue Metallic (M217)', colorCode: '#152B4A' },
      { name: 'Blue Metallic (M227)', colorCode: '#3A6BB3' },
      { name: 'Black (M12)', colorCode: '#050504' },
      { name: 'Black Metallic (M212)', colorCode: '#212222' },
      { name: 'Deep Black (M22)', colorCode: '#222323' },
      { name: 'Dead Matte Black (DM12)', colorCode: '#38393B' },
      { name: 'Dark Grey (M261)', colorCode: '#3F403F' },
      { name: 'Grey Aluminum (M230)', colorCode: '#858484' },
      { name: 'Silver (M12)', colorCode: '#939598' },
      { name: 'White (M10)', colorCode: '#F9FAFA' },
      { name: 'Charcoal Metallic (M211)', colorCode: '#4C4738' },
      { name: 'Brown Metallic', colorCode: '#664F37' }
    ],
    Chrome: [
      { name: 'Gloss Silver Chrome (GC451)', colorCode: '#C0C0C0' }
    ],
    Textures: [
      { name: 'Shadow Military Green (SB26)', colorCode: '' },
      { name: 'Shadow Black (SB12)', colorCode: '' },
      { name: 'Brushed Black Metallic (BR212)', colorCode: '' },
      { name: 'Matrix Black (MX12)', colorCode: '' },
      { name: 'Carbon Fibre Black (CFS12)', colorCode: '' },
      { name: 'Brushed Steel (BR201)', colorCode: '' },
      { name: 'Brushed Titanium (BR230)', colorCode: '' },
      { name: 'Brushed Aluminum (BR120)', colorCode: '' },
      { name: 'Carbon Fiber Anthracite (CFS201)', colorCode: '' }
    ]
  };

  const brandAvery = {
    Gloss: [
      { name: 'Black (SW900-190-O)', colorCode: '#101115' },
      { name: 'Obsidian Black (SW900-191-O)', colorCode: '#000000' },
      { name: 'Dark Grey (SW900-865-O)', colorCode: '#686868' },
      { name: 'Rock Grey (SW900-821-O)', colorCode: '#909090' },
      { name: 'Grey (SW900-832-O)', colorCode: '#E8E7E3' },
      { name: 'Misty Grey (SW900-8221-O)', colorCode: '#EAEAEA' },
      { name: 'Red (SW900-415-O)', colorCode: '#FE0500' },
      { name: 'Soft Red (SW900-427-O)', colorCode: '#FD2627' },
      { name: 'Cardinal Red (SW900-433-O)', colorCode: '#FE0100' },
      { name: 'Carmine Red (SW900-436-O)', colorCode: '#FE0100' },
      { name: 'Burgundy (SW900-475-O)', colorCode: '#AC0006' },
      { name: 'Indigo Blue (SW900-699-O)', colorCode: '#011D4A' },
      { name: 'Dark Blue (SW900-681-O)', colorCode: '#012EAB' },
      { name: 'Blue (SW900-677-O)', colorCode: '#0090FB' },
      { name: 'Intense Blue (SW900-667-O)', colorCode: '#0093FA' },
      { name: 'Light Blue (SW900-632-O)', colorCode: '#04CBFD' },
      { name: 'Aqua Blue (SW900-636-O)', colorCode: '#00B6CC' },
      { name: 'Sea Breeze Blue (SW900-648-O)', colorCode: '#BCF3F8' },
      { name: 'Smoky Blue (SW900-612-O)', colorCode: '#BAD1E3' },
      { name: 'Cloudy Blue (SW900-656-O)', colorCode: '#E5ECF7' },
      { name: 'Light Pistachio (SW900-728-O)', colorCode: '#E6F0D5' },
      { name: 'Emerald Green (SW900-771-O)', colorCode: '#1FB792' },
      { name: 'Dark Green (SW900-792-O)', colorCode: '#005417' },
      { name: 'Grass Green (SW900-758-O)', colorCode: '#6ADF42' },
      { name: 'Tropical Vacation Green (SW900-701-O)', colorCode: '#74C900' },
      { name: 'Lime Green (SW900-731-O)', colorCode: '#ECFA36' },
      { name: 'Orange (SW900-373-O)', colorCode: '#FE6000' },
      { name: 'Dark Yellow (SW900-249-O)', colorCode: '#FFDF00' },
      { name: 'Yellow (SW900-235-O)', colorCode: '#FEF100' },
      { name: 'Ambulance Yellow (SW900-236-O)', colorCode: '#FEFE82' },
      { name: 'Pool Party Pink (SW900-517-O)', colorCode: '#D4013A' },
      { name: 'White (SW900-101-O)', colorCode: '#F6F6F6' }
    ],
    Gloss_Metallic: [
      { name: 'Black (SW900-192-M)', colorCode: '#141213' },
      { name: 'Grey (SW900-807-M)', colorCode: '#515151' },
      { name: 'Eclipse (SW900-199-M)', colorCode: '#564B35' },
      { name: 'Silver (SW900-803-M)', colorCode: '#959595' },
      { name: 'Quick Silver (SW900-816-M)', colorCode: '#BCBEC9' },
      { name: 'Spark (SW900-419-M)', colorCode: '#C11B23' },
      { name: 'Popstar Concert Purple (SW900-521-M)', colorCode: '#690645' },
      { name: 'Mysterious Indigo (SW900-700-M)', colorCode: '#3A237B' },
      { name: 'Magnetic Burst (SW900-679-M)', colorCode: '#151D65' },
      { name: 'Mystery Black (SW900-184-M)', colorCode: '#0D2E4A' },
      { name: 'Dark Blue (SW900-653-M)', colorCode: '#0C153A' },
      { name: 'Radioactive (SW900-762-M)', colorCode: '#016736' },
      { name: 'Gold (SW900-215-M)', colorCode: '#B8953E' },
      { name: 'Sand Sparkle (SW900-255-M)', colorCode: '#936E56' },
      { name: 'Brown (SW900-929-M)', colorCode: '#886E61' }
    ],
    Matte: [
      { name: 'Black (SW900-180-O)', colorCode: '#141414' },
      { name: 'Dark Grey (SW900-856-O)', colorCode: '#76757A' },
      { name: 'Olive Green (SW900-732-O)', colorCode: '#4D5140' },
      { name: 'Khaki Green (SW900-711-O)', colorCode: '#828476' },
      { name: 'Orange (SW900-321-O)', colorCode: '#FB7100' },
      { name: 'White (SW900-102-O)', colorCode: '#FAF9F7' }
    ],
    Matte_Metallic: [
      { name: 'Gunmetal (SW900-840-M)', colorCode: '#61605C' },
      { name: 'Charcoal (SW900-845-M)', colorCode: '#504F4D' },
      { name: 'Anthracite (SW900-858-M)', colorCode: '#676E71' },
      { name: 'Silver (SW900-857-M)', colorCode: '#C9C9C9' },
      { name: 'Garnet Red (SW900-472-M)', colorCode: '#702320' },
      { name: 'Cherry Matte Metallic (SW900-444-M)', colorCode: '#74001A' },
      { name: 'Purple (SW900-565-M)', colorCode: '#46406E' },
      { name: 'Night Blue (SW900-623-M)', colorCode: '#18233D' },
      { name: 'Brilliant Blue (SW900-671-M)', colorCode: '#29366D' },
      { name: 'Blue (SW900-615-M)', colorCode: '#184066' },
      { name: 'Frosty Blue (SW900-643-M)', colorCode: '#82A9B8' },
      { name: 'Moss Green (SW900-737-M)', colorCode: '#3E422A' },
      { name: 'Apple Green (SW900-745-M)', colorCode: '#659741' },
      { name: 'Pink (SW900-520-M)', colorCode: '#98364D' }
    ],
    Pearl: [
      { name: 'Satin White Pearl (SW900-117-S)', colorCode: '#D1CDC6' },
      { name: 'Pearl Light Green (SW900-777-S)', colorCode: '#8DC760' },
      { name: 'Pearl Dark Green (SW900-796-S)', colorCode: '#027B77' },
      { name: 'Gold Orange Pearlescent (SW900-326-S)', colorCode: '#EE963F' },
      { name: 'Gloss White Pearl (SW900-109-S)', colorCode: '#F9F9F9' }
    ],
    Chrome: [
      { name: 'Black (SF100-196-S)', colorCode: '' },
      { name: 'Silver (SF100-843-S)', colorCode: '' },
      { name: 'Red (SF100-474-S)', colorCode: '' },
      { name: 'Blue (SF100-256-S)', colorCode: '' },
      { name: 'Gold (SF100-604-S)', colorCode: '' },
      { name: 'Rose Gold (SF100-211-S)', colorCode: '' }
    ],
    Satin: [
      { name: 'Black (SW900-197-O)', colorCode: '#0B0B0B' },
      { name: 'Grey (SW900-833-O)', colorCode: '#696B6A' },
      { name: 'Carmine Red (SW900-438-O)', colorCode: '#98090F' },
      { name: 'Dark Blue (SW900-682-O)', colorCode: '#01338F' },
      { name: 'Light Blue (SW900-633-O)', colorCode: '#0098D2' },
      { name: 'Jade (SW900-7295-0)', colorCode: '#BCCDC2' },
      { name: 'Khaki Green (SW900-712-O)', colorCode: '#616358' },
      { name: 'Yellow (SW900-224-O)', colorCode: '#EFBE00' },
      { name: 'Bubblegum Pink (SW900-514-O)', colorCode: '#D5739E' },
      { name: 'White (SW900-116-O)', colorCode: '#E8E8E6' }
    ],
    Satin_Metallic: [
      { name: 'Black Rock Grey (SW900-823-M)', colorCode: '#373634' },
      { name: 'Dark Grey (SW900-854-M)', colorCode: '#3B393C' },
      { name: 'Dark Basalt (SW900-871-M)', colorCode: '#504941' },
      { name: 'Silver (SW900-805-M)', colorCode: '#7B7B7B' },
      { name: 'Purple (SW900-566-M)', colorCode: '#3D2C32' },
      { name: 'Safari Gold (SW900-260-M)', colorCode: '#86670B' },
      { name: 'Flamingo Dance (SW900-5080-M)', colorCode: '#E8E3EA' }
    ]
  };

  const brandTeckwrapHex = {
    Chrome: [
      { name: 'Ice Silver', sku: 'CSC01', colorCode: '#696973' },
      { name: 'Graphite Grey', sku: 'CSC03', colorCode: '#353537' },
      { name: 'Shadow Red', sku: 'CSC04', colorCode: '#6A0E09' },
      { name: 'Dark Purple', sku: 'CSC05', colorCode: '#511C4A' },
      { name: 'Shadow Blue', sku: 'CSC06', colorCode: '#064166' },
      { name: 'Dark Green', sku: 'CSC07', colorCode: '#02490F' },
      { name: 'Copper Brown', sku: 'CSC08', colorCode: '#C84603' },
      { name: 'Super Silver (Mirror)', sku: 'CMC01', colorCode: '#D2D2D2' }
    ],
    Gloss: [
      { name: 'Deep Blue', sku: 'RB02-HD', colorCode: '#012475' },
      { name: 'Passionate Purple', sku: 'RB04-HD', colorCode: '#9D226F' },
      { name: 'Acid Lime', sku: 'RB07-HD', colorCode: '#B3C100' },
      { name: 'Coral Peach', sku: 'RB08-HD', colorCode: '#F85F55' },
      { name: 'Caribbean Blue', sku: 'RB09-HD', colorCode: '#49C4ED' },
      { name: 'Dark Platinum', sku: 'RB12-HD', colorCode: '#35353D' },
      { name: 'Ash Grey', sku: 'RB13-HD', colorCode: '#514545' },
      { name: 'Sea Turquoise', sku: 'RB16-HD', colorCode: '#05ACCD' },
      { name: 'Ocean Green', sku: 'RB18-HD', colorCode: '#0F7E53' },
      { name: 'Deep Orange', sku: 'RB19-HD', colorCode: '#FB6720' },
      { name: 'Midnight Purple', sku: 'RB20-HD', colorCode: '#421FB1' },
      { name: 'Kelly Green', sku: 'RB22-HD', colorCode: '#89D76C' },
      { name: 'Golden Yellow', sku: 'RB25-HD', colorCode: '#FF9503' },
      { name: 'Ruby Green', sku: 'RB26-HD', colorCode: '#015F20' },
      { name: 'Arctic Silver', sku: 'RB27-HD', colorCode: '#949BA1' },
      { name: 'Vibrant Nickel', sku: 'RB28-HD', colorCode: '#504E4F' },
      { name: 'Grau Pearl', sku: 'RB30-HD', colorCode: '#728493' },
      { name: 'Silver Fern', sku: 'RB31-HD', colorCode: '#B5B1A5' },
      { name: 'Deep Onix', sku: 'RB32-HD', colorCode: '#929680' },
      { name: 'Dolomite Silver', sku: 'RB33-HD', colorCode: '#C5C3C6' },
      { name: 'Wilderness Green', sku: 'RB35-HD', colorCode: '#807B64' },
      { name: 'Palladian Blue', sku: 'RB36-HD', colorCode: '#8C9894' },
      { name: 'Phantom Green', sku: 'RB37-HD', colorCode: '#424D21' },
      { name: 'Deep Purple Blue', sku: 'RB38-HD', colorCode: '#4E5373' },
      { name: 'Dragon Green', sku: 'RB39-HD', colorCode: '#3B533E' },
      { name: 'Titanium Violet', sku: 'RB40-HD', colorCode: '#383048' },
      { name: 'Gloss Green Black', sku: 'HM07-HD', colorCode: '#1A534A' },
      { name: 'Black Cherry Ice', sku: 'HM08-HD', colorCode: '#412035' },
      { name: 'Black Gold', sku: 'HM09-HD', colorCode: '#9E4F03' },
      { name: 'Burgundy Black', sku: 'HM10-HD', colorCode: '#593041' },
      { name: 'Sonoma Green', sku: 'HM12-HD', colorCode: '#35793B' },
      { name: 'Sherwood Green', sku: 'HM14-HD', colorCode: '#023239' },
      { name: 'Copper Bronze', sku: 'HM15-HD', colorCode: '#644540' },
      { name: 'Antique Green', sku: 'HM16-HD', colorCode: '#6D7E6E' },
      { name: 'Gloss Coal Black', sku: 'MT01-HD', colorCode: '#1D1B17' },
      { name: 'Pink Sakura', sku: 'SL01-HD', colorCode: '#F6AEBA' },
      { name: 'Royal Purple', sku: 'SL07-HD', colorCode: '#897EB7' }
    ],
    Matte: [
      { name: 'Satin Perl White', sku: 'ECH01', colorCode: '#CCCEC7' },
      { name: 'Gunsmoke Grey', sku: 'ECH02', colorCode: '#726E64' },
      { name: 'Charcoal Grey', sku: 'ECH03', colorCode: '#757575' },
      { name: 'Navy Black', sku: 'ECH15', colorCode: '#18171C' },
      { name: 'Hornet Yellow', sku: 'ECH16', colorCode: '#C29C00' },
      { name: 'Bond Gold', sku: 'ECH17', colorCode: '#5F5836' },
      { name: 'Forest Green', sku: 'ECH19', colorCode: '#334B45' },
      { name: 'Dark Platinum', sku: 'ECH21', colorCode: '#2F2E33' },
      { name: 'Cherry Blossom Pink', sku: 'ECH22', colorCode: '#F8A5B9' },
      { name: 'Matte Coal Black', sku: 'MT01', colorCode: '#323037' },
      { name: 'Ultimate Black', sku: 'CG01-HD', colorCode: '#3D3B3C' },
      { name: 'Super White', sku: 'CG02-HD', colorCode: '#EAEAEA' },
      { name: 'Amazon Grey', sku: 'CG03-HD', colorCode: '#758083' },
      { name: 'Racing Red', sku: 'CG06-HD', colorCode: '#FB1318' },
      { name: 'Tiffany', sku: 'CG11-HD', colorCode: '#04CFC5' },
      { name: 'Sunflower Yellow', sku: 'CG12-HD', colorCode: '#FFB400' },
      { name: 'Slate Grey', sku: 'CG16-HD', colorCode: '#B1ADB4' },
      { name: 'Vibrant Blue', sku: 'CG57-HD', colorCode: '#0389DF' },
      { name: 'Millennial Pink', sku: 'CG19-HD', colorCode: '#E2A9AF' },
      { name: 'Battleship Grey', sku: 'CG20-HD', colorCode: '#908C8D' },
      { name: 'Rolling Sea', sku: 'CG21-HD', colorCode: '#0097D1' },
      { name: 'China Blue', sku: 'CG22-HD', colorCode: '#8DA8D5' },
      { name: 'Mossy Green', sku: 'CG23-HD', colorCode: '#A19A8A' },
      { name: 'Lava Orange', sku: 'CG24-HD', colorCode: '#FE4C31' },
      { name: 'Chelsea Rose', sku: 'CG25-HD', colorCode: '#F3B2B0' },
      { name: 'Ivory Cream', sku: 'CG26-HD', colorCode: '#E2CCB6' },
      { name: 'True Nardo Grey', sku: 'CG27-HD', colorCode: '#9C9899' },
      { name: 'Yacht Blue', sku: 'CG28-HD', colorCode: '#9BCEDF' },
      { name: 'Khaki Green', sku: 'CG29-HD', colorCode: '#847744' },
      { name: 'Pale Celadon', sku: 'CG30-HD', colorCode: '#BBBCB7' },
      { name: 'French Olive', sku: 'CG31-HD', colorCode: '#7D9C59' },
      { name: 'Amphibian Green', sku: 'CG32-HD', colorCode: '#00553C' },
      { name: 'Sorbet Pink', sku: 'CG59-HD', colorCode: '#F0265F' },
      { name: 'Vanilla Mist', sku: 'CG60-HD', colorCode: '#E2DED2' },
      { name: 'Baby Blue', sku: 'CG58-HD', colorCode: '#7495C2' },
      { name: 'Amber Rose', sku: 'CG36-HD', colorCode: '#FD8470' },
      { name: 'Bali Blue', sku: 'CG37-HD', colorCode: '#ABC6CA' },
      { name: 'British Racing Green', sku: 'CG38-HD', colorCode: '#357F7A' },
      { name: 'Monsoon Green', sku: 'CG39-HD', colorCode: '#A8BFB2' },
      { name: 'Tangerine Orange', sku: 'CG40-HD', colorCode: '#F64902' },
      { name: 'Gecko Green', sku: 'CG41-HD', colorCode: '#98CD00' },
      { name: 'Grape Green', sku: 'CG42-HD', colorCode: '#BEB732' },
      { name: 'Louvre Yellow', sku: 'CG43-HD', colorCode: '#DEBB00' },
      { name: 'Sunray Yellow', sku: 'CG44-HD', colorCode: '#DEA604' },
      { name: 'Amberwave', sku: 'CG45-HD', colorCode: '#F8D8A9' },
      { name: 'Sahara Beige', sku: 'CG46-HD', colorCode: '#F0D1BC' },
      { name: 'Vintage Grey', sku: 'CG47-HD', colorCode: '#ADAEB0' },
      { name: 'Spanish Lavender', sku: 'CG48-HD', colorCode: '#CDBDE2' },
      { name: 'Berry Red', sku: 'CG49-HD', colorCode: '#D93B78' },
      { name: 'Strawberry Milk', sku: 'CG50-HD', colorCode: '#EAD6CB' },
      { name: 'Camouflage Green', sku: 'CG51-HD', colorCode: '#394231' },
      { name: 'Leather Beige', sku: 'CG52-HD', colorCode: '#CAA468' },
      { name: 'Cool Blue', sku: 'CG53-HD', colorCode: '#96BFCF' },
      { name: 'Papaya Orange', sku: 'CG54-HD', colorCode: '#F69D35' },
      { name: 'Wild Dove', sku: 'CG55-HD', colorCode: '#807C7B' },
      { name: 'Flamingo Pink', sku: 'CG56-HD', colorCode: '#D68187' },
      { name: 'Top Coated Super Black', sku: 'CG01-SH', colorCode: '#282627' },
      { name: 'Top Coated Moss Green', sku: 'CG23-SH', colorCode: '#8C8B77' },
      { name: 'Top Coated Vintage Grey', sku: 'CG47-SH', colorCode: '#828483' },
      { name: 'Black', sku: 'CG01', colorCode: '#181C1F' }
    ],
    Super_Matte: [
      { name: 'Black', sku: 'CM01M', colorCode: '#333333' },
      { name: 'White', sku: 'CM02', colorCode: '#ECEDF3' },
      { name: 'Military Green', sku: 'CM09', colorCode: '#606644' },
      { name: 'Sandy Black', sku: 'CM01-MS', colorCode: '#4F453C' },
      { name: 'Sable Black', sku: 'TC01', colorCode: '#171818' },
      { name: 'Piniengruen Pearl', sku: 'TC02', colorCode: '#606755' },
      { name: 'Deep Black', sku: 'SCM01', colorCode: '#262729' },
      { name: 'Alaska White', sku: 'SCM02', colorCode: '#DAD8DD' },
      { name: 'Lizard Grey', sku: 'SCM23', colorCode: '#727467' },
      { name: 'Nickel Grey', sku: 'SCM27', colorCode: '#71737A' },
      { name: 'Vanilla Cream', sku: 'SCM26-R', colorCode: '#E9D6C5' },
      { name: 'Autumn Blaze', sku: 'SCM36', colorCode: '#FF8578' },
      { name: 'Granite Grey', sku: 'SCM47', colorCode: '#B0ABAF' },
      { name: 'Pearl Black', sku: 'CM15', colorCode: '#27282C' },
      { name: 'Raven Black', sku: 'CM14', colorCode: '#131217' },
      { name: 'Grainy Black', sku: 'CM02-MS', colorCode: '#2D2C33' }
    ],
    MirrorChrome: [
      { name: 'White Gold', sku: 'CHM01-HD', colorCode: '#797979' },
      { name: 'Yellow Gold', sku: 'CHM02-HD', colorCode: '#EFA114' },
      { name: 'Cherry Red', sku: 'CHM04-HD', colorCode: '#E0373F' },
      { name: 'Rose Gold', sku: 'CHM03-HD', colorCode: '#6C3A3E' },
      { name: 'Jet Black', sku: 'CHM10-HD', colorCode: '#4E444F' },
      { name: 'Solar Gold', sku: 'CHM21-HD', colorCode: '#E2C04F' },
      { name: 'Crystal Chrome', sku: 'CHM22-HD', colorCode: '#CDCDCD' },
      { name: 'Inferno Red', sku: 'CHM24-HD', colorCode: '#D30625' },
      { name: 'Nova Blue', sku: 'CHM26-HD', colorCode: '#2A1C76' }
    ],
    SatinChrome: [
      { name: 'Crimson Red', sku: 'VCH401-S', colorCode: '#9A1915' },
      { name: 'Velvet Blue', sku: 'VCH402-S', colorCode: '#0A2C83' },
      { name: 'Concord Grape', sku: 'VCH403-S', colorCode: '#571B51' },
      { name: 'Hot Pink', sku: 'VCH404-S', colorCode: '#AF2053' },
      { name: 'Emerald Green', sku: 'VCH405-S', colorCode: '#09A79A' },
      { name: 'Golden Yellow', sku: 'VCH408-S', colorCode: '#906600' },
      { name: 'Gunmetal Grey', sku: 'VCH410-S', colorCode: '#6A6068' },
      { name: 'Super Silver Sage', sku: 'VCH411-S', colorCode: '#D1CCD3' },
      { name: 'Lemon Yellow', sku: 'VCH412-S', colorCode: '#C0BC00' },
      { name: 'Violet Purple', sku: 'VCH416-S', colorCode: '#4423A5' },
      { name: 'Carmine Red', sku: 'VCH417-S', colorCode: '#DC0100' },
      { name: 'Autumn Orange', sku: 'VCH418-S', colorCode: '#F56107' },
      { name: 'Deep Cobalt', sku: 'VCH419-S', colorCode: '#131F35' },
      { name: 'Lapis Blue', sku: 'VCH420-S', colorCode: '#101867' },
      { name: 'Antique Rose', sku: 'VCH421-S', colorCode: '#B77A78' },
      { name: 'Sangria Red', sku: 'VCH422-S', colorCode: '#B31319' },
      { name: 'Gable Green', sku: 'VCH423-S', colorCode: '#006C43' }
    ],
    SatinMetallic: [
      { name: 'Dark Grey Silk', sku: 'HM01', colorCode: '#262228' },
      { name: 'Black Silver', sku: 'HM02-R', colorCode: '#65544C' },
      { name: 'Matte Green Black Silk', sku: 'HM07', colorCode: '#1A300D' },
      { name: 'Greenfinch Gold', sku: 'HM09', colorCode: '#736428' },
      { name: 'Mineral Grey', sku: 'SMT01', colorCode: '#796D59' },
      { name: 'Burnt Maroon', sku: 'SMT02', colorCode: '#65241A' },
      { name: 'Venetian Violet', sku: 'SMT03', colorCode: '#532C5F' },
      { name: 'Boysenberry Black', sku: 'SMT04', colorCode: '#555C6E' },
      { name: 'Green Mantle', sku: 'SMT05', colorCode: '#41554A' },
      { name: 'Apollo Grey', sku: 'SMT06', colorCode: '#3E3C38' },
      { name: 'Rasant Blue', sku: 'SMT07', colorCode: '#4E73D3' },
      { name: 'Admiral Blue', sku: 'SMT08', colorCode: '#1A227C' },
      { name: 'Onyx Grey', sku: 'SMT09', colorCode: '#594B40' },
      { name: 'Solar Orange', sku: 'SMT10', colorCode: '#FF7503' },
      { name: 'Surf Blue', sku: 'SMT11', colorCode: '#77B5E9' },
      { name: 'Paradise Green', sku: 'SMT12', colorCode: '#6ED56A' },
      { name: 'Pine Green', sku: 'SMT13', colorCode: '#012921' },
      { name: 'Lawn Green', sku: 'SMT14', colorCode: '#9DCE1C' },
      { name: 'Flame Red', sku: 'SMT15', colorCode: '#930012' },
      { name: 'Jewel Green', sku: 'SMT16', colorCode: '#004549' },
      { name: 'Copper Orange', sku: 'SMT17R', colorCode: '#B24302' },
      { name: 'Velour Red', sku: 'SMT18R', colorCode: '#4E1D21' },
      { name: 'Silver Blue', sku: 'SMT19', colorCode: '#5D6773' }
    ]
  };

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
    }
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
                  {brands.map((brand, index) => (

                    <div key={index} onClick={() => handleBrandClick(brand)} className={`text-white  items-center border-2 rounded-lg transition ${brand.name === "vector" ? 'flex' : ''} ${selectedBrand?.name === brand.name
                      ? 'border-blue-500'
                      : 'border-transparent'
                      }`}>
                      <img
                        key={brand.name}
                        src={brand.logo}
                        alt={brand.name}
                        className={`h-16 mx-auto cursor-pointer  p-1 transition `}

                      />
                      {brand.name === "vector" ? (
                        <span className='text-2xl font-semibold'> Avery Dennision </span>
                      ) : ''}
                    </div>
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
