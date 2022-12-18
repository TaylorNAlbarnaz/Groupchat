import { User } from "./user";

export class Message {
    id?: number;
    owner: User | null = null;
    content: string = "";
}