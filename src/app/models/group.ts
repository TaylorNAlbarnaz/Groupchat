import { Message } from "./message";
import { User } from "./user";

export class Group {
    Id?: number;
    Name = "";
    Password?: string;
    AdminId: User | null = null;

    Participants: User[] = [];
    Messages: Message[] = [];
}