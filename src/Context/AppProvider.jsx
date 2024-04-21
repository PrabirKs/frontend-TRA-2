import React, { useState } from 'react'
import { createContext } from 'react'


export const Context = createContext();


const AppProvider = ({children}) => {
  

const [isCollapsed,setIsCollapsed] =useState(false);
const [modalOpen,setModalOpen] = useState(false)

  return (
 <Context.Provider value={{isCollapsed,setIsCollapsed,modalOpen,setModalOpen}}>
        {children}
 </Context.Provider>
  )
}

export default AppProvider