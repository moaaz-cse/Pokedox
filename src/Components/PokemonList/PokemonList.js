import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../PokemonModal/PokemonModal";

import "./PokemonList.css";

const PokemonList = () => {
  const [pokemonList, setpokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  const pokeFunc = async () => {
    const res = await axios.get(url);
    getPokemonData(res.data.results);
    setLoading(false);
  };

  const getPokemonData = async (res) => {
    let state = [];
    res.map(async (item) => {
      const result = await axios.get(item.url);
      state.push(result.data);
      state.sort((a, b) => (a.id > b.id ? 1 : -1));
      // console.log("sate", state);
      setpokemonList(state);
    });
  };

  useEffect(() => {
    pokeFunc();
  }, [url]);

  return (
    <>
      <div className="">
        <Card pokemon={pokemonList} loading={loading}></Card>
      </div>
    </>
  );
};

export default PokemonList;
