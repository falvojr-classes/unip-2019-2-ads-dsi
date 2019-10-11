async function logar() {
    try {
        const usuario = {};
        usuario.email = buscarPorId('email').value;
        usuario.senha = buscarPorId('senha').value;

        const resp = await fetch(`http://localhost:8080/login`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(usuario)
        });
        if(resp.ok) {
            const usuarioLogado = await resp.json();
            alert(`${usuarioLogado.nome} logado com sucesso!`);
        } else {
            alert("Erro inesperado na API!");
        }
    } catch(erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}
