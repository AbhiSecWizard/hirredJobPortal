
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
const AppLayout = () => {
  return (
   <div >
      <div className='grid-background'></div>
      <main className='min-h-screen container mx-auto'>
      <Header/>
      <Outlet/>
      </main>
     <div className='py-11 bg-gray-600/60 w-full text-center'>
         Created by 💖 Abhishek Yadav
     </div>
   </div>
  )
}
export default AppLayout       