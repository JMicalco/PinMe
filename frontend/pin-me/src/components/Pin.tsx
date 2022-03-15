import React from 'react'
import { urlFor } from '../client'

interface Props {
    pin:any,
    className:string
}

const Pin = ({pin: { postedBy, image, _id, destination }}: Props) => {
  return (
    <div>
        <img className="rounded-lg w-full" src={urlFor(image).width(250).url()} alt="user-post" />
    </div>
  )
}

export default Pin