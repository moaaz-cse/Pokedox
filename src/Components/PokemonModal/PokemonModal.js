import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import "../../Components/common/common.css";
import "./PokemonFilter.css";
import "./PokemonModal.css";
import "./PokemonDetails.css";

let eggGroupeNames = [];
let pokemonGenderNames = [];
let weakAgainstPower = [];
let pokemonID = [];
// let pokemonDiscription = [];
const Card = ({ pokemon, loading }) => {
  const [genderType, setPokemonGender] = useState(
    "https://pokeapi.co/api/v2/gender/"
  );
  const [eggGroups, setPokemonEggGroupe] = useState(
    "https://pokeapi.co/api/v2/egg-group/"
  );
  const [weakAgainst, setWeakAgainst] = useState(
    "https://pokeapi.co/api/v2/type/"
  );
  // const [aboutPokemon, setAboutPokemon] = useState(
  //   "https://pokeapi.co/api/v2/pokemon-species/"
  // );
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonHeight, setPokemonHeight] = useState("");
  const [pokemonWeight, setPokemonWeight] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokemonStatsList, setpokemonStatsList] = useState([]);
  const [pokemonImg, setPokemonImg] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [cardColor, setPokemonColor] = useState("");

  const [pokemonId, setPokemonId] = useState("");

  const openPokemonInfo = async (res) => {
    let pokemonAbilities = [];
    let pokemonTypes = [];
    let pokemonStatsList = [];

    const allAblilities = (res) => {
      for (
        let abilityNumber = 0;
        abilityNumber < res.abilities.length;
        abilityNumber++
      ) {
        pokemonAbilities.push(res.abilities[abilityNumber].ability.name + " ");
      }
    };
    allAblilities(res);

    const pokemonType = (res) => {
      for (let typeNumber = 0; typeNumber < res.types.length; typeNumber++) {
        pokemonTypes.push(res.types[typeNumber].type.name + " ");
      }
    };
    pokemonType(res);

    const pokemonStats = (res) => {
      for (let statsValue = 0; statsValue < res.stats.length; statsValue++) {
        pokemonStatsList.push(
          res.stats[statsValue].stat.name +
            " " +
            res.stats[statsValue].base_stat +
            " "
        );
      }
    };

    pokemonStats(res);

    setPokemonColor(() => {});

    setPokemonAbilities(pokemonAbilities);
    setPokemonTypes(pokemonTypes);
    setpokemonStatsList(pokemonStatsList);
    setPokemonName(res.name);
    setPokemonHeight(res.height);
    setPokemonWeight(res.weight);
    setPokemonImg(res.sprites.other.dream_world.front_default);

    setPokemonId(pokemonID[res.id - 1]);
    setPokemonGender(pokemonGenderNames[res.id]);
    setPokemonEggGroupe(eggGroupeNames[res.id]);
    setWeakAgainst(weakAgainstPower[res.id]);
    handleShow();
  };

  useEffect(() => {
    let genderUrlList = [];
    let eggGroupeList = [];
    let weakAgainstUrl = [];
    pokemon.map((index) => {
      genderUrlList.push(genderType + index.id);
      eggGroupeList.push(eggGroups + index.id);
      weakAgainstUrl.push(weakAgainst + index.id);
      pokemonID.push(index.id);
      // pokemonDiscription.push(aboutPokemon + index.id);
    });

    const mapData = (arg1, arg2) => {
      arg1.map((url) => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            arg2.push(data.name);
          });
      });
    };
    mapData(genderUrlList, pokemonGenderNames);
    mapData(eggGroupeList, eggGroupeNames);
    mapData(weakAgainstUrl, weakAgainstPower);

    // pokemonDiscription.map((url) => {
    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("116 text data", data.flavor_text_entries);
    //       aboutPokemon.push(data.flavor_text_entries.flavor_text);
    //       console.log('aboutPokemon',aboutPokemon);
    //     })
    //     .catch((err) => ("Error occur", err));
    // });
  });
  // pokemonStatsList = pokemonStatsList.mP.toUpperCase();
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="pokemon-content">
          <section className="text-image">
            <div className={pokemonTypes + "pokemon-card"}>
              <img
                src={pokemonImg}
                class="pokemon-image"
                alt={pokemonName}
              ></img>
            </div>
            <Modal.Header>
              <Modal.Title className="pokedex-logo">{pokemonName}</Modal.Title>
              <div className="header-seperator"></div>
              <div className="header-text">{pokemonId}</div>
              <div className="header-seperator"></div>
              <div>
                {" "}
                <span className="close-icon" onClick={handleClose} />
              </div>
            </Modal.Header>
            {/* <p>about:{aboutPokemon}</p> */}
          </section>
          <div className="modal-stats">
            <label>
              Height <span>{pokemonHeight}</span>
            </label>
            <label>
              Weight <span>{pokemonWeight}</span>
            </label>
            <label>
              Gender(s) <span>{genderType}</span>
            </label>
            <label>
              Egg Group <span>{eggGroups}</span>
            </label>
            <label>Abilities<span>{pokemonAbilities}</span></label>
            <label>
              Type<span className={pokemonTypes}>{pokemonTypes}</span>
            </label>
            <label>
              weak against <span className={weakAgainst}>{weakAgainst}</span>
            </label>
          </div>
          <div className="stats-container">
            <div className="graph-stats">Stats</div>
            <div className="graph-stats--data">
              {pokemonStatsList.map((items) => {
                const widthValue = items.match(/\d+/) + "%";
                const statsColor = "#2E3156";
                console.log("string value", widthValue.toString());
                let statsValue = (
                  <span
                    value={items.match(/\d+/)}
                    className="data-list"
                    style={{
                      width: widthValue,
                      background: statsColor,
                    }}
                  >
                    {items.toUpperCase()}
                  </span>
                );
                return statsValue;
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <section className="filter-section">
        <div className="input-field">
          <label for="searchInput">Search by</label>
          <input
            id="searchInput"
            className="search-input"
            placeholder="Name or Number"
            type="text/number"
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          ></input>
          <span className="search-icon" />
        </div>
      </section>

      <div className="card-list">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          pokemon
            .filter((item) => {
              // console.log("TYPE", item);
              if (searchInput == "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return item;
              } else if (item.id == searchInput) {
                return item;
              }
            })
            .map((item) => {
              const style = ` pokemon-card ${pokemonTypes}`;

              return (
                <div
                  className={style}
                  key={item.id}
                  onClick={() => openPokemonInfo(item)}
                >
                  <img
                    src={item.sprites?.other?.dream_world?.front_default}
                    alt={item.name}
                    className="pokemon-image"
                  />
                  <span className="pokemon-name">{item.name}</span>
                  <span className="pokemon-name pokemon-id">{item.id}</span>
                </div>
              );
            })
        )}
      </div>
    </>
  );
};

export default Card;
