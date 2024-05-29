import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import TODOContext from "../Utils/TODOContext";
import ThemeContext from "../Utils/ThemeContext";

const Favourite = () => {
    const { state } = useContext(TODOContext);
    const { state: themeState } = useContext(ThemeContext); 

    return (
        <>
            <div className={`h-[90%] w-[40%] containerTheme shadow-lg rounded-xl ${themeState.isDarkMode ? 'bg-slate-950' : 'bg-white'} flex flex-col p-6 gap-4 items-start relative`}>
                <p className={`text-3xl ${themeState.isDarkMode ? 'text-violet-500' : 'text-violet-900'}`}>Important</p>
                <div className="w-full flex flex-col h-[300px] overflow-y-auto">
                    {
                        state.fav.map((ele) => (
                            <div className="flex w-[90%] items-center p-2 justify-between hover:bg-slate-900 text-gray-400 text-sm gap-2 transition-all rounded-lg hover:text-white cursor-pointer" key={ele.id}>
                                <div className="w-full flex gap-2">
                                    <p className="text-xl">{ele.task}</p>
                                </div>
                                <div className="flex gap-4 text-sm items-center">
                                    <p className={`text-${themeState.isDarkMode ? 'white' : 'gray-400'}`}>{ele.date}</p>
                                    <FaStar className="text-yellow-400 hover:scale-125 transition-all hover:text-yellow-300" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Favourite;