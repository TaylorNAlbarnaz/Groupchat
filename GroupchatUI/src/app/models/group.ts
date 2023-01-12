import { Message } from "./message";
import { User } from "./user";
import { GroupUser } from "./groupUser";

export class Group {
    id: number;
    name: string;
    password?: string;
    adminId: number;
    admin: User | null;

    groupUsers: GroupUser[];
    messages: Message[];
}