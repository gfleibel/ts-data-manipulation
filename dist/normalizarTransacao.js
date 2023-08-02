import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";
export default function normalizarTransacao(transacao) {
    return {
        nome: transacao.Nome,
        id: transacao.ID,
        data: stringToDate(transacao.Data),
        status: transacao.Status,
        email: transacao.Email,
        moeda: transacao["Valor (R$)"],
        valor: moedaParaNumero(transacao["Valor (R$)"]),
        novo: Boolean(transacao["Cliente Novo"]),
        pagamento: transacao["Forma de Pagamento"],
    };
}
//# sourceMappingURL=normalizarTransacao.js.map