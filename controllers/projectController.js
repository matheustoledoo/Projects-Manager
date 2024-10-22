const Project = require('../models/Project');
const moment = require('moment');

// Listar todos os projetos
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            order: [['createdAt', 'DESC']]
        });

        // Formatar as datas para dd/mm/yyyy
        projects.forEach(project => {
            project.formattedDeadline = moment(project.deadline).format('DD/MM/YYYY');
            project.formattedFieldExecutionDate = moment(project.fieldExecutionDate).format('DD/MM/YYYY');
            project.formattedProcessingExecutionDate = moment(project.processingExecutionDate).format('DD/MM/YYYY');
        });

        res.render('projects/list', { projects });
    } catch (error) {
        console.error(error);
        res.send('Erro ao carregar projetos');
    }
};

// Criar um novo projeto
exports.createProject = async (req, res) => {
    try {
        await Project.create({
            id: req.body.projectId, // Capturando o ID personalizado
            name: req.body.name,
            deadline: req.body.deadline,
            clientName: req.body.clientName,
            location: req.body.location,
            responsible: {
                name: req.body.responsible.name,
                phone: req.body.responsible.phone,
                email: req.body.responsible.email,
            },
            fieldExecutionDate: req.body.fieldExecutionDate,
            fieldExecutionTime: req.body.fieldExecutionTime,
            fieldTechnician: req.body.fieldTechnician,
            processingExecutionDate: req.body.processingExecutionDate,
            processingExecutionTime: req.body.processingExecutionTime,
            processingTechnician: req.body.processingTechnician,
            status: req.body.status,
            notes: req.body.notes
        });
        res.redirect('/projects');
    } catch (error) {
        console.error(error);
        res.send('Erro ao criar o projeto');
    }
};


// Exibir os detalhes de um projeto
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        res.render('projects/detail', { project });
    } catch (error) {
        console.error(error);
        res.send('Erro ao carregar o projeto');
    }
};
