'use client';
import React, { useState, useEffect } from 'react';

export default function SubmitLoader({ onComplete = () => { } }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // onComplete(); // Notify parent when loading is complete
                    setTimeout(onComplete, 0); // Delay state update to avoid conflicts
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="relative bg-gradient-to-br from-[#7F73C7] to-[#C097DB] min-h-screen w-full">
            <div className="border-box h-screen w-full flex items-center justify-center">
                <div className="px-6">
                    <div className="h-36 w-36 border-2 mx-auto mb-6 border-[#FFF2F2]/30 rounded-full flex flex-col items-center justify-center text-white font-bold text-2xl">
                        <h4>{progress}%</h4>
                        <h4>{progress < 100 ? 'Trying' : 'Complete'}</h4>
                    </div>
                    <div className="relative h-2 w-80 border border-[#FFF2F2]/50 rounded-full shadow-submit-shadow">
                        <div
                            style={{
                                width: `${progress}%`,
                                transition: `width 0.05s linear`
                            }}
                            className="absolute h-full left-0 top-0 bg-white z-10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
