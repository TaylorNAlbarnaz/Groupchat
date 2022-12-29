import { User } from "./user";

export class Message {
    id = 0;
    owner: User | null = null;
    content = "";
}