import {Link, withRouter} from 'react-router-dom'
import MovieContext from '../../context'
import './index.css'

const Navbar = props => (
  <MovieContext.Consumer>
    {value => {
      const {searchQuery, changeValue, checkData} = value

      const changeText = text => {
        changeValue(text)
      }

      const searchData = () => {
        checkData()
        const {history} = props
        history.push('/search')
      }

      return (
        <div className="nav-container">
          <div>
            <h1 className="name-el">movieDB</h1>
          </div>
          <div className="link-container">
            <h1>
              <Link to="/">Popular</Link>
            </h1>
            <Link to="/top-rated">Top Rated</Link>
            <Link to="/upcoming">Upcoming</Link>
          </div>
          <>
            <div className="input-container">
              <input type="text" value={searchQuery} onChange={changeText} />
              <button type="button" className="btn-el" onClick={searchData}>
                Search
              </button>
            </div>
          </>
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default withRouter(Navbar)
