import { awsS3Client } from './singletons'

export type Character = {
    name: string
    score: number
    type: string
    weakness?: string
}

export type CharactersResponse = {
    items: Character[]
}

export function getCharacters(bucket: string, key: string): Promise<CharactersResponse> {
  return awsS3Client.getJSONData(bucket, key) as Promise<CharactersResponse>
}
