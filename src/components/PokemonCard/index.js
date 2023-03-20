import {Link} from 'react-router-dom'

import './index.css'

const PokemonCard = props => {
  const {pokemonData} = props
  const {name, imgUrl, id} = pokemonData

  return (
    <li className="pokemon-item">
      <Link to={`/pokemon/${id}`} className="link-item">
        <img src={imgUrl} alt="pokemon" className="thumbnail" />
        <h1 className="name">{name}</h1>
      </Link>
    </li>
  )
}
export default PokemonCard
