import {Component} from 'react'

import './index.css'

const apiKey = '8e06129ef379a9b72a3cd352f4369258'

class MovieDetails extends Component {
  state = {movieData: [], castData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const casturl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en`
    const response = await fetch(url)
    const data = Array(await response.json())

    const castResponse = await fetch(casturl)
    const castData = Array(await castResponse.json())

    if (response.ok === true && castResponse.ok === true) {
      const movieArr = data.map(eachValue => ({
        id: eachValue.id,
        name: eachValue.original_title,
        image: eachValue.poster_path,
        rating: eachValue.vote_average,
        duration: eachValue.runtime,
        genre: eachValue.genres,
        releaseDate: eachValue.release_date,
        overview: eachValue.overview,
      }))

      const castArr = castData[0].cast.map(eachValue => ({
        id: eachValue.id,
        name: eachValue.original_name,
        character: eachValue.character,
        profilePath: eachValue.profile_path,
      }))

      this.setState({movieData: movieArr, castData: castArr})
    }
  }

  render() {
    const {movieData, castData} = this.state

    return (
      <div className="main-container">
        <ul className="movie-list-container">
          {movieData.map(eachValue => (
            <li key={eachValue.id} className="list-element">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${eachValue.image}`}
                  alt={eachValue.name}
                  className="movie-img-el"
                />
              </div>
              <div className="movie-details-container">
                <h1>{eachValue.name}</h1>
                <p>{eachValue.rating}</p>
                <p>{eachValue.overview}</p>
                <p>Runtime: {eachValue.duration}</p>
                <p>
                  Genre:{' '}
                  {eachValue.genre.map(value => (
                    <span>{value.name}, </span>
                  ))}
                </p>
                <p>Release Date: {eachValue.releaseDate}</p>
              </div>
            </li>
          ))}
        </ul>
        <h1 className="inner-heading">Cast</h1>
        <ul className="cast-container">
          {castData.map(newValue => (
            <li key={newValue.id} className="cast-list">
              <img
                src={`https://image.tmdb.org/t/p/w500/${newValue.profilePath}`}
                alt={newValue.name}
                className="profile-img"
              />
              <p>{newValue.name}</p>
              <p>{newValue.character}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default MovieDetails
