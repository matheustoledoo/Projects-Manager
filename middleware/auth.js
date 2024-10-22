// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token; // Lê o token do cookie

    if (!token) {
        return res.redirect('/login'); // Redireciona se não houver token
    }

    try {
        const decoded = jwt.verify(token, 'seu_segredo_jwt'); // Verifica o token
        req.userId = decoded.userId; // Armazena o ID do usuário na requisição
        next(); // Chama o próximo middleware
    } catch (error) {
        console.error(error);
        return res.redirect('/login'); // Redireciona se o token for inválido
    }
};
