import React from 'react'

interface Props {
    user:any
    closeToogle?: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({user, closeToogle}: Props) => {
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar
