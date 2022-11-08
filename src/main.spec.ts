import { battle } from './main'
import { getCharacters } from './getCharacters'

jest.mock('./getCharacters')

const getCharactersMocked = getCharacters as jest.MockedFunction<typeof getCharacters>

describe('THE battle function', () => {
  describe('WHEN the hero is stronger ', () => {
    describe('AND they don\'t meet their nemesis ', () => {
      beforeEach(() => {
        getCharactersMocked.mockResolvedValueOnce({
          items: [
            { name: 'Winner', score: 9.0, type: 'hero' },
            { name: 'Loser', score: 8.0, type: 'villain' }
          ]})
      })

      it('SHOULD should return the hero as the winner', () => {
        return expect(battle('Winner', 'Loser')).resolves.toEqual({name: "Winner", score: 9.0, type: 'hero'})
      })
    })

    describe('AND they meet their nemesis so they get weakened ', () => {
      describe('AND they are still stronger than the villain ', () => {
        beforeEach(() => {
          getCharactersMocked.mockResolvedValueOnce({
            items: [
              { name: 'GoodGuy', score: 9.0, type: 'hero', weakness: "BadGuy"},
              { name: 'BadGuy', score: 7.5, type: 'villain' }
            ]})
        })

        it('SHOULD still return the hero as the winner', () => {
          return expect(battle('GoodGuy', 'BadGuy')).resolves.toEqual({
            name: "GoodGuy",
            score: 8,
            type: "hero",
            weakness: "BadGuy"
          })
        })
      })

      describe('AND they are now weaker than the villain ', () => {
        beforeEach(() => {
          getCharactersMocked.mockResolvedValueOnce({
            items: [
              { name: 'GoodGuy', score: 9.0, type: 'hero', weakness: "BadGuy"},
              { name: 'BadGuy', score: 8.5, type: 'villain' }
            ]})
        })

        it('SHOULD return the villain as the winner', () => {
          return expect(battle('GoodGuy', 'BadGuy')).resolves.toEqual({name: "BadGuy", score: 8.5, type: 'villain'})
        })
      })
    })
  });

  describe('WHEN the villain is stronger', () => {
    beforeEach(() => {
      getCharactersMocked.mockResolvedValueOnce({
        items: [
          { name: 'Loser', score: 0.0, type: 'hero' },
          { name: 'Winner', score: 9.0, type: 'villain' }
        ]})
    })

    it('SHOULD should return the villain as the winner', () => {
      return expect(battle('Loser', 'Winner')).resolves.toEqual({name: "Winner", score: 9.0, type: 'villain'})
    })
  });

  describe('WHEN they are equally strong', () => {
    beforeEach(() => {
      getCharactersMocked.mockResolvedValueOnce({
        items: [
          { name: 'Winner', score: 9.0, type: 'hero' },
          { name: 'Loser', score: 9.0, type: 'villain' }
        ]})
    })

    it('SHOULD should return the hero as the winner', () => {
      return expect(battle('Winner', 'Loser')).resolves.toEqual({name: "Winner", score: 9.0, type: 'hero'})
    })
  });

  describe('WHEN the hero can\'t be found', () => {
    beforeEach(() => {
      getCharactersMocked.mockResolvedValueOnce({
        items: [
          { name: 'Winner', score: 9.0, type: 'hero' },
          { name: 'Loser', score: 8.0, type: 'villain' }
        ]})
    })

    it('SHOULD throw', () => {
      expect(() => battle('Disappeared', 'Loser')).rejects.toThrow(new Error("Either the hero or the villain disappeared!"))
    })
  });

  describe('WHEN the villain can\'t be found', () => {
    beforeEach(() => {
      getCharactersMocked.mockResolvedValueOnce({
        items: [
          { name: 'Winner', score: 9.0, type: 'hero' },
          { name: 'Loser', score: 8.0, type: 'villain' }
        ]})
    })

    it('SHOULD throw', () => {
      return expect(() => battle('Winner', 'Disappeared')).rejects.toThrow(new Error("Either the hero or the villain disappeared!"))
    })
  });
});
