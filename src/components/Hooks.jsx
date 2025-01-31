import React, { useContext, useReducer, useEffect } from 'react'
import ThemeContext from '../ThemeContext';
import '../index.css'
import { increment, decrement } from '../features/counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Hooks = () => {

    // const initialState = { count: 0 };

    const { theme, toggleTheme } = useContext(ThemeContext);

    // const [state, dispatch] = useReducer(reducer, initialState);

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        }
    }, [theme]); 

    // function reducer(state, action) {
    //     switch (action.type) {
    //         case "increment":
    //             return { ...state, count: state.count + 1 };
    //         case "decrement":
    //             return { ...state, count: state.count - 1 };
    //         case "reset":
    //             return { count: state.count = 0 }
    //     }
    // }

    const handleIncrement = () => {
        dispatch(increment());
    };

    const handleDecrement = () => {
        dispatch(decrement())
    };

    // const handleReset = () => {
    //     dispatch({ type: "reset" })
    // }

    return (
        <>
            <h2 className='text-2xl font-semibold text-blue-800 m-5'>Count: {count}</h2>
            <button onClick={toggleTheme}
                  style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#333' : '#fff' }}
            >Toggle Theme</button>
            <div className='flex gap-4 p-2 '>
                <button
                    className='bg-green-500 rounded-xl p-2'
                    onClick={handleIncrement}>
                    Increment
                </button>
                <button
                    className='bg-red-500 rounded-xl p-2'
                    onClick={handleDecrement}>
                    Decrement
                </button>
                <button
                    className='bg-slate-800 text-white rounded-xl p-2'
                    // onClick={handleReset}
                     >
                    Reset
                </button>
            </div>
        </>
    )
}

export default Hooks