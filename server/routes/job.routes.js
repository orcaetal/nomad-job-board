const JobController = require("../controllers/job.controller");
const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/api/register", UserController.registerUser);
  app.post("/api/login", UserController.login);
  app.post("/api", JobController.createJob);
  app.get("/api/job", JobController.getAllJobs);
  app.get("/api/job/:id", JobController.getJob);
  app.put("/api/job/:id", JobController.updateJob);
  app.delete("/api/job/delete/:id", JobController.deleteJob);
  app.post("/api/save_job/:jobId", JobController.saveJob);
  app.delete("/api/unsave_job/:jobId", JobController.unSaveJob);
};
