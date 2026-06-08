import mongoose, {Schema, Document} from 'mongoose';

export interface IGithubPush extends Document {
    repoName: string;
    pusherName: string;
    branch: string;
    commit: [];
    receivedAt: Date;
}

const githubPushSchema: Schema = new Schema({
    repoName: {type: String, required: true},
    pusherName: {type: String, required: true},
    branch: {type: String, required: true},
    commit: {type: Array, default: []},
    receivedAt: {type: Date, default: Date.now}
});

export default mongoose.model<IGithubPush>('GithubPush', githubPushSchema);