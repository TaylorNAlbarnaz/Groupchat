export class CreateGroupDto {
    id: number;
    name: string;
    adminId: number;
    userIds: number[];
    messageIds: number[];
}