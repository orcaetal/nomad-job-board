const axios = require('axios');
const fs = require('fs');
var jobList = JSON.parse(fs.readFileSync('./jobsList.txt'));


const addJob = (jobObject) => {
    //make a post request to create a new job
    axios.post('http://localhost:8000/api', {
        datePosted: jobObject.datePosted,
        region: jobObject.region,
        city: jobObject.city,
        jobTitle: jobObject.jobTitle,
        jobDesc: jobObject.jobDesc,
        link: jobObject.link
        })
        .then(res=>{
            console.log(res);
            console.log(res.data);
            }
        )
        .catch(err=>{
            console.log(err.response)
        })  
}

jobList.forEach(element => {
    addJob(element);
});