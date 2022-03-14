import React from 'react'

interface Props {
    searchTerm: string,
    setSearchTerm:React.Dispatch<React.SetStateAction<string>>
}

const Search = ({searchTerm, setSearchTerm}: Props) => {
  return (
    <div>Search</div>
  )
}

export default Search