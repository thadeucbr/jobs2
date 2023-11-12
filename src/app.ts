import { processAmazonJobs } from './company/amazon';
import { processGoogleJobs } from './company/google';
import { processGupyJobs } from './company/gupy';
import { processMercadoLivreJobs } from './company/mercadolivre';

async function executeJobs() {
  await processAmazonJobs()
  await processGupyJobs()
  await processGoogleJobs()
  await processMercadoLivreJobs()
}

executeJobs()