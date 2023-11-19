import linkedinApi from 'linkedin-jobs-api';
import { sendMessage, sendMessageError, sendMessageNewJobsHeader, sendMessageNoNewJobs } from '../helpers/sendMessageToGroup';
import { saveUrl, validateIfUrlExists } from '../localDatabase/localDatabase';

const queryOptions = {
  keyword: 'Nodejs',
  location: 'Brazil',
  dateSincePosted: '24hr',
  jobType: 'full time',
  remoteFilter: 'remote',
  salary: '3000',
  experienceLevel: 'entry level',
  limit: '30',
  sortBy: 'recent'
};

function linkedin () {
  linkedinApi.query(queryOptions).then((response) => {
    const formattedJobs = response
    .map((job) => {
      if (validateIfUrlExists(job.jobUrl) === false) {
        return {
          company: job.company,
          title: `${job.position}`,
          location: job.location,
          url: job.jobUrl,
        };
      }
    })
    .filter((job) => job !== undefined);

    if (formattedJobs.length > 0) {
      sendMessageNewJobsHeader('Linkedin')
      formattedJobs.forEach((job) => saveUrl(job.url));
      sendMessage(formattedJobs)
      return
    }
    sendMessageNoNewJobs('Linkedin')
  }).catch(err => sendMessageError('linkedin', err.message));
}

export default linkedin
