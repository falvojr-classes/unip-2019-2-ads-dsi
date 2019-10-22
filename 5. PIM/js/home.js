function inicializar() {
    const usuarioLogado = buscarJsonLocalmente('usuarioLogado');
    const saudacao = buscarElementoPorId('saudacao');
    saudacao.innerHTML = `Bem vindo, ${usuarioLogado.nome}!`;

    listarVeiculos();
}

async function listarVeiculos() {
    try {
        const resp = await fetch('http://localhost:8080/veiculos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {
            const veiculos = await resp.json();
            const gridVeiculos = buscarElementoPorId('gridVeiculos');

            for(let i = 0; i < veiculos.length; i++) {
                const veiculo = veiculos[i];
                const linha = criarElemento('div');
                linha.classList.add('row');
                linha.classList.add(i%2 == 0 ? 'row-pair' : 'row-odd');

                const modelo = criarColuna('col-2');
                modelo.innerHTML = veiculo.modelo;
                const marca = criarColuna('col-2');
                marca.innerHTML = veiculo.marca;
                const placa = criarColuna('col-2');
                placa.innerHTML = veiculo.placa;
                const ano = criarColuna('col-2');
                ano.innerHTML = veiculo.ano;
                const tipo = criarColuna('col-2');
                tipo.innerHTML = veiculo.tipo;

                const colunaBotoes = criarColuna('col-2');

                const editar = criarIcone('../img/editar.svg');
                editar.onclick = function() { 
                    editarVeiculo(veiculo.id);
                };

                const excluir = criarIcone('../img/excluir.svg');
                excluir.onclick = function() { 
                    excluirVeiculo(veiculo.id);
                };

                colunaBotoes.appendChild(editar);
                colunaBotoes.appendChild(excluir);

                linha.appendChild(modelo);
                linha.appendChild(marca);
                linha.appendChild(placa);
                linha.appendChild(ano);
                linha.appendChild(tipo);
                linha.appendChild(colunaBotoes);

                gridVeiculos.appendChild(linha);
            }
        } else {
            const erro = await resp.json();
            alert(erro.mensagem);
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}

async function excluirVeiculo(id) {
    const confirmou = confirm(`Deseja excluir o veiculo de id ${id}?`);
    if (confirmou) {
        try {
            const resp = await fetch(`http://localhost:8080/veiculos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (resp.ok) {
                alert(`Veiculo ${id} excluido com sucesso!`)
            } else {
                const erro = await resp.json();
                alert(erro.mensagem);
            }
        } catch (erro) {
            console.log(erro);
            alert("Erro inesperado!");
        }
    }
}

function cadastrarVeiculo() {
    redirecionar('manter-veiculo.html');
}

function editarVeiculo(id) {
    redirecionar(`manter-veiculo.html?id=${id}`);
}