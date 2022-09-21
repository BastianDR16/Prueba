import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [pokemon, setPokemon] = useState("charizard");
  const [dataPokemon, setDataPokemon] = useState([]);
  const [pokeId, setPokeID] = useState('132');
  const [statsPoke, setStats] = useState([]);
  const [estado, setEstado] = useState(true);


  useEffect(() => {
    searchPokemon()
  }, []);


  const searchPokemon = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((ans) => ans.json())
      .then((res) => {
        setPokeID(res.id);
        return setStats(res.stats);
      });

  };

  const PokemonHeaderList = (props) => {
    return (
      <tr>{props.rows.map(row => (
        <th key={row.stat.name}>{row.stat.name}</th>
      ))}
      </tr>

    );
  };

  const PokemonList = (props) => {
    return (
      <tr>
        {props.rows.map(row => (
          <td key={row.stat.name}>{row.base_stat}</td>
        ))}
      </tr>
    );
  };

  const cambiar = () => {

    if (estado) {
      const variable = statsPoke.sort(function (a, b) { return a.base_stat - b.base_stat })
      setStats([...variable])
      setEstado(false)
    }
    else {
      const variable = statsPoke.sort(function (a, b) { return b.base_stat - a.base_stat })
      setStats([...variable])
      setEstado(true)
    }


  };


  const DetailPokemon = (data) => {
    return (
      <div>
        <h2> {pokemon} </h2>
        <h5> {dataPokemon.base_experience} </h5>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}></img>

        <table style={{ width: "100%" }}>
          <thead>
            <PokemonHeaderList rows={statsPoke} />
          </thead>
          <tbody>
            <PokemonList rows={statsPoke} />
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Api poke</h1>
      <form style={{ marginBottom: 30 }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={(e) => setPokemon(e.target.value)}
          />
        </label>
        <input type="button" value="buscar" onClick={() => searchPokemon()} />
      </form>

      <DetailPokemon />

      <input type="button" value="valor" onClick={() => cambiar()} />
    </div>
  );
}
