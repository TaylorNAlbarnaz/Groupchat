import { Group } from "./group";

export class User {
    Id?: number;
    Username: string = "";
    Password: string = "";
    Groups: Group[] | null = null;
}