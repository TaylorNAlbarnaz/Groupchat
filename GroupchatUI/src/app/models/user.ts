import { Group } from "./group";

export class User {
    id = 0;
    username = "";
    password = "";
    groups: Group[] | null = null;
}