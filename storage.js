// 1. Busca os dados no localStorage
function gethistorico() {
    var data = localStorage.getItem("conversaodehistorico"); //getItem em vez de setItem
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

// 2. Adiciona item limitando a no máximo 5 registros
function addhistorico(conversao) {
    var historia = gethistorico();
    historia.unshift(conversao);

    // Sem o ponto e vírgula após a condição para evitar loop infinito
    while (historia.length > 5) {
        historia.pop();
    }

    localStorage.setItem("conversaodehistorico", JSON.stringify(historia));
}

// 3. Renderiza a lista no HTML
function renderizarHistorico() {
    const listaHTML = document.getElementById("listaHistorico"); // Aspas adicionadas
    if (!listaHTML) return;

    const historico = gethistorico();
    listaHTML.innerHTML = "";

    if (historico.length === 0) {
        listaHTML.innerHTML = "<li>Nenhuma conversão realizada</li>"; // Aspas adicionadas
        return;
    }

    historico.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `"${item.valor}" ${item.de} ➔ ${item.total} ${item.para} (${item.data})`;
        listaHTML.appendChild(li);
    });
}

// 4. Configuração dos Eventos
document.addEventListener("DOMContentLoaded", () => {
    renderizarHistorico();

    const btnLimpar = document.getElementById("btnLimparHistorico");
    if (btnLimpar) {
        btnLimpar.addEventListener("click", () => {
            localStorage.removeItem("conversaodehistorico");
            renderizarHistorico();
        });
    }
});