function gethistorico() {
    var data = localStorage.getItem("conversaodehistorico"); 
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

function addhistorico(conversao) {
    var historia = gethistorico();
    historia.unshift(conversao);

    while (historia.length > 5) {
        historia.pop();
    }

    localStorage.setItem("conversaodehistorico", JSON.stringify(historia));
}

function renderizarHistorico() {
    const listaHTML = document.getElementById("listaHistorico"); 
    if (!listaHTML) return;

    const historico = gethistorico();
    listaHTML.innerHTML = "";

    if (historico.length === 0) {
        listaHTML.innerHTML = "<li style='padding:10px;'>Nenhuma conversão realizada</li>"; 
        return;
    }

    historico.forEach(item => {
        
        const li = document.createElement("li");
        
        li.innerHTML = `
            <div class="col-origem">${item.valor} ${item.de}</div>
            <div class="col-seta">➔</div>
            <div class="col-destino">${item.total} ${item.para}</div>
            <div class="col-hora">${item.data}</div>
        `;
        
        listaHTML.appendChild(li);
    });
} 

document.addEventListener("DOMContentLoaded", () => {
    renderizarHistorico();
});
