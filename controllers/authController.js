const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar novo usuário
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.send('Erro ao registrar o usuário');
    }
};

// Realizar login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.send('Usuário não encontrado');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.send('Senha incorreta');
        }

        // Armazenar o ID do usuário na sessão
        req.session.userId = user.id;

        // Redirecionar para a página de projetos após login
        res.redirect('/projects');
    } catch (error) {
        console.error(error);
        res.send('Erro ao realizar o login');
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy(); // Remove a sessão
    res.clearCookie('token');
    res.redirect('/login');
};
