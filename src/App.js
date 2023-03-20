import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Pokemons from './components/Pokemons'
import PokemonDetails from './components/PokemonDetails'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Pokemons} />
        <Route exact path="/pokemon/:id" component={PokemonDetails} />
      </Switch>
    )
  }
}

export default App
