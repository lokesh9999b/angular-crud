import { Worker } from "bullmq";
import IORedis from 'ioredis';
import GithubPush from "../models/GithubPush";
import dotenv from 'dotenv';
dotenv.config();

const connection = new IORedis(process.env.REDIS_URL as string, {
    maxRetriesPerRequest: null
});

const githubWorker = new Worker('github-events', async (job)=>{
    console.log(`[Worker] processing job ${job.id}: Saving Webhook data...`);
    try{
        const payload =  job.data;
        const repoName = payload.repository?.name || 'Unknown';
        const pusherName = payload.pusher?.name || 'Unknown';
        const branch = payload.ref || 'Unknown';

        const commits = payload.commits || [];

        const newPush = new GithubPush({
            repoName,
            pusherName,
            branch,
            commits,
            
        });

        await newPush.save();
        console.log(`[Worker] ✅ Saved push data from ${repoName} (${branch})`);
        // return { status: 'success', saved: true, repo: repoName };
    }
    catch (error){
        console.error(`[Worker] Error processing job ${job.id}`, error);
        throw error;
    }

}, {connection: connection as any});


githubWorker.on('completed', job=> console.log(`[Worker] job ${job.id} has completed`));

githubWorker.on('failed', (job, error)=>console.log(`[Worker] job ${job?.id} has failed`, error));