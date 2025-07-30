import React, { useEffect, useState } from 'react'
import { Send, User, Bot } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ChatBot = () => {


    const BASE_URL = import.meta.env.VITE_API_URL

    const UserName = JSON.parse(localStorage.getItem('userName'))
    const location = useLocation() || ""
    const chatContainerRef = useRef(null);
    const chatEndRef = useRef(null);

    const [showChat, setShowChat] = useState(false)
    const [prompt, setPrompt] = useState({
        productInfo: location.state,
        userQuestion: ''
    })

    const [chatHistory, setChatHistory] = useState([])
    // const [loader, setLoader] = useState(null)

    // to scroll to bottom on every chat 
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    function handleChange(e) {
        setPrompt((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function sendPrompt() {
        // if user send empty message then it will show tost
        const questions = prompt.userQuestion?.trim()
        if (!questions) {
            toast('Please write a question', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        // setLoader(true)
        setShowChat(true)
        setPrompt((prev) => ({ ...prev, userQuestion: '' }))
        setChatHistory((prev) => ([...prev, {
            question: prompt.userQuestion,
            answer: ''
        }]))

        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/chatBot/response`,
                data: prompt
            })
            const { message, success, error } = response.data
            if (success) {
                // setLoader(false)
                setChatHistory((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].answer = message;
                    return updated;
                })
            }
        }
        catch (error) {
            // setLoader(false);
            console.log('some error', error)
        }
    }

    //  send on enter
    function handleKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent new line
            sendPrompt();       // Send the message by calling this function
        }
    }


    return (
        <div className="w-full relative mx-auto flex flex-col bg-gray-100 rounded-xl max-h-[300px] h-[300px]">

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            {/* Header */}
            <div className="mx-auto py-1 px-2 flex gap-2 items-center">
                <h1 className="text-md md:text-xl font-bold text-center text-gray-800 flex items-center justify-center">Customer Support</h1>
                <span className='icon'><i className="fa-solid fa-headset text-2xl"></i></span>
            </div>

            {/* Chat Messages Area */}
            {showChat ? <div ref={chatContainerRef} className="flex-1 overflow-y-auto max-h-[186px] p-4 space-y-4 scrollbar-hide">
                {/* User Message */}
                {chatHistory.map((chat, index) => {
                    return <div key={index}>
                        <div className="flex justify-end">
                            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-blue-500 text-white rounded-l-lg rounded-tr-lg p-3">
                                <div className="flex items-center mb-2 text-blue-100">
                                    <User size={16} className="mr-2" />
                                    <span className="text-sm font-medium">{UserName}</span>
                                </div>
                                <p className="text-sm md:text-base leading-relaxed">{chat.question}</p>
                            </div>
                        </div>

                        {/* Bot Response */}
                        <div className="flex justify-start">
                            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white text-gray-800 rounded-r-lg rounded-tl-lg shadow-md p-3">
                                <div className="flex items-center mb-2 text-gray-600">
                                    <Bot size={16} className="mr-2" />
                                    {/*AI Assistant*/}
                                    <span className="text-sm font-medium">JARVIS</span>
                                </div>
                                <p className="text-sm md:text-base leading-relaxed">{chat.answer ? chat.answer : <span className="inline-block h-6 w-6 border-4 border-t-blue-400 border-blue-200 rounded-full animate-spin"></span>}</p>
                            </div>
                        </div>
                    </div>
                })}
                <div ref={chatEndRef}></div>

            </div > : <div className="mx-auto py-1 px-2 mt-10">
                <h1 className="text-md md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Hello {UserName ? UserName.toUpperCase() : 'Guest'}
                </h1>
            </div>}


            {/* Input Area */}
            <div className="absolute w-[85%] bottom-0 left-1/2 transform -translate-x-1/2">
                <textarea
                    value={prompt.userQuestion}
                    onChange={handleChange}
                    name='userQuestion'
                    onKeyDown={handleKeyPress}
                    className=" w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm md:text-base"
                    placeholder="Type your question here..."
                    rows="2"
                />
                <button type='button' onClick={sendPrompt} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center text-center">
                    <Send size={18} />
                </button>
            </div>
        </div>

    )
}

export default ChatBot
