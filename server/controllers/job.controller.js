const Job = require("../models/job.model");
const User = require("../models/user.model");

module.exports.createJob = (request, response) => {
  // Mongoose's "create" method is run using our Person model to add a new person to our db's person collection.
  // request.body will contain something like {firstName: "Billy", lastName: "Washington"} from the client
  Job.create(request.body) //This will use whatever the body of the client's request sends over
    .then((job) => response.json(job))
    .catch((err) => response.status(400).json(err));
};

module.exports.getAllJobs = (request, response) => {
  Job.find({})
    .then((job) => {
      //   console.log(job); //console logs are optional, but they are highly recommended for troubleshooting!
      response.json(job);
    })
    .catch((err) => {
      console.log(err);
      response.json(err);
    });
};

module.exports.getJob = (request, response) => {
  Job.findOne({ _id: request.params.id })
    .then((job) => response.json(job))
    .catch((err) => response.json(err));
};

module.exports.updateJob = (request, response) => {
  Job.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
    .then((updatedJob) => response.json(updatedJob))
    .catch((err) => response.json(err));
};

module.exports.deleteJob = (request, response) => {
  Job.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};

module.exports.saveJob = async (req, res) => {
  try {
    if (req.session.userId == null) {
      res.status(500).json({ message: "User must be logged in" });
      return;
    }
    const user = await User.findOne({ _id: req.session.userId });
    user.savedJobs.push(req.params);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports.unSaveJob = async (req, res) => {
  try {
    if (req.session.userId == null) {
      res.status(500).json({ message: "User must be logged in" });
      return;
    }
    const user = await User.findOne({ _id: req.session.userId });
    user.savedJobs = user.savedJobs.filter((job) => {
      return !job.equals(req.params.jobId);
    });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};
