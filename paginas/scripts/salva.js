document.addEventListener("DOMContentLoaded", function() {
    salvarDados();
});

// Função para salvar o documento no repositório do GitHub
function salvarDados() {
    const token = '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';
    const repoOwner = 'Thaynison';
    const repoName = 'Thaynison';
    const pasta = 'documentos';
  
    const comandosJson = { /* Seus dados do comandos.json */ };
    const dadosJson = { /* Seus dados do dados.json */ };
  
    // Função para criar/atualizar um arquivo no repositório
    async function criarOuAtualizarArquivo(nomeArquivo, conteudoArquivo) {
        
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pasta}/${nomeArquivo}`;
  
      // Obter o conteúdo atual do arquivo, se existir
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      let commitMessage = '';
  
      if (response.ok) {
        // Arquivo existe, atualizar conteúdo
        const fileSha = data.sha;
        commitMessage = `Atualizar ${nomeArquivo}`;
  
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
      } else {
        // Arquivo não existe, criar novo arquivo
        commitMessage = `Criar ${nomeArquivo}`;
  
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
      }

      var pastDocument = document.getElementById("pastDocument");
      pastDocument.style.display = "none";
  
      console.log(`${commitMessage}: ${nomeArquivo}`);
    }
  
    // Chamar a função para criar/atualizar os arquivos
    criarOuAtualizarArquivo('comandos.json', JSON.stringify(comandosJson));
    criarOuAtualizarArquivo('dados.json', JSON.stringify(dadosJson));
}
  