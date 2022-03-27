const JobController = require('../controllers/job.controller');

module.exports = (app) => {
    app.post('/api', JobController.createJob);
    app.get('/api/job', JobController.getAllJobs);
    app.get('/api/job/:id', JobController.getJob);
    app.put('/api/job/:id', JobController.updateJob);
    app.delete('/api/job/delete/:id', JobController.deleteJob); 
}

