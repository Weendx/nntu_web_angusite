export interface CurrentUser {
    id: number, isAdmin: boolean
}

export interface UpdatedPostData {
    title: string,
    body: string,
    bodyPreview: string
}