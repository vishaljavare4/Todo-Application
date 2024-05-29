import { useContext, useState } from "react";
import { FaStar, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import TODOContext from "../Utils/TODOContext";
import { toast } from "react-toastify";
import ThemeContext from "../Utils/ThemeContext";

const Todos = () => {
    const { state, dispatch } = useContext(TODOContext);
    const { state: themeState } = useContext(ThemeContext);
    const [newTask, setNewTask] = useState("");
    const [editTask, setEditTask] = useState("");
    const [editingId, setEditingId] = useState(null);

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            const newTodo = {
                id: state.todo.length + 1,
                task: newTask
            };
            dispatch({ type: "ADD_TODO", payload: newTodo });
            setNewTask("");
            toast.success("Task added successfully!");
        }
    };

    const handleDelete = (id) => {
        dispatch({ type: "DELETE_TODO", payload: id });
        toast.error("Task deleted successfully!");
    };

    const handleEdit = (id, task) => {
        setEditingId(id);
        setEditTask(task);
    };

    const handleUpdateTask = () => {
        if (editTask.trim() !== "") {
            dispatch({ type: "EDIT_TODO", payload: { id: editingId, task: editTask } });
            setEditingId(null);
            setEditTask("");
            toast.info("Task updated successfully!");
        }
    };

    const handleFav = (data) => {
        const date = new Date();
        const formattedDate = formatDate(date);
        const payloadData = {
            id:data.id,
            task:data.task,
            date: formattedDate,
        }
        dispatch({ type: "ADD_FAV", payload: payloadData });
        toast.success("Added to Important");
    };

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };      

    return (
        <div className={`h-[90%] w-[40%] containerTheme shadow-lg rounded-xl ${themeState.isDarkMode ? 'bg-slate-950' : 'bg-white'} flex flex-col p-6 gap-4 items-start relative`}>
            <p className={`text-3xl ${themeState.isDarkMode ? 'text-violet-500' : 'text-violet-900'}`}>Tasks</p>
            <div className="w-full flex flex-col h-[300px] overflow-y-auto">
                {
                    state.todo.map((ele) => (
                        <div className="flex w-[90%] items-center p-2 justify-between hover:bg-slate-900 text-gray-400 text-sm gap-2 transition-all rounded-lg hover:text-white cursor-pointer" key={ele.id}>
                            <div className="w-full flex gap-2">
                                <p>{ele.id}.</p>
                                <p>{ele.task}</p>
                            </div>
                            <div className="flex gap-4 text-sm">
                                <FaStar className="text-yellow-400 hover:scale-125 transition-all hover:text-yellow-300" onClick={() => handleFav(ele)}/>
                                <FaPencilAlt className="hover:scale-125 transition-all" onClick={() => handleEdit(ele.id, ele.task)} />
                                <MdDelete className={`text-${themeState.isDarkMode ? 'rose-800' : 'rose-500'} hover:scale-125 transition-all hover:text-${themeState.isDarkMode ? 'rose-500' : 'rose-300'}`} onClick={() => handleDelete(ele.id)} />
                            </div>
                        </div>
                    ))
                }
            </div>
            <Popup 
                trigger={<button className={`text-white bg-violet-900 p-2 rounded-lg hover:bg-violet-800 transition-all absolute bottom-6 self-center`}>Add Task</button>} 
                modal
                nested
            >
                {close => (
                    <div className={`bg-violet-950 p-6 rounded-lg shadow-lg border-0`}>
                        <button className={`text-white float-right hover:scale-110 transition-all`} onClick={close}>&times;</button>
                        <h2 className={`text-white text-lg mb-4`}>Add New Task</h2>
                        <input 
                            type="text" 
                            value={newTask} 
                            onChange={(e) => setNewTask(e.target.value)} 
                            className={`w-full p-2 rounded-lg mb-4 focus:outline-none text-sm ${themeState.isDarkMode ? 'text-white' : 'text-black'}`}
                            placeholder="Enter your task"
                        />
                        <button 
                            className={`text-white bg-violet-900 p-2 rounded-lg hover:bg-violet-800 transition-all`}
                            onClick={() => {
                                handleAddTask();
                                close();
                            }}
                        >
                            Add Task
                        </button>
                    </div>
                )}
            </Popup>
            <Popup 
                open={editingId !== null}
                onClose={() => setEditingId(null)}
                modal
                nested
            >
                {close => (
                    <div className={`bg-violet-950 p-6 rounded-lg shadow-lg border-0`}>
                        <button className={`text-white float-right hover:scale-110 transition-all`} onClick={close}>&times;</button>
                        <h2 className={`text-white text-lg mb-4`}>Edit Task</h2>
                        <input 
                            type="text" 
                            value={editTask} 
                            onChange={(e) => setEditTask(e.target.value)} 
                            className={`w-full p-2 rounded-lg mb-4 focus:outline-none text-sm ${themeState.isDarkMode ? 'text-white' : 'text-black'}`}
                            placeholder="Edit your task"
                        />
                        <button 
                            className={`text-white bg-violet-900 p-2 rounded-lg hover:bg-violet-800 transition-all`}
                            onClick={() => {
                                handleUpdateTask();
                                close();
                            }}
                        >
                            Update Task
                        </button>
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default Todos;