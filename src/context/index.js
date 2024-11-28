import React from 'react'

const MovieContext = React.createContext({
  searchQuery: 'home',
  changeValue: () => {},
})

export default MovieContext
