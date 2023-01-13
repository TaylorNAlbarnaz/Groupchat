import { GroupUser } from "./groupUser";
import { Message } from "./message";

export class GroupDto {
    id: number;
    name: string;
    adminId: number;
    groupUsers: GroupUser[];
    messages: Message[];
}