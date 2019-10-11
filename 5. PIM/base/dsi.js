function buscarElementoPorId(id) {
    return document.getElementById(id);
}

function redirecionar(nomePagina) {
    window.location.href = `${nomePagina}.html`;
}

function salvarLocalmente(chave, valor) {
    localStorage.setItem(chave, valor);
}

function salvarJsonLocalmente(chave, valor) {
    salvarLocalmente(chave, JSON.stringify(valor));
}

function buscarLocalmente(chave) {
    return localStorage.getItem(chave);
}

function buscarJsonLocalmente(chave) {
    return JSON.parse(buscarLocalmente(chave));
}

function criarElemento(tag) {
    return document.createElement('tag');
}

function criarColuna(classeColuna) {
    const coluna = criarElemento('div');
    coluna.classList.add(classeColuna, 'center');
    return coluna;
}