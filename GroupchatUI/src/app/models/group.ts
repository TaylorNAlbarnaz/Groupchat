import { Message } from "./message";
import { User } from "./user";

export class Group {
    id?: number;
    name = "";
    password?: string;
    admin: User | null = null;

    participants: User[] = [];
    messages: Message[] = [];
}