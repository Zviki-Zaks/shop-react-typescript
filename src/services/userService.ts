import { rejects } from "assert";
import { User } from "../models/user.model";

export const userService = {
    login,
    logout,
    signup,
    getLoggedin,
}

interface UserCart { username: string, password?: string }

const KEY = 'SHOP_USERS'
let loginUser: User | null = null

function login(userCard: UserCart): Promise<User> | void {
    try {
        const user = _load()?.find(user => user.username === userCard.username && user.password === userCard.password)
        delete user?.password
        if (user) {
            loginUser = user
            return new Promise((resolve, reject) => resolve(user))
            // return Promise.resolve(user)
        } else throw new Error()
    } catch (err) {
        throw new Error("Can`t login");
    }
}

function logout(userId: string) {
    loginUser = null
    return new Promise(resolve => resolve(userId))
}

function signup(userCard: UserCart): Promise<User> {
    const { username, password } = userCard
    const user: User = {
        id: _makeId(),
        username,
        password,
        isAdmin: false,
        lastActivity: []
    }
    const users: User[] = _load() || []
    users.push(user)
    _save(users)
    return new Promise((resolve, reject) => {
        delete user.password
        loginUser = user
        resolve(user)
    })
}

function getLoggedin() {
    return new Promise((resolve, reject) => {
        resolve(loginUser)
    })
}


function _save(products: User[]): void {
    localStorage.setItem(KEY, JSON.stringify(products))
}
function _load(): User[] | null {
    return JSON.parse(localStorage.getItem(KEY) || 'null')
}
function _makeId(length: number = 5): string {
    var txt = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}