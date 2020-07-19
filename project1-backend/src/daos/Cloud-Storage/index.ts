import {Storage} from '@google-cloud/storage'

export const bucketName = 'inna-connection-bucket'

export const bucketBaseUrl = `https://storage.googleapis.com/${bucketName}`

export const imageBucket = new Storage().bucket(bucketName)