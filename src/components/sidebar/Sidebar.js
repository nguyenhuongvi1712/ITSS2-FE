import React from 'react'
import { NavLink } from "react-router-dom";
import {SidebarData} from '../data/SidebarData'

const Sidebar = () => {
    const activeLink = 'hover:bg-blue-300 mt-7 pl-8 w-full h-14 flex justify-start items-center text-white text-1.5xl space-x-1 font-bold bg-blue-300'
    const normalLink = 'hover:bg-blue-300 pl-7 mt-7 w-full h-14 flex justify-start items-center text-white text-1.5xl space-x-1 font-bold'

  return (
    <>
    <section>
      <div className="text-white">
          {
               SidebarData.map((item, index)=>{
                return(
                    <div key={index}>
                        <NavLink to={item.path}
                        className={({ isActive }) =>
                        isActive ? activeLink: normalLink}
                      
                         >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                        </NavLink>
                        
                    </div>
                )
              })
          }
  
      </div>
    </section>
  </>
  )
}

export default Sidebar