import { Group } from "./group";
import { User } from "./user";

export class GroupUser {
    group: Group = new Group();
    groupId: number = 0;
    user: User = new User();
    userId: number = 0;
}