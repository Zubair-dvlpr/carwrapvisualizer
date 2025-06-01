import React from 'react'
import brandsImg from "../../../assets/images/brands.png"
const Brands = () => {
    return (
        <div className='bg-[#FF0069] pt-20'>
            <div className="max-w-[1320px] rounded-3xl overflow-hidden mx-auto bg-white">
                <img src={brandsImg} alt="" className='max-w-6xl mx-auto' />
            </div>

            <div className='mt-20'>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="114" viewBox="0 0 1918 83" fill="none">
                    <path d="M0 111.297C605.773 -32.4019 1238.26 -36.5672 1846.65 96.5768L1920 111.297V113.963H0V111.297Z" fill="#12161F" />
                </svg>
            </div>
        </div>
    )
}

export default Brands
