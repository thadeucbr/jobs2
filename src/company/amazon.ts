import { sendMessage, sendMessageError, sendMessageNewJobsHeader, sendMessageNoNewJobs } from '../helpers/sendMessageToGroup';
import { saveUrl, validateIfUrlExists } from '../localDatabase/localDatabase';
import { AmazonJob, AmazonJobs } from '../type/amazon.type';
import { Job } from '../type/job.type';

async function getJobPosition(): Promise<AmazonJob[] | []> {
  const response = await fetch(
    `https://www.amazon.jobs/en-gb/search.json?category%5B%5D=software-development&normalized_country_code%5B%5D=BRA&facets%5B%5D=category&facets%5B%5D=job_function_id&facets%5B%5D=is_manager&facets%5B%5D=is_intern&offset=0&result_limit=20&sort=recent&loc_query=Brasil&country=BRA`
  );

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  const data = (await response.json()) as AmazonJobs;
  return data.jobs;
}

async function filterJobs(): Promise<Job[] | []> {

  const jobs = await getJobPosition()
  const formattedJobs = jobs
    .map((job) => {
      const url = `https://www.amazon.jobs${job.job_path}`
      if (validateIfUrlExists(url) === false) {
        return {
          company: 'Amazon',
          title: `${job.title}`,
          location: job.city,
          url: url,
        };
      }
    })
    .filter((job): job is Job => job !== undefined);

  return formattedJobs;
}

async function processAmazonJobs(): Promise<void> {
  try {
    const jobs = await filterJobs();
    if (jobs.length > 0) {
      sendMessageNewJobsHeader('Amazon')
      jobs.forEach((job) => saveUrl(job.url));
      await sendMessage(jobs)
      return
    }
    sendMessageNoNewJobs('Amazon')
  } catch (error) {
    sendMessageError('Amazon', (error as Error).message)
  }
}

export { processAmazonJobs };
