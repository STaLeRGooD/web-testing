'use server'
import { client } from "@/src/services/redis-service"
import { redirect } from 'next/navigation'
import { addRedis } from "../app/actions/redis_add"

export async function addUserData(data: { id: string; email: string; username: string; password: string; role: string; mac: string; ipv4: string }) {
    const ID = data.id
     const user_data ={
         ipv4: data.ipv4,
         mac: data.mac

     } 
    
    addRedis(ID, user_data)
  }