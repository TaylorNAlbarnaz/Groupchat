import { User } from "./user";

export class Message {
    id: number;
    user: User | null;
    content: string;
}