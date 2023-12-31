export interface IPost {
    id?: number,
    title: string,
    body: string,
    bodyPreview: string,
    timestamp: number,
    userId: number,
    views: number
}

export interface IPostOptional extends Partial<IPost> {}