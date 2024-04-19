import React, { useState } from 'react'
import { createContext } from 'react'


export const Context = createContext();


const AppProvider = ({children}) => {
  

const [isCollapsed,setIsCollapsed] =useState(false);


  return (
 <Context.Provider value={{isCollapsed,setIsCollapsed}}>
        {children}
 </Context.Provider>
  )
}

export default AppProvider