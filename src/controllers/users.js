import {
    executeRawQuery,
} from '../utils/database.js'
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
    const id = req.param('id')
    const user = await executeRawQuery(`SELECT * FROM users WHERE id = ${id}`)
    console.log("Getted user")
    return res.json(user)
}
export const createUser = async (req, res) => {
    const user = req.body
    const salt = await bcrypt.genSalt(4)
    const password = await bcrypt.hash(user.password, salt)
    const createdUser = await executeRawQuery(`INSERT INTO users (user_name, password) VALUES ('${user.username}', '${password}')`)
    console.log('User created')
    return res.json(createdUser)
}
export const updateUser = async (req, res) => {
    const id = req.param('id')
    const user = req.body
    const password = user.password
    const updatedUser = await executeRawQuery(`UPDATE users SET user_name=${user.username}, password=${password} WHERE id = ${id}`)
    console.log('User updated')
    return res.json(updatedUser)
}
export const deleteUser = async (req, res) => {
    const id = req.param('id')
    const deleteUser = await executeRawQuery(`DELETE FROM users WHERE id = ${id}`)
    console.log('User deleted')
    return res.json(deleteUser)
}