import React, { useState, useEffect } from "react";

const CountdownTimer: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;

        if (isRunning && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);
        } else if (remainingTime === 0) {
            setIsRunning(false);
        }

        return () => {
            if (timer) {
                clearInterval(timer); // Clean up interval on component unmount or state change
            }
        };
    }, [isRunning, remainingTime]);

    const handleStart = () => {
        if (time > 0) {
            setRemainingTime(time);
            setIsRunning(true);
        }
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setRemainingTime(0);
        setTime(0);
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-between bg-gradient-to-br from-black to-teal-700 relative">
            
            {/* Logo */}
            <img
                src="https://png.pngtree.com/png-vector/20190116/ourmid/pngtree-letter-o-with-dove-logo-concept-creative-and-elegant-logo-png-image_320276.jpg"
                alt="O logo"
                className="absolute top-4 left-4 h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full"
            />

            {/* Main Content (Centered Container) */}
            <div className="flex flex-col items-center justify-center flex-grow px-4 sm:px-6 md:px-8 w-full max-w-lg text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase mb-6 text-white">
                    Countdown Timer
                </h1>

                {/* Input Field */}
                <input
                    type="number"
                    className="border-2 border-grey-400 bg-transparent p-3 mb-6 text-sky-400 text-lg sm:text-xl rounded w-full max-w-sm"
                    placeholder="Enter Timer In Seconds"
                    value={time > 0 ? time : ""}
                    onChange={(e) => setTime(Number(e.target.value))}
                />

                {/* Remaining Time Display */}
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase mb-6 text-white">
                    {remainingTime} seconds remaining
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 w-full max-w-lg justify-center">
                    <button
                        onClick={handleStart}
                        disabled={isRunning || time <= 0}
                        className="text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-normal bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 disabled:opacity-50"
                    >
                        Start
                    </button>
                    <button
                        onClick={handlePause}
                        disabled={!isRunning}
                        className="text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-normal bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 disabled:opacity-50"
                    >
                        Pause
                    </button>
                    <button
                        onClick={handleReset}
                        className="text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-normal bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-4 w-full text-center rounded-t-lg shadow-lg">
            &copy; 2024 Muhammad Owais. All Rights Reserved.
            </footer>
        </div>
    );
};

export default CountdownTimer;
