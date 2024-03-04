require('dotenv').config()

export const database = {
  client: process.env.DB_CLIENT || 'postgres',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE as string,
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    port: process.env.DB_PORT || undefined,
    socketPath: process.env.DB_SOCKET,
  }
}

export const firebaseConfig = {

}