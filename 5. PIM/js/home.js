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

            veiculos.forEach(veiculo => {
                const linha = criarElemento('div');
                linha.classList.add('row');

                const modelo = criarColuna('col-2');
                modelo.innerHTML = veiculo.modelo;
                const marca = criarColuna('col-2');
                marca.innerHTML = veiculo.marca;
                const placa = criarColuna('col-2');
                placa.innerHTML = veiculo.placa;
                const ano = criarColuna('col-2');
                ano.innerHTML = veiculo.ano;

                const ocorrencias = criarColuna('col-4');
                const linkOcorrencia = criarElemento('a');
                linkOcorrencia.href = `abrir-ocorrencia.html?veiculo=${veiculo.id}`;
                linkOcorrencia.innerHTML = "ABRIR OCORRENCIA";
                ocorrencias.appendChild(linkOcorrencia);

                linha.appendChild(modelo);
                linha.appendChild(marca);
                linha.appendChild(placa);
                linha.appendChild(ano);
                linha.appendChild(ocorrencias);

                gridVeiculos.appendChild(linha);
            });
        } else {
            const erro = await resp.json();
            alert(erro.mensagem);
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}
