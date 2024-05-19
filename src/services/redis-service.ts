import { createClient } from 'redis';

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 6379

    }
})
  client.on('error', err => console.log('Redis Client Error', err))
if (!client.isOpen){
    client.connect()
    console.log('Redis connected!')
}
  
export {client};
