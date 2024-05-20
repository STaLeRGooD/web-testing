'use server'

import { client } from "@/src/services/redis-service"
import { redirect } from 'next/navigation'
import { getRedis } from "../actions/redis_get"

export async function addRedis(KEY, user_data) {
  const ipv4 = user_data.ipv4
  const mac = user_data.mac
  await client.hSet(`task_list:${KEY}`, {
    ipv4,
    mac
  })
  await client.lPush(`task_list`,KEY )
  getRedis(KEY)
}
