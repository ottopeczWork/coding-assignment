import { awsS3Client } from './singletons'
import { getCharacters } from './getCharacters'

const mockedAWSS3Client = awsS3Client as jest.Mocked<typeof awsS3Client>;

jest.mock('./singletons')

describe('THE getCharacters function', () => {
  describe('WHEN awsS3Client.getJSONData method throws', () => {
    beforeEach(() => {
      mockedAWSS3Client.getJSONData.mockRejectedValueOnce(new Error('Error to proxy'))
    })

    it('SHOULD proxy the error', () => {
      expect(getCharacters('BUCKET', 'KEY')).rejects.toThrow(new Error('Error to proxy'))
    })
  })

  describe('WHEN awsS3Client.getJSONData method passes', () => {
    beforeEach(() => {
      mockedAWSS3Client.getJSONData.mockResolvedValueOnce({ items: [ { foo: 'bar' }] })
    })

    it('SHOULD proxy the error', () => {
      expect(getCharacters('BUCKET', 'KEY')).resolves.toStrictEqual({ items: [ { foo: 'bar' }] })
    })
  })
})
