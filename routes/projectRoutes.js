const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { isAuthenticated } = require('../middleware/auth'); // Middleware de autenticação

// Aplique o middleware `isAuthenticated` à rota de projetos
router.get('/projects', isAuthenticated, projectController.getProjects);

// Outras rotas relacionadas a projetos (se houver)
router.get('/projects/:id', isAuthenticated, projectController.getProjectById); // Exemplo para visualizar um projeto por ID


// Rota para criar um novo projeto (exibe o formulário)
router.get('/projects/create', (req, res) => {
    res.render('projects/create');  // Renderiza a página de criação
});

// Rota para salvar o novo projeto
router.post('/projects', projectController.createProject);


module.exports = router;
