async function buscarCep() {
    try {
        const cep = document.getElementById('cep').value;
        const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { method: 'GET' });
        if(resp.ok) {
            const dados = await resp.json();
            if(dados.logradouro) {
                document.getElementById('logradouro').value = `${dados.logradouro}, ${dados.bairro}`;
                document.getElementById('complemento').value = dados.complemento;
            }
        }
    } catch(erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}