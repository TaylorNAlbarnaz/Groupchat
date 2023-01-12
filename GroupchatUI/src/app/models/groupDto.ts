import { GroupUser } from "./groupUser";
import { MessageDto } from "./messageDto";

export class GroupDto {
    name: string;
    adminId: number;
    groupUsers: GroupUser[];
    messages: MessageDto[];
}