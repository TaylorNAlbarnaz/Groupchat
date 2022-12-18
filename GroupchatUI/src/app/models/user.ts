import { Group } from "./group";

export class User {
    id?: number;
    username: string = "";
    password: string = "";
    groups: Group[] | null = null;
}