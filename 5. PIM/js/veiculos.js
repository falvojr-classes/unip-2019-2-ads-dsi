const usuarioLogado = buscarJsonLocalmente('usuarioLogado');

function inicializar() {
    const saudacao = buscarElementoPorId('saudacao');
    if (ehCliente()) {
        saudacao.innerHTML = `Bem vindo, cliente ${usuarioLogado.nome}!`;
    } else {
        saudacao.innerHTML = `Bem vindo, funcionário ${usuarioLogado.nome}!`;
    }

    listarVeiculos();
}

function ehCliente() {
    return usuarioLogado.tipo == 'CLIENTE';
}

async function listarVeiculos() {
    const gridVeiculos = buscarElementoPorId('gridVeiculos');
    gridVeiculos.innerHTML = '';

    const url = `http://localhost:8080/veiculos?ehCliente=${ehCliente()}`;

    try {
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {
            // Criar cabecalho:
            const linhaHeader = criarElemento('div');
            linhaHeader.classList.add('row');
            linhaHeader.classList.add('header');
            const headerModelo = criarColuna('col-2');
            headerModelo.innerHTML = '<strong>Modelo</strong>';
            const headerMarca = criarColuna('col-2');
            headerMarca.innerHTML = '<strong>Marca</strong>';
            const headerPlaca = criarColuna('col-2');
            headerPlaca.innerHTML = '<strong>Placa</strong>';
            const headerAno = criarColuna('col-1');
            headerAno.innerHTML = '<strong>Ano</strong>';
            const headerTipo = criarColuna('col-2');
            headerTipo.innerHTML = '<strong>Tipo</strong>';
            const headerAcoes = criarColuna('col-3');
            headerAcoes.innerHTML = '<strong>Acoes</strong>';

            linhaHeader.appendChild(headerModelo);
            linhaHeader.appendChild(headerMarca);
            linhaHeader.appendChild(headerPlaca);
            linhaHeader.appendChild(headerAno);
            linhaHeader.appendChild(headerTipo);
            linhaHeader.appendChild(headerAcoes);

            gridVeiculos.appendChild(linhaHeader);

            // Criar linhas (dinamicamente)
            const veiculos = await resp.json();
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
                const ano = criarColuna('col-1');
                ano.innerHTML = veiculo.ano;
                const tipo = criarColuna('col-2');
                tipo.innerHTML = veiculo.tipo;

                const colunaBotoes = criarColuna('col-3');

                const editar = criarIcone('../img/editar.svg');
                editar.onclick = function() { 
                    editarVeiculo(veiculo.id);
                };

                const excluir = criarIcone('../img/excluir.svg');
                excluir.onclick = function() { 
                    excluirVeiculo(veiculo.id);
                };

                const abrirOcorrencia = criarIcone('../img/abrir-ocorrencia.svg');
                abrirOcorrencia.onclick = function() { 
                    // Limpar os campos da Dialos
                    buscarElementoPorId('titulo').value = '';
                    buscarElementoPorId('descricao').value = '';
                    
                    // Abrir a Dialog
                    const dialog = buscarElementoPorId('ocorrenciaDialog');
                    dialog.showModal();

                    // Criar o evento de click de Cancelar
                    const cancelar = buscarElementoPorId('cancelar');
                    cancelar.onclick = function() { 
                        dialog.close();
                    };

                    // Criar o evento de click de Salvar
                    const salvar = buscarElementoPorId('salvar');
                    salvar.onclick = function() { 
                        incluirOcorrencia(veiculo.id, usuarioLogado.id, dialog);
                    };
                };

                const listarOcorrencias = criarIcone('../img/listar-ocorrencias.svg');
                listarOcorrencias.onclick = function() { 
                    redirecionar(`ocorrencias.html?idVeiculo=${veiculo.id}`);
                };

                colunaBotoes.appendChild(editar);
                colunaBotoes.appendChild(excluir);
                colunaBotoes.appendChild(abrirOcorrencia);
                colunaBotoes.appendChild(listarOcorrencias);

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
                listarVeiculos();
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

async function incluirOcorrencia(veiculoId, usuarioId, dialog) {
    try {
        const ocorrencia = {
            titulo: buscarElementoPorId('titulo').value,
            descricao: buscarElementoPorId('descricao').value,
            veiculo: {
                id: veiculoId
            },
            usuario: {
                id: usuarioId
            }
        };
        const resp = await fetch(`http://localhost:8080/ocorrencias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ocorrencia)
        });
        if (resp.ok) {
            dialog.close();
            alert(`Ocorrencia cadastrada com sucesso!`)
        } else {
            const erro = await resp.json();
            alert(erro.mensagem);
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}