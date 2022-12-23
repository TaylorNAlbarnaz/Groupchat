import { Group } from "./group";

export class User {
    id: number = 0;
    username: string = "";
    password: string = "";
    groups: Group[] | null = null;
}