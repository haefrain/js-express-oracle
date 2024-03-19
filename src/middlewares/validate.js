const sessionChecker = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.json('El usuario no esta autenticado', 401);
    }
};
export default sessionChecker;