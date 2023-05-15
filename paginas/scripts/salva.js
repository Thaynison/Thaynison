
function salvarDados() {
    // Obtenha os dados editados que deseja salvar
    const dadosEditados = {
      // Obtenha os dados de alguma forma (exemplo: de formulários)
      // Aqui está apenas um exemplo estático
      comandos: {
        // dados comandos
      },
      dados: {
        // dados dados
      }
    };

    // Converta os dados para uma string JSON
    const dadosJson = JSON.stringify(dadosEditados);

    // Token de acesso do GitHub
    const token = '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';

    // URL do repositório no GitHub
    const repoUrl = 'https://api.github.com/repos/Thaynison/Thaynison';

    // Nome dos arquivos a serem salvos
    const nomesArquivos = ['comandos.json', 'dados.json'];

    // Faça o upload dos arquivos para o repositório no GitHub
    nomesArquivos.forEach(async (nomeArquivo) => {
      const url = `${repoUrl}/contents/documentos/${nomeArquivo}`;

      try {
        // Obtenha o conteúdo atual do arquivo
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Atualize o conteúdo do arquivo com os dados editados
        const { sha, content } = response.data;
        const novoConteudo = Buffer.from(dadosJson).toString('base64');
        const data = {
          message: `Atualização do arquivo ${nomeArquivo}`,
          content: novoConteudo,
          sha: sha
        };

        // Faça o envio da atualização para o GitHub
        await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(`O arquivo ${nomeArquivo} foi salvo com sucesso.`);
      } catch (error) {
        console.error(`Erro ao salvar o arquivo ${nomeArquivo}:`, error);
      }
    });
}

