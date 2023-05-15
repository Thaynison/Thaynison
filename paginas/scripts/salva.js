document.addEventListener("DOMContentLoaded", function() {
    salvarDados();
});

const accessToken = "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";
const repository = "Thaynison";

function uploadFile(file) {
    const url = `https://api.github.com/repos/Thaynison/Thaynison/contents/${file.name}`;

    const reader = new FileReader();
    reader.onload = function(event) {
        const content = event.target.result.split(",")[1];
        const data = {
            message: "Upload de arquivo",
            content: content
        };

        axios.put(url, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(response => {
            console.log("Arquivo enviado com sucesso:", response);
            alert("Arquivo enviado com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao enviar arquivo:", error);
            alert("Erro ao enviar arquivo!");
        });
    };

    reader.readAsDataURL(file);
}

function salvarDados() {
    const documentoInput = document.getElementById("documentoInput");
    const file = documentoInput.files[0];
    uploadFile(file);
}

  