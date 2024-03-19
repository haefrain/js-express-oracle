import bcrypt from "bcryptjs"
import {
    executeRawQuery,
} from '../utils/database.js'

export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await executeRawQuery(`SELECT * FROM users WHERE user_name = '${username}'`)
    const isPasswordValid = await bcrypt.compare(
        `${password}`,
        user[0][2]
    );

    if (isPasswordValid) {
        req.session.user = username;
        res.send('Login exitoso', 200);
    } else {
        res.send('Usuario o contraseña no validos.', 401)
    }
}
export const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            res.send('Error al cerrar sesión');
        } else {
            res.send('Sesión cerrada correctamente', 200);
        }
    });
}