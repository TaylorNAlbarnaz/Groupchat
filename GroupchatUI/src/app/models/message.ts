import { User } from "./user";

export class Message {
    id: number = 0;
    owner: User | null = null;
    content: string = "";
}