import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PokemonList from './Components/PokemonList/PokemonList';
import Header from './Components/Header/Header';
function App() {
  return (
    <>
      <Header/>
      <PokemonList/>
    </>
  );
}

export default App;
