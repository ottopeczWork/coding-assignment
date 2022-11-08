import { getCharacters, Character } from './getCharacters'

const BUCKET = 'build-circle'
const KEY = 'characters.json'

export async function battle(heroName: string, villainName: string): Promise<Character> {
  const characters = await getCharacters(BUCKET, KEY)

  const hero = characters.items.find(e => e.name === heroName)
  const villain = characters.items.find(e => e.name === villainName)

  if (!hero || !villain) {
    throw new Error("Either the hero or the villain disappeared!")
  }

  if (hero.weakness && hero.weakness === villainName) {
    hero.score -= 1;
  }

  return hero.score >= villain.score ? hero : villain
}
