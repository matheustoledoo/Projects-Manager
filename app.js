require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/database');
const authController = require('./controllers/authController');
const projectController = require('./controllers/projectController');
const Handlebars = require('handlebars');
const moment = require('moment'); // Para formatação e comparação de datas
const cookieParser = require('cookie-parser');

const app = express();

// Configuração do body-parser para receber dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware para lidar com cookies

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));

// Configuração do Handlebars
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Helpers para manipulação de datas com Moment.js
Handlebars.registerHelper('isToday', function(date) {
    return moment(date).isSame(moment(), 'day');
});

Handlebars.registerHelper('isPast', function(date) {
    return moment(date).isBefore(moment(), 'day');
});

// Middleware para verificar se o usuário está logado e passar essa informação para as views
app.use((req, res, next) => {
    res.locals.user = req.session.userId ? true : false;
    next();
});

// Rotas de autenticação
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/projects');
    } else {
        res.redirect('/login');
    }
});
app.get('/register', (req, res) => res.render('auth/register'));
app.post('/register', authController.register);
app.get('/login', (req, res) => res.render('auth/login'));
app.post('/login', authController.login);
app.get('/logout', authController.logout);

// Rotas para projetos
app.get('/projects', projectController.getProjects);
app.get('/projects/create', (req, res) => res.render('projects/create'));
app.post('/projects', projectController.createProject);
app.get('/projects/:id', projectController.getProjectById);

// Sincronizar o Sequelize e rodar o servidor
sequelize.sync().then(() => app.listen(3000, () => console.log('Server running on port 3000')));
