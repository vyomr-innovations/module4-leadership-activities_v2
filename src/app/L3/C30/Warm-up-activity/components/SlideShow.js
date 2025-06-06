'use client'

import './style.css'
import { useState, useEffect } from 'react';
import Modal from "@/components/ModalInit";

export default function SlideShow() {
    const [modalTitle, setModalTitle] = useState('')
    const [modalContent, setModalContent] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [nextQ, setNextQ] = useState(false);

    const [currentObjIndex, setCurrentObjIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(7);

    const objects = [
        {
            "text": "You're planning a class trip. Would you:",
            "options": [
                "Go to the beach?",
                "Go to a museum?",
                "Visit an amusement park?"
            ]
        },
        {
            "text": "You’re the class leader for a group project. Would you:",
            "options": [
                "Assign roles?",
                "Let everyone pick?",
                "Do most of it yourself?"
            ]
        },
        {
            "text": "Your school is starting a new club. Would you:",
            "options": [
                "Start a robotics club?",
                "Create a drama/theatre group?",
                "Launch an eco-warrior club for the environment?"
            ]
        },
        {
            "text": "You and your sibling are arguing about what to watch. Do you:",
            "options": [
                "Let them pick this time?",
                "Suggest flipping a coin?",
                "Watch something neither of you chose?"
            ]
        },
        {
            "text": "Your parents say no to something you really want. Do you:",
            "options": [
                "Ask again and again until they say yes?",
                "Accept it and try to understand their reason?",
                "Get upset and give them the silent treatment?"
            ]
        },
        {
            "text": "Your parents buy you clothes you don’t like. Do you:",
            "options": [
                "Wear them anyway to be polite?",
                "Tell them kindly and offer to choose together next time?",
                "Complaint and refuse to wear them?"
            ]
        }
    ]

    const [quizCompleted, setQuizCompleted] = useState(false)
    useEffect(() => {
        // console.log(timeLeft, currentObjIndex, objects.length)
        if (timeLeft === 0) {
            if (currentObjIndex === (objects.length - 1)) {
                nextQuestion()
            } else {
                setModalTitle('You missed answering! Move to the next question.');
                setNextQ(true)
                setOpenModal(true)
            }
        }

        if (!openModal) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }

    }, [timeLeft]);

    const handleSelectedOption = (selectedOption) => {
        setModalTitle('Moving to next question')
        setOpenModal(true);
        setNextQ(true)
    };

    const nextQuestion = () => {
        if (currentObjIndex < objects.length - 1) {
            setCurrentObjIndex(prev => prev + 1);
            setTimeLeft(7);
        } else {
            setQuizCompleted(true)
        }
    };

    const closeModal = () => {
        setOpenModal(false)
        setModalContent('')
        if (nextQ) {
            nextQuestion();
            setNextQ(false)
        }
    }


    return (
        <div className="slideShowContainer p-4 space-y-4">
            {quizCompleted ? (
                <h1 className="text-[30px] font-semibold text-center">
                    Activity completed!
                </h1>
            ) : (
                <div>
                    <p style={openModal ? { visibility: 'hidden' } : {}}
                        className="text-right text-[30px] mt-4 mb-4 text-red-500 font-bold"
                    >
                        Time left: {timeLeft}s
                    </p>

                    <p className="text-lg font-semibold text-center mb-4 bg-gray-100 p-4 rounded-lg">
                        Adventure {currentObjIndex + 1}: {objects[currentObjIndex].text}
                    </p>
                    <center>
                        {objects[currentObjIndex].options.map((option, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => handleSelectedOption(index)}
                                    className="px-4 cursor-pointer py-2 m-2 bg-blue-500 text-white rounded-lg shadow-md">
                                    {option}
                                </button>
                                <br />
                            </div>

                        ))}
                    </center>
                </div>
            )}

            <Modal
                title={modalTitle}
                content={modalContent}
                open={openModal}
                closeModal={closeModal}
            />
        </div>
    );
}
