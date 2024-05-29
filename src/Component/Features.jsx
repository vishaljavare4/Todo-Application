import React, { useContext } from 'react';
import { FaToggleOn, FaToggleOff, FaAddressBook, FaSearch, FaGithub, FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import ThemeContext from '../Utils/ThemeContext';

const Features = () => {
    const { state, dispatch } = useContext(ThemeContext);

    const toggleTheme = () => {
        dispatch({ type: "TOGGLE_THEME" });
    };

    return (
        <>
            <div className={`h-[90%] w-[20%] shadow-lg rounded-xl containerTheme ${state.isDarkMode ? 'bg-slate-950' : 'bg-white'} flex flex-col p-6 gap-10 items-center ml-[15%]`}>
                <div className="w-full text-white flex justify-between items-center">
                    <p className={`text-2xl font-semibold ${state.isDarkMode ? 'text-violet-500' : 'text-violet-900'}`}>Features</p>
                    {state.isDarkMode ? (
                        <FaToggleOn className="text-3xl text-violet-500 cursor-pointer" onClick={toggleTheme} />
                    ) : (
                        <FaToggleOff className="text-3xl text-violet-900 cursor-pointer" onClick={toggleTheme} />
                    )}
                </div>
                <div className={`w-full flex flex-col gap-2 ${state.isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Link to="/" className={`w-full flex items-center ${state.isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-gray-300'} gap-2 p-2 rounded-lg transition-all cursor-pointer`}>
                        <FaHome />
                        <p>Home</p>
                    </Link>
                    <Link to="/favourite" className={`w-full flex items-center ${state.isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-gray-300'} gap-2 p-2 rounded-lg transition-all cursor-pointer`}>
                        <FaAddressBook />
                        <p>Important</p>
                    </Link>
                    <Link to="/search" className={`w-full flex items-center ${state.isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-gray-300'} gap-2 p-2 rounded-lg transition-all cursor-pointer`}>
                        <FaSearch />
                        <p>Search</p>
                    </Link>
                    <div className={`w-full flex items-center ${state.isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-gray-300'} gap-2 p-2 rounded-lg transition-all cursor-pointer`}>
                        <MdEmail />
                        <p>Email</p>
                    </div>
                </div>
                <FaGithub className={`text-3xl mt-20 ${state.isDarkMode ? 'text-white' : 'text-gray-800'}`} />
            </div>
        </>
    );
};

export default Features;