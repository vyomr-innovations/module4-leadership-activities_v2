'use client'

import './style.css'

import { useState } from 'react';
import jsPDF from "jspdf";

export default function Slider() {
    const [err, setErr] = useState(false)
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const [allAns, setAllAns] = useState({})
    const obj = [
        {
            scenario: "Making the Most of New Playground Space",
            scenarioT: "The school has recently expanded. Students have the opportunity to help decide how to use the additional space. Most students (Delta group) want to build a new basketball court to encourage teamwork and physical activity. A smaller group (Sigma group) prefers a quiet reading area because not everyone enjoys sports. ",
            questions: [
                "Why does your group believe a basketball court is the best choice?",
                "Why is your group’s choice important?",
                "How would your group feel if their idea wasn’t considered?"
            ]
        },
        {
            scenario: "The Community Safety Debate",
            scenarioT: "A local town is debating a new safety rule. The majority group, called Delta, wants to set a curfew for all kids under 14, requiring them to be home by 8 PM to ensure safety. A smaller group, called Sigma, argues that kids who have parental permission and show responsibility should be allowed to stay out until late. They believe it’s unfair to restrict all kids because of a few concerns",
            questions: [
                "How does your group feel about the curfew?",
                "Why does your group think this is the best solution?",
                "How would your group feel if their concerns weren’t considered?"
            ]
        }
    ]

    const s1_grp2_q1 = "How does your group feel about kids and parents deciding instead of curfew?"

    const handleTextBoxChange = (e, groupId, ansIndex) => {
        setErr(false)
        const val = e.target.value
        const s = `s${currentObjIndex}`
        if (allAns[s]) {
            if (allAns[s][groupId]) {
                allAns[s][groupId][ansIndex] = val
            } else {
                const temp_s = allAns[s]
                temp_s[groupId] = {
                    [ansIndex]: val
                }
                setAllAns((prevAllAns) => ({
                    ...prevAllAns, [s]: temp_s
                }))
            }
        } else {
            setAllAns((prevAllAns) => ({
                ...prevAllAns, [s]: {
                    [groupId]: {
                        [ansIndex]: val
                    }
                }
            }))
        }
    }

    

    function isValidatedAllAns() {
        let isValid = false
        let s = currentObjIndex === 0 ? 's0' : 's1'
        if (allAns[s] && allAns[s]['delta'] && allAns[s]['sigma']) {
            if (Object.entries(allAns[s]['delta']).length == 3 && Object.entries(allAns[s]['sigma']).length == 3) {
                let noneOfThemAreEmpty_delta = Object.values(allAns[s]['delta']).every(value => Boolean(value));
                let noneOfThemAreEmpty_sigma = Object.values(allAns[s]['sigma']).every(value => Boolean(value));
                if (noneOfThemAreEmpty_delta && noneOfThemAreEmpty_sigma) {
                    isValid = true
                }
            }
        }
        return isValid
    }

    const handleSubmit = () => {
        if (isValidatedAllAns()) {
            let makeEmpty = false

            if (currentObjIndex < obj.length - 1) {
                setCurrentObjIndex(prevCurrentObjIndex => prevCurrentObjIndex + 1)
                makeEmpty = true
            }
            else {
                // console.log(allAns)
                generatePDF()
            }


            if (makeEmpty) {
                document.querySelectorAll("textarea:not([readonly])").forEach(textarea => {
                    textarea.value = "";
                });
            }

        } else {
            setErr(true)
        }
    }


    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth() - 20; // Margin
        let y = 10;

        doc.setFontSize(16);
        doc.text("Delta vs Sigma", 10, y);
        y += 10;

        obj.forEach((scenario, index) => {
            const scenarioKey = `s${index}`;
            const responses = allAns[scenarioKey] || {};

            doc.setFontSize(14);
            let scenarioText = `Scenario ${index + 1}: ${scenario.scenario}`;
            let wrappedScenario = doc.splitTextToSize(scenarioText, pageWidth);
            doc.text(wrappedScenario, 10, y);
            y += wrappedScenario.length * 7;

            doc.setFontSize(12);
            let description = `Scenario Details: ${scenario.scenarioT}`;
            let wrappedDesc = doc.splitTextToSize(description, pageWidth);
            doc.text(wrappedDesc, 10, y);
            y += wrappedDesc.length * 7;

            ["delta", "sigma"].forEach((group) => {
                doc.setFontSize(13);
                doc.text(`${group === "delta" ? "Delta Group" : "Sigma Group"}`, 10, y);
                y += 7;

                let answer = Object.values(responses[group] || {}).join(" ")
                let wrappedAnswer = doc.splitTextToSize(`Script: ${answer}`, pageWidth);
                doc.text(wrappedAnswer, 15, y);
                y += wrappedAnswer.length * 7 + 5;

                y += 10;
                if (y > 270) {
                    doc.addPage();
                    y = 10;
                }
            });
        });

        doc.save("Delta vs Sigma.pdf");
    };


    return (
        <div className='slidesMainContainer'>
            <h1 className='scenario'>{obj[currentObjIndex]["scenario"]}</h1>
            <h1 className='scenarioT'><b>Scenario:</b> {obj[currentObjIndex]["scenarioT"]}</h1>

            <div className="flex gap-4">
                <div className="w-1/2 p-4 leftCon">
                    <h1 className='grpHeading'>Delta Group</h1>
                    {obj[currentObjIndex]["questions"].map((question, index) => (
                        <div key={index} className='questionContaienr'>
                            <p>{question}</p>
                            <textarea
                                onChange={(e) => handleTextBoxChange(e, 'delta', index)}
                                className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </textarea>
                        </div>
                    ))}
                </div>
                <div className="w-1/2 p-4 rightCon">
                    <h1 className='grpHeading'>Sigma Group</h1>
                    {obj[currentObjIndex]["questions"].map((question, index) => (
                        <div key={index} className='questionContaienr'>
                            <p>
                                {index === 0 ? s1_grp2_q1 : question}
                            </p>
                            <textarea
                                onChange={(e) => handleTextBoxChange(e, 'sigma', index)}
                                className="w-full h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </textarea>
                        </div>
                    ))}
                </div>
            </div>

            {err &&
                <h1 className='text-[18px] text-red-500 font-semibold' >Please ensure that all input fields are filled*</h1>
            }

            <button
                onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}
