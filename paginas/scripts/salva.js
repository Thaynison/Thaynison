document.addEventListener("DOMContentLoaded", function() {
    salvarDados();
});

async function uploadArquivo() {
    const arquivoInput = document.getElementById('arquivoInput');
    const arquivo = arquivoInput.files[0];
    const nomeArquivo = arquivo.name;
    const conteudoArquivo = await lerConteudoArquivo(arquivo);

    const token = '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'; // Substitua pelo seu token de acesso do GitHub
    const repositorio = 'Thaynison/Thaynison'; // Substitua pelo nome do repositório

    const url = `https://api.github.com/repos/${repositorio}/contents/${nomeArquivo}`;
    const corpoRequisicao = {
      message: 'Upload de arquivo',
      content: btoa(conteudoArquivo), // Codifica o conteúdo do arquivo para Base64
    };

    try {
      const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(corpoRequisicao),
      });

      if (resposta.ok) {
        exibirMensagem('Arquivo enviado com sucesso!');
      } else {
        exibirMensagem('Erro ao enviar o arquivo. Verifique o token de acesso e o repositório.');
      }
    } catch (erro) {
      exibirMensagem('Erro ao enviar o arquivo: ' + erro.message);
    }
  }

  function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();

      leitor.onload = () => {
        resolve(leitor.result);
      };

      leitor.onerror = () => {
        reject(new Error('Erro ao ler o arquivo.'));
      };

      leitor.readAsText(arquivo);
    });
  }

  function exibirMensagem(mensagem) {
    const mensagemElemento = document.getElementById('mensagem');
    mensagemElemento.textContent = mensagem;
  }
  