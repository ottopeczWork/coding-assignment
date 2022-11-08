import { S3Client } from "@aws-sdk/client-s3";
import AWSS3Client from './AWSS3Client'

const MockedS3Client: jest.Mock = <jest.Mock<S3Client>>S3Client;

jest.mock('@aws-sdk/client-s3')

describe('THE AWSS3Client', () => {
  let awsS3Client: AWSS3Client

  beforeEach(() => {
    awsS3Client = new AWSS3Client('REGION')
  })

  describe('THE getJSONData function', () => {
    describe('WHEN the send method of the native client throws', () => {
      beforeEach(() => {
        MockedS3Client.prototype.send.mockImplementationOnce(() => { throw new Error('Native error') })
      })

      it('SHOULD proxy the error', () => {
        return expect(awsS3Client.getJSONData('BUCKET', 'KEY')).rejects.toThrow(new Error('Native error'))
      })
    })

    describe('WHEN the send method of the native client returns', () => {
      describe('AND the Body is not present', () => {
        const resp = {}

        beforeEach(() => {
          MockedS3Client.prototype.send.mockResolvedValueOnce(resp)
        })

        it('SHOULD throw', () => {
          return expect(awsS3Client.getJSONData('BUCKET', 'KEY')).rejects.toThrow(new Error('Body is undefined'))
        })
      })

      describe('AND the Body is present', () => {
        describe('AND the Body is not parsable', () => {
          const resp = { Body: { transformToString() { return 'unparsable' } }}

          beforeEach(() => {
            MockedS3Client.prototype.send.mockResolvedValueOnce(resp)
          })

          it('SHOULD throw', () => {
            return expect(awsS3Client.getJSONData('BUCKET', 'KEY')).rejects.toThrow(new Error('An error occurred parsing the JSON data: Unexpected token u in JSON at position 0'))
          })
        })
      })

      describe('AND the Body is parsable', () => {
        const resp = { Body: { transformToString() { return '{ "foo": "bar" }' } }}

        beforeEach(() => {
          MockedS3Client.prototype.send.mockResolvedValueOnce(resp)
        })

        it('SHOULD returned the parsed JSON data', () => {
          return expect(awsS3Client.getJSONData('BUCKET', 'KEY')).resolves.toStrictEqual({ "foo": "bar" })
        })
      })
    })
  })
})
