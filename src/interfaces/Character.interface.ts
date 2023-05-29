export interface CharacterResponse {
  birth_year: string
  created: Date
  edited: Date
  eye_color: string
  films: string[]
  gender: string
  hair_color: string
  height: string
  homeworld: string
  mass: string
  name: string
  skin_color: string
  species: string[]
  starships: string[]
  url: string
  vehicles: string[]
}

export interface Character {
  name: string
  birth: string
  homeworld: string
  specie: string
  height: string
  vehicles: string[]
}
