import React from 'react'
import Masonry from "react-masonry-css"
import Pin from "./Pin"

interface Props {
    pins:any 
}

const breakPointObj = { 
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
}

const MasonryLayout = ({pins}: Props) => {
  return (
      <Masonry className="flex animated-slide-fwd" breakpointCols={breakPointObj}>
          {pins?.map((pin:any) => <Pin key={pin._id} pin={pin} className={"w-max"}/>)}
      </Masonry>
    )
}

export default MasonryLayout