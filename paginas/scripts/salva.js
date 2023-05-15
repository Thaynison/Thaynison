document.addEventListener("DOMContentLoaded", function() {
    salvarDados();
});

// Função para salvar o documento no repositório do GitHub
async function salvarDados() {
    const token = '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';
    const repoOwner = 'Thaynison';
    const repoName = 'Thaynison';
    const pasta = 'documentos';
  
    const comandosJson = { /* Seus dados do comandos.json */ };
    const dadosJson = { /* Seus dados do dados.json */ };
  
    // Função para criar/atualizar um arquivo no repositório
    async function criarOuAtualizarArquivo(nomeArquivo, conteudoArquivo) {
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/main/${pasta}/${nomeArquivo}`;
  
      try {
        // Obter o conteúdo atual do arquivo, se existir
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const fileSha = data.sha;
          const commitMessage = `Atualizar ${nomeArquivo}`;
  
          await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              message: commitMessage,
              content: btoa(unescape(encodeURIComponent(conteudoArquivo))),
              sha: fileSha
            })
          });
          console.log(`${commitMessage}: ${nomeArquivo}`);
        } else if (response.status === 404) {
          // Arquivo não existe, criar novo arquivo
          const commitMessage = `Criar ${nomeArquivo}`;
  
          await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              message: commitMessage,
              content: btoa(unescape(encodeURIComponent(conteudoArquivo)))
            })
          });
          console.log(`${commitMessage}: ${nomeArquivo}`);
        } else {
          throw new Error('Falha ao acessar o GitHub');
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    var pastDocument = document.getElementById("pastDocument");
    pastDocument.style.display = "none";

    // Chamar a função para criar/atualizar os arquivos
    criarOuAtualizarArquivo('comandos.json', JSON.stringify(comandosJson));
    criarOuAtualizarArquivo('dados.json', JSON.stringify(dadosJson));
  }
  