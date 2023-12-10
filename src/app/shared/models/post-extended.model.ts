import { IComment } from "./comment.model";
import { IUser } from "./user.model";

export interface IPostExtended {
    id?: number,
    title: string,
    body: string,
    bodyPreview: string,
    timestamp: number,
    userId: number,
    views: number,
    user: IUser,
    comments: IComment[]
}