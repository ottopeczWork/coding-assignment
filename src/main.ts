import { getCharacters, Character } from './getCharacters'

export function battle(heroName: string, villainName: string): Character {
  const characters = getCharacters()

  const hero = characters.items.find(e => e.name === heroName)
  const villain = characters.items.find(e => e.name === villainName)

  return hero!.score >= villain!.score ? hero! : villain!
}