const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar novo usuário
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await User.create({
            username,
            email,
            password // Armazenar a senha sem hash (não recomendado para produção, apenas para testes)
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

        // Verificação simples da senha (não recomendado para produção)
        if (user.password !== password) {
            return res.send('Senha incorreta');
        }

        req.session.userId = user.id; // Salva o ID do usuário na sessão

        const token = jwt.sign({ userId: user.id }, 'seu_segredo_jwt');
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/projects'); // Redireciona para a página de projetos
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
