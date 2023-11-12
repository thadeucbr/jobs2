import { Job } from '../type/job.type';

const URL = ''
const GROUP_ID = ''

export async function sendMessage(jobs: Job[]): Promise<void> {
  jobs.forEach((job) => {
    const body = {
      "args": {
        "to": GROUP_ID,
        "content": `Empresa: ${job.company}

Vaga: *${job.title.trim()}*
        
Localização: ${job.location}
        
Candidatura: ${job.url}
        `
      }
    }
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Sucesso:', data);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  });
}

export async function sendMessageNoNewJobs(company: string) {
  const actualDate = new Date()
  const formattedDate = Intl.DateTimeFormat('pt-BR', { dateStyle: 'full'}).format(actualDate)
  const body = {
    "args": {
      "to": GROUP_ID,
      "content": `*${company}* - Sem novas vagas em ${formattedDate}`
    }
  }
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Sucesso:', data);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}

export async function sendMessageNewJobsHeader(company: string) {
  const actualDate = new Date()
  const formattedDate = Intl.DateTimeFormat('pt-BR', { dateStyle: 'full'}).format(actualDate)
  const body = {
    "args": {
      "to": GROUP_ID,
      "content": `*${company}* - Vagas encontradas em ${formattedDate}`
    }
  }
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Sucesso:', data);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}

export async function sendMessageError(company: string, error: string) {
  const body = {
    "args": {
      "to": GROUP_ID,
      "content": `*${company}* - Erro ao executar
      
Erro: ${error}`
    }
  }
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Sucesso:', data);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}