import React from 'react'
import Brandlogo from "./Brandlogo";
import theeM from '../../../assets/images/Brandlogo/3m.png';
import apa from '../../../assets/images/Brandlogo/apa.png';
import arlon from '../../../assets/images/Brandlogo/arlon.png';
import avery from '../../../assets/images/Brandlogo/avery.png';
import cheetah from '../../../assets/images/Brandlogo/cheetah.png';
import frog from '../../../assets/images/Brandlogo/frog.png';
import hexis from '../../../assets/images/Brandlogo/hexis.png';
import inozetek from '../../../assets/images/Brandlogo/inozetek.png';
import kpmg from '../../../assets/images/Brandlogo/kpmg.png';
import teckwrap from '../../../assets/images/Brandlogo/teckwrap.png';
import vvivid from '../../../assets/images/Brandlogo/vvivid.png';
import ShapeDivider from '../../../Components/ShapeDivider';
const brands = [
    theeM,
    avery,
    vvivid,
    teckwrap,
    inozetek,
    cheetah,
    apa,
    frog,
    hexis,
    kpmg,
    arlon,
];
const Explorewrapbrands = () => {
    return (
        <div className='bg-[#0A0718]'>
            <ShapeDivider color="#0A0718" />
            <div className="max-w-7xl mx-auto px-3 sm:px-8 text-white py-20">
                <div className='max-w-2xl mb-20 text-center mx-auto'>
                    <h2 className='text-6xl font-BeniRegular text-center sm:leading-28 leading-16 md:text-8xl font-extrabold tracking-wide uppercase'>Explore wrap brands.</h2>
                    <p className='text-lg font-Inter'>Browse colors from 3M, Avery, Inozetek, KPMF, TeckWrap, Hexis, VViViD, and more.
                        New Brands and Colors added weekly.</p>
                </div>
                <Brandlogo brands={brands} />
            </div>
        </div>
    )
}

export default Explorewrapbrands
