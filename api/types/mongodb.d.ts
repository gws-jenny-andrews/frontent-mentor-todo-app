import mongoose  from 'mongoose'
const {Mongoose} = mongoose

declare global {
  var _mongoClientPromise: Promise<Mongoose>
}
