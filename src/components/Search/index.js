import {withRouter} from 'react-router-dom'
import MovieContext from '../../context'

import './index.css'

const Search = props => (
  <MovieContext.Consumer>
    {value => {
      const {searchData} = value

      const sendValue = newvalue => {
        const {history} = props
        history.push(`/movie/${newvalue}`)
      }

      return (
        <div className="main-container">
          <h1 className="heading-el">Search Results</h1>
          <ul className="list-container">
            {searchData.map(eachValue => (
              <li key={eachValue.id} className="list-el">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${eachValue.posterPath}`}
                  alt={eachValue.name}
                  className="img-el"
                />
                <h1 className="name-el">{eachValue.name}</h1>
                <p>{eachValue.rating}</p>
                <button
                  type="submit"
                  className="button-el"
                  onClick={() => sendValue(eachValue.id)}
                >
                  View Button
                </button>
              </li>
            ))}
          </ul>
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default withRouter(Search)
