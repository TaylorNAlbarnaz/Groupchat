import { Message } from "./message";
import { User } from "./user";
import { GroupUser } from "./groupUser";

export class Group {
    id = 0;
    name = "";
    password?: string;
    adminId = 0;
    admin: User | null = null;

    groupUsers: GroupUser[] = [];
    messages: Message[] = [];
}