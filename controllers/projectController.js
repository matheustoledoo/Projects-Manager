const Project = require('../models/Project');
const User = require('../models/User');

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.render('projects/list', { projects });
    } catch (error) {
        console.error(error);
        res.send('Erro ao carregar projetos');
    }
};

exports.createProject = async (req, res) => {
    try {
        await Project.create({
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

exports.getProjectById = async (req, res) => {
    const project = await Project.findByPk(req.params.id, { include: { model: User, as: 'creator' } });
    res.render('projects/detail', { project });
};
