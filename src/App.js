import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import MovieContext from './context'
import Navbar from './components/Navbar'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails'
import './App.css'

const apiKey = '8e06129ef379a9b72a3cd352f4369258'

// write your code here
class App extends Component {
  state = {searchQuery: '', searchData: []}

  changeValue = text => {
    this.setState({searchQuery: text.target.value})
  }

  checkData = async () => {
    const {searchQuery} = this.state
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      console.log(data)
      const arr = data.results.map(eachValue => ({
        id: eachValue.id,
        name: eachValue.original_title,
        overview: eachValue.overview,
        posterPath: eachValue.poster_path,
        rating: eachValue.vote_average,
      }))

      this.setState({searchData: arr, searchQuery: ''})
    }
  }

  render() {
    const {searchQuery, searchData} = this.state
    return (
      <>
        <MovieContext.Provider
          value={{
            searchQuery,
            searchData,
            changeValue: this.changeValue,
            checkData: this.checkData,
          }}
        >
          <Navbar />
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/movie/:id" component={MovieDetails} />
          </Switch>
        </MovieContext.Provider>
      </>
    )
  }
}

export default App
