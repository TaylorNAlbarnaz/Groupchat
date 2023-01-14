import { Group } from "./group";
import { GroupUser } from "./groupUser";
import { Login } from "./login";

export class User {
    id: number;
    username: string;
    login: Login;
    loginId: number;
    disabled: boolean;
    groupUsers: GroupUser[] | null;
    groups: Group[] | null;
}