import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export default class AWSS3Client {
  private nativeClient: S3Client;

  constructor(region: string) {
    this.nativeClient = new S3Client({ region })
  }

  async getJSONData(bucket: string, key: string): Promise<{ items: Array<{ [key: string]: unknown }> }> {
    const command = new GetObjectCommand({Bucket: bucket, Key: key})
    const resp = await this.nativeClient.send(command)

    if (!resp.Body) {
      throw new Error('Body is undefined')
    }

    const charactersStr = await resp.Body.transformToString()

    let characters
    try {
      characters = JSON.parse(charactersStr)
    } catch (err) {
      throw new Error(`An error occurred parsing the JSON data: ${err.message}`)
    }

    return characters
  }
}
