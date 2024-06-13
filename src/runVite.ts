import { exec } from 'child_process';
import path from 'path';

export function runNpmScript(directory: string, script: string): void {
  // Muda o diretório atual para o diretório especificado
  const absolutePath = path.resolve(directory);

  // Executa o comando 'npm run dev' no diretório especificado
  exec(`npm run ${script}`, { cwd: absolutePath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o comando: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Erro na execução: ${stderr}`);
      return;
    }

    console.log(`Saída: ${stdout}`);
  });
}

// Use a função para executar o comando em um diretório específico
runNpmScript('./', 'npm run dev');
