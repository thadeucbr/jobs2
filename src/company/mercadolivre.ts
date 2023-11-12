import { sendMessage, sendMessageError, sendMessageNewJobsHeader, sendMessageNoNewJobs } from '../helpers/sendMessageToGroup';
import { saveUrl, validateIfUrlExists } from '../localDatabase/localDatabase';
import { Job } from '../type/job.type';
import { MercadoLivrePosition, MercadoLivreResponse } from '../type/mercadolivre.type';

async function getJobPosition(position: string): Promise<MercadoLivrePosition[] | []> {
  const response = await fetch(
    `https://mercadolibre.eightfold.ai/api/apply/v2/jobs?domain=mercadolibre.com&profile=&query=${position}&location=Brazil&domain=mercadolibre.com&sort_by=relevance&triggerGoButton=false`
  );

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  const data = (await response.json()) as MercadoLivreResponse;
  return data.positions;
}

async function filterJobs(): Promise<Job[] | []> {
  const bootcamps = await getJobPosition('bootcamp');
  const others = await getJobPosition('javascript');
  const jobs = [...bootcamps, ...others];
  const formattedJobs = jobs
    .map((job) => {
      if (validateIfUrlExists(job.canonicalPositionUrl) === false) {
        return {
          company: 'MercadoLivre',
          title: job.name,
          location: job.location,
          url: job.canonicalPositionUrl,
        };
      }
    })
    .filter((job): job is Job => job !== undefined);

  return formattedJobs;
}

async function processMercadoLivreJobs(): Promise<void> {
  try {
    const jobs = await filterJobs();
    if (jobs.length > 0) {
      sendMessageNewJobsHeader('MercadoLivre')
      jobs.forEach((job) => saveUrl(job.url));
      await sendMessage(jobs)
      return
    }
    sendMessageNoNewJobs('MercadoLivre')
  } catch (error) {
    sendMessageError('MercadoLivre', (error as Error).message)
  }
}

export { processMercadoLivreJobs };
