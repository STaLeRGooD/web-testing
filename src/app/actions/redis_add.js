'use server'

import { client } from "@/src/services/redis-service"
import { redirect } from 'next/navigation'
import { getRedis } from "../actions/redis_get"

export async function addRedis(KEY, user_data) {
  const ipv4 = user_data.ipv4
  const mac = user_data.mac
  await client.hSet(KEY, {
    ipv4,
    mac
  })
  console.log(KEY, {user_data});
  getRedis(KEY)
}
