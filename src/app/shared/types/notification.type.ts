import { Status } from "./status.type";

export interface Notification {
    message: string,
    status: Status,
    duration: number
}