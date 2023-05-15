document.addEventListener("DOMContentLoaded", function() {
    salvarDados();
});

const token = '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';
const repository = 'Thaynison/Thaynison';
const folder = 'documentos/';

function uploadFile(file, filename) {
  const apiUrl = `https://api.github.com/repos/${repository}/contents/${folder}${filename}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json'
  };

  const reader = new FileReader();

  reader.onload = function(event) {
    const content = event.target.result;
    const encodedContent = btoa(content);

    const body = {
      message: 'Upload file',
      content: encodedContent
    };

    fetch(apiUrl, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Arquivo enviado com sucesso:', data);
      })
      .catch(error => {
        console.error('Erro ao enviar o arquivo:', error);
      });
  };

  reader.readAsText(file);
}

function salvarDados() {
  const fileInput = document.getElementById('documentoInput');
  const file = fileInput.files[0];
  const filename = file.name;

  uploadFile(file, filename);
}

  