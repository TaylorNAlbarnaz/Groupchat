import { User } from "./user";

export class Message {
    Id?: number;
    Owner: User | null = null;
    Content: string = "";
}