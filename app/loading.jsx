import React from 'react';


export default function Loader({ loadingType }) {
    return (
        <div
            className={`loader flex items-center justify-center ${loadingType != 'fetchLoader' ? 'h-screen w-screen bg-gradient-to-br from-[#7F73C7] to-[#C097DB]' : 'flex-col'}`}
        >
            <svg
                width="142"
                height="142"
                viewBox="0 0 142 142"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="70.5823"
                    cy="70.5823"
                    r="44.5156"
                    transform="rotate(150 70.5823 70.5823)"
                    stroke="#FFF2F2"
                    strokeWidth="1.58984"
                />
                <path
                    d="M32.0143 92.8497C28.6015 94.82 27.3959 99.2222 29.8173 102.331C33.9758 107.671 39.1579 112.16 45.0845 115.523C53.0878 120.064 62.1584 122.385 71.3591 122.246C80.5597 122.108 89.5565 119.515 97.4197 114.736C103.243 111.197 108.287 106.553 112.283 101.091C114.61 97.9109 113.273 93.547 109.802 91.6802C106.332 89.8133 102.052 91.1708 99.5612 94.2243C96.8835 97.5063 93.6566 100.323 90.0076 102.541C84.3161 106.001 77.8041 107.877 71.1446 107.977C64.485 108.078 57.9195 106.398 52.1267 103.111C48.4125 101.004 45.1024 98.2848 42.3274 95.0848C39.7456 92.1076 35.427 90.8793 32.0143 92.8497Z"
                    fill="#FFF2F2"
                />
            </svg>
            {loadingType === 'fetchLoader' && (
                <div className='flex flex-col items-center mt-4 text-white'>
                    <h4 className='text-xl font-bold '><span className='italic'>Sit Tight, We're On It!</span>  😊</h4>
                    <p className='text-md mt-2 text-center'>Our system is processing your request. 🤖 We're fetching the profile details for you. 🙏</p>
                </div>
            )}
        </div>
    );
}