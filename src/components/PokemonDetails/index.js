/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PokemonDetails extends Component {
  state = {
    pokemonData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPokemonData()
  }

  getPokemonData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(match)
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const imgUrlId = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      const updatedData = {
        name: fetchedData.name,
        imgUrl: imgUrlId,
        height: fetchedData.height,
        weight: fetchedData.weight,
        ability: fetchedData.abilities[0]?.ability?.name,
        move: fetchedData.moves[0]?.move?.name,
      }
      this.setState({
        pokemonData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="pokemon-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="pokemon-details-error-view-container">
      <h1 className="pokemon-not-found-heading">Pokemon Not Found</h1>
      <Link to="/">
        <button type="button" className="button">
          Continue
        </button>
      </Link>
    </div>
  )

  renderPokemonDetailsView = () => {
    const {pokemonData} = this.state

    const {name, height, weight, ability, move, imgUrl} = pokemonData
    return (
      <div className="pokemon-details-success-view">
        <div className="pokemon-details-container">
          <img src={imgUrl} alt="pokemon" className="pokemon-image" />
          <div className="pokemon">
            <p className="name">Name : {name}</p>
            <p className="height">Height : {height}</p>
            <p className="weight">Weight : {weight}</p>
            <p className="ability">Ability : {ability}</p>
            <p className="move">Move : {move}</p>
          </div>
        </div>
      </div>
    )
  }

  renderPokemonDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPokemonDetailsView()
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
      <>
        <div className="product-item-details-container">
          {this.renderPokemonDetails()}
        </div>
        <Link to="/" className="link">
          <button className="back-button" type="button">
            Back
          </button>
        </Link>
      </>
    )
  }
}

export default PokemonDetails
