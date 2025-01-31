import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../ThemeContext';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useGetPostsQuery } from '../app/services/postApi';
import { data } from 'autoprefixer';

const Actions = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskTitle, setEditingTaskTitle] = useState('');

    const { theme, toggleTheme } = useContext(ThemeContext);

    const { data: posts, error, isLoading } = useGetPostsQuery();
    console.log('data RTK Query', posts) 

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        }
    }, [theme])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const json = await response.json();
                setTasks(json);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, []);

    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const addTask = async () => {
        if (!newTaskTitle.trim()) return;

        const taskExists = tasks.some(task => task.title.toLowerCase() === newTaskTitle.toLowerCase());
        if (taskExists) {
            alert('Task already exists!');
            return;
        }

        const newTask = { title: newTaskTitle, completed: false };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify(newTask),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setTasks(prevTasks => [...prevTasks, data]);
            setNewTaskTitle('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const startEditing = (id, title) => {
        setEditingTaskId(id);
        setEditingTaskTitle(title);
    };

    const saveEditedTask = async () => {
        if (!editingTaskTitle.trim()) return;

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === editingTaskId ? { ...task, title: editingTaskTitle } : task
            )
        );

        setEditingTaskId(null);
        setEditingTaskTitle('');
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Todo App</h2>

            <button
                onClick={toggleTheme}
                className='bg-yellow-200 p-2'>
                Toggle Theme
            </button>
            <div className="mb-4">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter a new task"
                    className="px-4 py-2 border border-gray-300 rounded"
                />
                <button
                    onClick={addTask}
                    className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
                >
                    Add Task
                </button>
            </div>

            {editingTaskId && (
                <div className="mb-4">
                    <input
                        type="text"
                        value={editingTaskTitle}
                        onChange={(e) => setEditingTaskTitle(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={saveEditedTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
                    >
                        Save Edit
                    </button>
                </div>
            )}

            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-100">
                        <th className="px-4 py-2 border text-left">ID</th>
                        <th className="px-4 py-2 border text-left">Title</th>
                        <th className="px-4 py-2 border text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{task.id}</td>
                                <td className="px-4 py-2 border">{task.title}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => startEditing(task.id, task.title)}
                                        className="bg-yellow-300 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-4 py-2 text-center">
                                No tasks available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Actions;
