import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './index.css'

const apiKey = '8e06129ef379a9b72a3cd352f4369258'

class TopRated extends Component {
  state = {movieData: [], pageNo: 1}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {pageNo} = this.state
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const arr = data.results.map(eachValue => ({
        id: eachValue.id,
        name: eachValue.title,
        overview: eachValue.overview,
        posterPath: eachValue.poster_path,
        rating: eachValue.vote_average,
      }))

      this.setState({movieData: arr})
    }
  }

  removePage = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        () => {
          this.getData()
        },
      )
    }
    return null
  }

  addPage = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      () => {
        this.getData()
      },
    )
  }

  sendValue = value => {
    const {history} = this.props
    history.push(`/movie/${value}`)
  }

  render() {
    const {movieData, pageNo} = this.state

    return (
      <div className="main-container">
        <h1 className="heading-el">Top Rated Movies</h1>
        <ul className="list-container">
          {movieData.map(eachValue => (
            <li key={eachValue.id} className="list-el">
              <img
                src={`https://image.tmdb.org/t/p/w500${eachValue.posterPath}`}
                alt={eachValue.name}
                className="img-el"
              />
              <h1 className="name-el">{eachValue.name}</h1>
              <p>{eachValue.rating}</p>
              <button
                type="submit"
                className="button-el"
                onClick={() => this.sendValue(eachValue.id)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
        <div className="pagination-container">
          <button type="submit" onClick={this.removePage} className="button-el">
            Prev
          </button>
          <p className="pagination-para">{pageNo}</p>
          <button type="submit" onClick={this.addPage} className="button-el">
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(TopRated)
