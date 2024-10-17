require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/database');
const authController = require('./controllers/authController');
const projectController = require('./controllers/projectController');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));
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

// Middleware para verificar se o usuário está logado e passar essa informação para as views
app.use((req, res, next) => {
    res.locals.user = req.session.userId ? true : false;
    next();
});

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

app.get('/projects', projectController.getProjects);
app.get('/projects/create', (req, res) => res.render('projects/create'));
app.post('/projects', projectController.createProject);
app.get('/projects/:id', projectController.getProjectById);

sequelize.sync().then(() => app.listen(3000, () => console.log('Server running on port 3000')));
