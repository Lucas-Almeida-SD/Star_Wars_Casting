import characterMapper from '../helpers/characterMapper';
import { CharacterList, CharacterResponse } from '../interfaces/Character.interface';
import { ErrorMessage } from '../interfaces/ErrorMessage.interface';

async function getPlanet(planetURL: string): Promise<string> {
  const response = await fetch(planetURL);
  const json = await response.json();
  const { name } = json;

  return name as string;
}

async function getSpecie(specieURL: string[]): Promise<string[]> {
  let name = 'desconhecido';

  if (specieURL.length) {
    const response = await fetch(specieURL[0]);
    const json = await response.json();
    name = json.name;
  }

  return [name];
}

async function getVehicles(vehiclesURL: string[]): Promise<string[]> {
  const responses = await Promise.all(
    vehiclesURL.map((url) => (
      fetch(url)
    )),
  );
  const jsons = await Promise.all(
    responses.map((response) => response.json()),
  );
  const vehicles = jsons.map((json) => json.name);
  return vehicles as string[];
}

export default async function getCharacters(page = 1): Promise<CharacterList | ErrorMessage> {
  try {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    const json = await response.json();
    let characterList = json.results as CharacterResponse[];

    const homeworldsList = await Promise.all(
      characterList.map(({ homeworld }) => getPlanet(homeworld)),
    );

    const speciesList = await Promise.all(
      characterList.map(({ species }) => getSpecie(species)),
    );

    const vehiclesList = await Promise.all(
      characterList.map(({ vehicles }) => getVehicles(vehicles)),
    );

    characterList = characterList.map((character, index) => (
      {
        ...character,
        homeworld: homeworldsList[index],
        species: speciesList[index],
        vehicles: vehiclesList[index],
      }
    )) as CharacterResponse[];

    return ({
      people: characterList.map((character) => characterMapper(character)),
      count: json.count,
    });
  } catch (err) {
    return { message: (err as Error).message };
  }
}
