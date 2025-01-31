import React, { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  let navigate = useNavigate();

  return (
    <div >
      <div className='bg-slate-200 m-1 py-5 px-1'>
        <h2>Home Page</h2>
        <button 
        className='bg-green-500 rounded-xl p-2 mt-3'
        onClick={() => navigate('/todo')}>Todo Page</button>
      </div>
    </div>
  )
}

export default Home