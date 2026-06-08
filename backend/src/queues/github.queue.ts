import {Queue} from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection = new IORedis(process.env.REDIS_URL as string, {
    maxRetriesPerRequest: null
});

export const githubQueue = new Queue('github-events', { connection: connection as any });


