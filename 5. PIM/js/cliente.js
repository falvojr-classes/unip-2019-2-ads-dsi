async function cadastrar() {
    try {
        const usuario = {};
        usuario.nome = getById('nome').value;
        usuario.cpf = getById('cpf').value;
        usuario.email = getById('email').value;
        usuario.senha = getById('senha').value;
        usuario.telefone = getById('telefone').value;
        usuario.cep = getById('cep').value;
        usuario.logradouro = getById('logradouro').value;
        usuario.complemento = getById('complemento').value;
        usuario.tipo = 'CLIENTE';

        const resp = await fetch(`http://localhost:8080/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        if (resp.ok) {
            alert('Usuário cadastrado com sucesso!');
        } else {
            alert("Erro inesperado na API!");
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}

async function buscarCep() {
    try {
        const cep = getById('cep').value;
        if (cep) {
            const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: 'GET'
            });
            if (resp.ok) {
                const dados = await resp.json();
                if (dados.logradouro) {
                    getById('logradouro').value = `${dados.logradouro}, ${dados.bairro}`;
                    getById('complemento').value = dados.complemento;
                }
            }
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}