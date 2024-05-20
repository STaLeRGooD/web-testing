
import { client } from "@/src/services/redis-service"
const Queue = require('bull');
const queue = new Queue("task_queue", {redis: {port: 6379, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD}});

export const main = async (user_id: string, ipv4: string, mac: string) => {
  await queue.add({ user_id: user_id, ipv4: ipv4, mac: mac });
};
queue.process((job, done) => {
    console.log(1234);
  console.log(job.data);
  done();
});

