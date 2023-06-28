import { Character, CharacterResponse } from '../interfaces/Character.interface';

export default function characterMapper(character: CharacterResponse): Character {
  return ({
    name: character.name,
    birth: character.birth_year,
    homeworld: character.homeworld,
    specie: character.species[0],
    height: character.height,
    vehicles: character.vehicles,
  });
}
