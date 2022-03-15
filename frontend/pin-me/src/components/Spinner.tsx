import React from 'react'
import { GuardSpinner } from "react-spinners-kit";

interface Props {
    message:string
}

const Spinner = ({message}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <GuardSpinner />
        <p>{message}</p>
    </div>
  )
}

export default Spinner