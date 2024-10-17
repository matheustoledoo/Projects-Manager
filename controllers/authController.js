const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.redirect('/login');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id; // Define o userId na sessão
        res.redirect('/projects');
    } else {
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};
