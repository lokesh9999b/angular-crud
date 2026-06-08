import {Router, Request, Response} from 'express';
import { githubQueue } from '../queues/github.queue';

const router = Router();

router.post('/github', async (req:Request, res:Response)=>{

    const event = req.headers['x-github-event'];

    if (event ==='push')
    {
        const payload = req.body;
        console.log('Received push event, adding to background queue...');

        await githubQueue.add('process-push', payload);
        
    }
    else if (event === 'ping'){
        console.log('Ping event received');
    }
    else{
        console.log(`Unhandled event: ${event}`);
    }

    res.status(200).send('Webhook received');
    
});

export default router;
