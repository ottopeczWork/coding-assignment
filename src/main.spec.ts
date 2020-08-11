import { battle } from './main'
import { getCharacters } from './getCharacters'

jest.mock('./getCharacters')

const getCharactersMocked = getCharacters as jest.MockedFunction<typeof getCharacters>

it('battle should return the hero if they have a higher score', () => {
  getCharactersMocked.mockReturnValue({
    items: [
      { name: 'Winner', score: 9.0, type: 'hero' },
      { name: 'Loser', score: 8.0, type: 'villain' }
    ]})

  expect(battle('Winner', 'Loser')).toEqual({name: "Winner", score: 9.0, type: 'hero'})
})

