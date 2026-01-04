'use client'

import './style.css'
import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';
import { useState } from 'react';

export default function Slider() {
    const [currentObj, setCurrentObj] = useState(0);
    const [progress, setProgress] = useState(0);
    const [revealedValues, setRevealedValues] = useState([]);
    const [justAddedValues, setJustAddedValues] = useState([]);

    const obj = [S1, S2, S3];

    const objHeading = [
        'Being Left Out Because of a Physical Difference',
        'Best Friend Against Me',
        'Different Interests, Different Opinions'
    ];

    const objSubHeading = [
        'Sam wanted to play tag. Jake said, "No, you’ll slow us down!" Sam felt sad.',
        'Sophia and Emma have always been best friends. One day, Mia, another classmate, invites Emma to sit with them. Sophia gets upset and says, "I thought we were best friends! If you sit with Mia, we’re not friends anymore!" Emma feels torn between making a new friend and keeping Sophia happy.',
        'Oliver and Mia discuss their favourite movies. Oliver loves superhero films, while Mia prefers animated movies. Oliver laughs and says, "Animated movies are for little kids. You should watch real movies like mine!" Mia feels embarrassed and annoyed at Oliver’s disrespectful remark.'
    ];

    const toleranceQtyObj = [
        ["Fairness", "Inclusivity", "Supportiveness"],
        ["Respect", "Empathy"],
        ["Open-mindedness", "Kindness"]
    ];

    const handleNext = () => {
        if (currentObj < obj.length - 1) {
            setCurrentObj(currentObj + 1);
            setJustAddedValues([]);
            let update = updateToleranceQtyObj()
            if(update){
                updateProgress()
            }
        }
    };

    const updateProgress = () => {
        const update = updateToleranceQtyObj();
        if (update) {
            const newItems = toleranceQtyObj[currentObj].filter(
                (item) => !revealedValues.includes(item)
            );

            setRevealedValues([...newItems, ...revealedValues]);
            setJustAddedValues(newItems);

            let newProgress = (currentObj + 1) * 33;
            setProgress(newProgress);
        }
    };

    const updateToleranceQtyObj = () => {
        let update = false;
        for (let i = 0; i < revealedValues.length; i++) {
            if (toleranceQtyObj[currentObj].includes(revealedValues[i])) {
                return update;
            }
        }
        update = true;
        return update;
    };

    const getGradient = () => {
        if (progress < 33) {
            return "from-blue-500 to-cyan-400"; // Peaceful blue to cyan
        } else if (progress < 66) {
            return "from-cyan-400 to-indigo-400"; // Peaceful cyan to indigo
        } else {
            return "from-indigo-400 to-purple-400"; // Peaceful indigo to purple
        }
    };

    return (
        <div className="slidesMainContainer">
            <div className="flex gap-4">
                {/* Left Content - Image & Story */}
                <div className="w-[70%] bg-blue-500 p-4 text-white leftCon">
                    <h1 className="headingOg">{objHeading[currentObj]}</h1>
                    <h1 className="heading">{objSubHeading[currentObj]}</h1>
                    <Image alt="currentObj" className="currentObj" src={obj[currentObj]} />
                </div>

                {/* Right Content - Progress Bar & Values */}
                <div className="w-[30%] bg-green-500 p-4 text-white rightCon flex flex-col items-center">
                    <h1 className='text-[25px] font-semibold'>Tolerance Qualities</h1>
                    {/* Progress Bar & Tolerance Values in One Row */}
                    <div className="flex items-center gap-4 w-full">
                        {/* Progress Bar */}
                        <div className="w-6 bg-gray-300 h-100 rounded-lg relative">
                            <div
                                className={`absolute bottom-0 left-0 w-6 rounded-lg transition-all duration-500 bg-gradient-to-b ${getGradient()}`}
                                style={{ height: `${progress}%` }}
                            ></div>
                        </div>

                        {/* Revealed Tolerance Values */}
                        <div className="flex flex-col gap-2">
                            {revealedValues.map((value, index) => (
                                <p
                                    key={index}
                                    className={`px-2 py-1 rounded-lg transition-all duration-300
                                        ${justAddedValues.includes(value)
                                            ? 'bg-[#ffea00] text-black font-semibold'
                                            : 'bg-white text-black'}`}
                                >
                                    {value}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Button to Update Progress */}
                    {progress < 100 && (
                        <button onClick={updateProgress} className="mt-4 p-2 bg-yellow-500 text-black rounded-lg">
                            Update Progress
                        </button>
                    )}
                </div>
            </div>

            {/* Next Button */}
            {currentObj < obj.length - 1 && (
                <button onClick={handleNext} className="mt-4 p-2 bg-gray-700 text-white rounded-lg">
                    Next
                </button>
            )}
        </div>
    );
}
