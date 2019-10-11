async function cadastrar() {
    try {
        const usuario = {};
        usuario.nome = buscarPorId('nome').value;
        usuario.cpf = buscarPorId('cpf').value;
        usuario.email = buscarPorId('email').value;
        usuario.senha = buscarPorId('senha').value;
        usuario.telefone = buscarPorId('telefone').value;
        usuario.cep = buscarPorId('cep').value;
        usuario.logradouro = buscarPorId('logradouro').value;
        usuario.complemento = buscarPorId('complemento').value;
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
        const cep = buscarPorId('cep').value;
        if (cep) {
            const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: 'GET'
            });
            if (resp.ok) {
                const dados = await resp.json();
                if (dados.logradouro) {
                    buscarPorId('logradouro').value = `${dados.logradouro}, ${dados.bairro}`;
                    buscarPorId('complemento').value = dados.complemento;
                }
            }
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}