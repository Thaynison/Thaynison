function salvarDados() {
    // Token de acesso do GitHub
    const token = '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';

    // URL do repositório no GitHub
    const repoUrl = 'https://api.github.com/repos/Thaynison/Thaynison';

    // Array de arquivos a serem salvos
    const arquivos = [
      { nome: 'comandos.json', dados: { /* dados comandos */ } },
      { nome: 'dados.json', dados: { /* dados dados */ } }
    ];

    // Fazer o upload dos arquivos para o repositório no GitHub
    arquivos.forEach(async (arquivo) => {
      const url = `${repoUrl}/tree/main/documentos/${arquivo.nome}`;

      try {
        // Converter os dados do arquivo para uma string JSON
        const dadosJson = JSON.stringify(arquivo.dados);

        // Criar o objeto de dados para enviar para o GitHub
        const data = {
          message: `Upload do arquivo ${arquivo.nome}`,
          content: Buffer.from(dadosJson).toString('base64')
        };

        // Fazer a chamada para a API do GitHub para criar o arquivo
        await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(`O arquivo ${arquivo.nome} foi salvo com sucesso.`);
      } catch (error) {
        console.error(`Erro ao salvar o arquivo ${arquivo.nome}:`, error);
      }
    });
}
