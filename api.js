async function fetchrates() {
    try {
        const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL");
        if (!response.ok) {
            throw new Error("Erro na requisição"); 
        }

        const data = await response.json();

        return {
            USD: parseFloat(data.USDBRL.bid),
            EUR: parseFloat(data.EURBRL.bid),
            GBP: parseFloat(data.GBPBRL.bid),
            USD_PCT: parseFloat(data.USDBRL.pctChange),
            EUR_PCT: parseFloat(data.EURBRL.pctChange),
            GBP_PCT: parseFloat(data.GBPBRL.pctChange),
            timestamp: Date.now()
        };
    } catch (error) {
        throw new Error("Falha ao buscar cotações"); 
    }
}