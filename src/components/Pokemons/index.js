import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PokemonCard from '../PokemonCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Pokemons extends Component {
  state = {
    pokemonList: [],
    apiStatus: apiStatusConstants.initial,
    nextUrl: 'https://pokeapi.co/api/v2/pokemon/',
    prevUrl: '',
  }

  componentDidMount() {
    this.getPokemons()
  }

  getPokemons = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {nextUrl} = this.state
    const data = await fetch(nextUrl)
    console.log(data)
    if (data.ok) {
      const fetchedData = await data.json()

      const updatedData = fetchedData.results.map(pokemon => {
        const urlParts = pokemon.url.split('/')
        const id = urlParts[urlParts.length - 2]
        const imgUrlId = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        return {
          name: pokemon.name,
          imgUrl: imgUrlId,
          id: parseInt(id),
        }
      })
      console.log(updatedData)
      this.setState({
        pokemonList: updatedData,
        apiStatus: apiStatusConstants.success,
        nextUrl: fetchedData.next,
        prevUrl: fetchedData.previous,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  handlePrevClick = () => {
    const {prevUrl} = this.state
    this.getPokemons(prevUrl)
  }

  handleNextClick = () => {
    const {nextUrl} = this.state
    this.getPokemons(nextUrl)
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="pokemon-error-view-container">
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderPokemonListView = () => {
    const {pokemonList} = this.state
    const shouldShowPokemonList = pokemonList.length > 0

    return shouldShowPokemonList ? (
      <div className="all-pokemon-container">
        <ul className="pokemons-list">
          {pokemonList.map(pokemon => (
            <PokemonCard pokemonData={pokemon} key={pokemon.id} />
          ))}
        </ul>
        <div className="button-container">
          <button
            className="button"
            type="button"
            onClick={this.handlePrevClick}
          >
            Previous
          </button>

          <button
            type="button"
            className="button"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    ) : (
      <div className="no-pokemon-view">
        <h1 className="no-pokemon-heading">No Pokemons Found</h1>
        <p className="no-pokemons-description">
          We could not find any Pokemons.
        </p>
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPokemonListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="title">Pokemon List</h1>
        <div className="all-pokemons-section">{this.renderAllProducts()}</div>
      </div>
    )
  }
}

export default Pokemons
