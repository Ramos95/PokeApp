import {filterLanguageDescription} from '../utils';

const headers = new Headers({'content-type': 'application/json'});
const BASEURL = 'https://pokeapi.co/api/v2/';

export const getRegions = async () => {
  try {
    let response = await fetch(BASEURL + 'region/', {method: 'GET', headers});
    let data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

export const getPokemonsByRegion = async regionUrl => {
  try {
    let pokedex = await getRegionPokedex(regionUrl);
    let entries = pokedex.pokemon_entries;
    let pokemonUrls = entries.map(
      ({pokemon_species}) => `${BASEURL}pokemon/${pokemon_species.name}`,
    );
    /*mapping the pokemon url as fetch elements to pass as parameter*/
    let response = await Promise.all(
      pokemonUrls.map(url =>
        fetch(url)
          .then(response => response.json())
          .then(json => json),
      ),
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getRegionPokedex = async regionurl => {
  try {
    let response = await fetch(regionurl, {
      method: 'GET',
      headers,
    });
    let region = await response.json();
    let pokedex = await getPokedexEntries(region.pokedexes[0].url);
    return pokedex;
  } catch (err) {
    return false;
  }
};

export const getPokedexEntries = async pokedexUrl => {
  try {
    let response = await fetch(pokedexUrl, {
      method: 'GET',
      headers,
    });
    let data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

export const getPokemonDescription = async speciesUrl => {
  try {
    let response = await Promise.all(
      speciesUrl.map(url =>
        fetch(url)
          .then(response => response.json())
          .then(json => json),
      ),
    );
    let descriptions = response.map(({flavor_text_entries}) => ({
      description: filterLanguageDescription(flavor_text_entries).flavor_text,
    }));
    return descriptions;
  } catch (error) {
    console.log(error);
  }
};
