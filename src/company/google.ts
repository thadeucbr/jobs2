import { sendMessage, sendMessageError, sendMessageNewJobsHeader, sendMessageNoNewJobs } from '../helpers/sendMessageToGroup';
import { saveUrl, validateIfUrlExists } from '../localDatabase/localDatabase';
import { GoogleJob, GoogleJobs } from '../type/google.type';
import { Job } from '../type/job.type';

async function getJobPosition(): Promise<GoogleJob[] | []> {
  const response = await fetch(
    `https://careers.google.com/api/v3/search/?employment_type=FULL_TIME&location=Brazil&skills=Developer`
  );

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  const data = (await response.json()) as GoogleJobs;
  return data.jobs;
}

async function filterJobs(): Promise<Job[] | []> {
  const jobs = await getJobPosition();

  const formattedJobs = jobs
    .map((job) => {
      if (validateIfUrlExists(job.apply_url) === false) {
        const location = JSON.stringify(job.locations.map((local) => local.city))
        return {
          company: 'Google',
          title: `${job.title} - ${job.target_level}`,
          location,
          url: job.apply_url,
        };
      }
    })
    .filter((job): job is Job => job !== undefined);

  return formattedJobs;
}

async function processGoogleJobs(): Promise<void> {
  try {
    const jobs = await filterJobs();
    if (jobs.length > 0) {
      sendMessageNewJobsHeader('Google')
      jobs.forEach((job) => saveUrl(job.url));
      await sendMessage(jobs)
      return
    }
    sendMessageNoNewJobs('Google')
  } catch (error) {
    sendMessageError('Google', (error as Error).message)
  }
}

export { processGoogleJobs };
