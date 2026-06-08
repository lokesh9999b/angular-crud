import {Router, Request, Response} from 'express';

const router = Router();

router.post('/github', (req:Request, res:Response)=>{

    const event = req.headers['x-github-event'];

    if (event ==='push')
    {
        const payload = req.body;
        const repoName = payload.repository?.name;
        const pusherName= payload.pusher?.name;
        const branch = payload.ref;
        const commit = payload.commit?.message;
        
        console.log(`Repo: ${repoName}`);
        console.log(`Pusher: ${pusherName}`);
        console.log(`Branch: ${branch}`);
        console.log(`Commit: ${commit}`);

        if (payload.commits && payload.commits.length >0)
        {
            console.log('Commits:');
            payload.commits.forEach((commit: any) => {
                console.log(`- ${commit.message} (by ${commit.author.name})`);
            });
        }
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
