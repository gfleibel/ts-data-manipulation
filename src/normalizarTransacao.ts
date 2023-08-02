import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js"

type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
type TransacaoStatus = "Paga" | "Aguardando Pagamento" | "Recusada pela operadora de cartão" | "Estornada";
export interface TransacaoAPI{
  Nome: string;
  ID: number;
  Data: string;
  Status: TransacaoStatus;
  Email: string;
  ['Valor (R$)']: string;
  ['Cliente Novo']: number;
  ['Forma de Pagamento']: TransacaoPagamento;
}

export interface Transacao{
  nome: string;
  id: number;
  data: Date | null;
  status: TransacaoStatus;
  email: string;
  moeda: string;
  valor: number | null;
  novo: boolean;
  pagamento: TransacaoPagamento;
}

export default function normalizarTransacao(transacao: TransacaoAPI): Transacao {
  return{
    nome: transacao.Nome,
    id: transacao.ID,
    data: stringToDate(transacao.Data),
    status: transacao.Status,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    novo: Boolean(transacao["Cliente Novo"]),
    pagamento: transacao["Forma de Pagamento"],
  }
}
