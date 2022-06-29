import { Cart } from "./cart.model";

export interface User {
    id: string,
    username: string,
    password?: string
    lastCart?: Cart,
    isAdmin: boolean,
    lastActivity?: []
}