'use server'
import { client } from "@/src/services/redis-service"
import { redirect } from 'next/navigation'


export async function getRedis(KEY) {
    const result = await client.hGetAll(KEY)
    console.log(`myhash has key:value pairs ${JSON.stringify(result)}`);
  }