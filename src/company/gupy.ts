import { sendMessage, sendMessageError, sendMessageNewJobsHeader, sendMessageNoNewJobs } from '../helpers/sendMessageToGroup';
import { saveUrl, validateIfUrlExists } from '../localDatabase/localDatabase';
import { GupyJob, GupyJobs } from '../type/gupy.type';
import { Job } from '../type/job.type';

async function getJobPosition(): Promise<GupyJob[] | []> {
  const response = await fetch(
    `https://portal.api.gupy.io/api/job?name=Desenvolvedor&offset=0&limit=40`
  );

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  const data = (await response.json()) as GupyJobs;
  return data.data;
}

async function filterJobs(): Promise<Job[] | []> {
  const jobs = await getJobPosition();

  const formattedJobs = jobs
    .map((job) => {
      if (validateIfUrlExists(job.jobUrl) === false) {
        return {
          company: job.careerPageName,
          title: `${job.name}`,
          location: job.isRemoteWork ? 'Remoto': `${job.city} - ${job.state}`,
          url: job.jobUrl,
        };
      }
    })
    .filter((job): job is Job => job !== undefined);

  return formattedJobs;
}

async function processGupyJobs(): Promise<void> {
  try {
    const jobs = await filterJobs();
    if (jobs.length > 0) {
      sendMessageNewJobsHeader('Gupy')
      jobs.forEach((job) => saveUrl(job.url));
      await sendMessage(jobs)
      return
    }
    sendMessageNoNewJobs('Gupy')
  } catch (error) {
    sendMessageError('Gupy', (error as Error).message)
  }
}

export { processGupyJobs };
