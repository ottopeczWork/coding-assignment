export type Character = {
    name: string
    score: number
    type: string
}

export type CharactersResponse = {
    items: Character[]
}

export function getCharacters(): CharactersResponse {
  throw new Error("Not implemented")
}