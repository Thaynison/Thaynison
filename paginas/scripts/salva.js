document.addEventListener("DOMContentLoaded", function() {
    salvarDados();
});

function salvarDados() {
    const repoUrl = 'https://api.github.com/repos/Thaynison/Thaynison';
    const arquivos = [
      { nome: 'comandos.json', dados: { /* dados comandos */ } },
      { nome: 'dados.json', dados: { /* dados dados */ } }
    ];
  
    arquivos.forEach(async (arquivo) => {
      const url = `${repoUrl}/contents/documentos/${arquivo.nome}`;
      const dadosJson = JSON.stringify(arquivo.dados);
  
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
          },
          body: JSON.stringify({
            message: `Upload do arquivo ${arquivo.nome}`,
            content: btoa(dadosJson)
          })
        });
  
        if (response.ok) {
          console.log(`O arquivo ${arquivo.nome} foi salvo com sucesso.`);
        } else {
          console.error(`Erro ao salvar o arquivo ${arquivo.nome}.`);
        }
      } catch (error) {
        console.error(`Erro ao salvar o arquivo ${arquivo.nome}:`, error);
      }
    });
}
  