class calculadoradeconversao {
    constructor(rates) {
        this.BRL = 1;
        this.USD = rates.USD;
        this.GBP = rates.GBP;
        this.EUR = rates.EUR;

        this.usdpct = rates.USD_PCT || 0;
        this.eurpct = rates.EUR_PCT || 0;
        this.gbppct = rates.GBP_PCT || 0;
    }
    obtermoeda(moeda) {
        const moedaMaiuscula = moeda.toUpperCase(); 
        return this[moedaMaiuscula] || 1;
    }
    obtervariacao(moeda) {
        const variacaoPct = moeda.toLowerCase() + "pct"; 
        return this[variacaoPct] || 0;
    }
    calcularvalor(valor, de, para) {
        if (!valor || valor <= 0) return null;

        const taxaOrigem = this.obtermoeda(de);
        const taxaDestino = this.obtermoeda(para);

        const taxafinal = taxaOrigem / taxaDestino;
        const valorTotal = valor * taxafinal; 

        return { 
            total: valorTotal.toFixed(2),
            taxa: taxafinal.toFixed(4),
            variacao: this.obtervariacao(para)
        };
    }
}

async function converter() {
    const valorInput = document.getElementById("valor").value;
    const valor = parseFloat(valorInput);
    const de = document.getElementById("moedaOrigem").value;
    const para = document.getElementById("moedaDestino").value;

    if (!valor || valor <= 0) return;

    try {
        const rates = await fetchrates();
        const calculadora = new calculadoradeconversao(rates);
        const resultado = calculadora.calcularvalor(valor, de, para);

        if (!resultado) return; 

        document.getElementById("resultado").innerText = `${para} ${resultado.total}`;
        document.getElementById("cotacao").innerText = `1 ${de} = ${resultado.taxa} ${para}`;
        document.getElementById("valorVariacao").innerText = `${resultado.variacao}% hoje`;

            addhistorico({
            de: de,
            para: para,
            valor: valor,
            total: resultado.total,
            data: new Date().toLocaleTimeString()
        });

        renderizarHistorico();

    } catch (error) {
        document.getElementById("cotacao").innerText = "Erro ao realizar a conversão";
        console.error(error);
    }
}

function inverterMoedas() {
    const de = document.getElementById("moedaOrigem");
    const para = document.getElementById("moedaDestino");

    const temp = de.value;
    de.value = para.value;
    para.value = temp;

    converter(); 
}

document.getElementById("converter").addEventListener("click", converter);
document.getElementById("trocarMoedas").addEventListener("click", inverterMoedas);