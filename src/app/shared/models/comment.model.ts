export interface IComment {
    id?: number,
    postId: number,
    userId: number,
    body: string,
    timestamp: number,
    updateTimestamp?: number,
    replyTo?: number,
    isDeleted?: boolean,
    isRoot?: boolean
}