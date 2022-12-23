import { Message } from "./message";
import { User } from "./user";
import { GroupUser } from "./groupUser";

export class Group {
    id: number = 0;
    name = "";
    password?: string;
    adminId: number = 0;
    admin: User | null = null;

    groupUsers: GroupUser[] = [];
    messages: Message[] = [];
}