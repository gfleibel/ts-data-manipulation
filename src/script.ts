import fetchData from "./fetchData.js";
import { TransacaoAPI, Transacao } from "./normalizarTransacao.js";
import normalizarTransacao from "./normalizarTransacao.js";
import Estatisticas from "./Estatisticas.js";
import { CountList } from "./countBy.js";

async function handleData(){
  const data = await fetchData<TransacaoAPI[]>("https://api.origamid.dev/json/transacoes.json?");
  if(!data) return;
  const transacoes = data.map(normalizarTransacao);
  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);
}

function preencherLista(lista: CountList, containerId: string): void{
  const containerElement = document.getElementById(containerId);
  if(!containerElement) return;
  Object.keys(lista).forEach(key => {
    containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`
  });
}

function preencherEstatisticas(transacoes: Transacao[]): void{
  const data = new Estatisticas(transacoes);
  const totalElement = document.querySelector<HTMLElement>("#total span");
  if(!totalElement) return;
  totalElement.innerText = data.total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

  preencherLista(data.pagamento as CountList, "pagamento");
  preencherLista(data.status as CountList, "status");

  const semanaElement = document.getElementById("semana");
  if(!semanaElement) return;
  semanaElement.innerHTML += `<p>${data.melhorDia} com ${data.semana[data.melhorDia as keyof typeof data.semana]} transações</p>`
}

function preencherTabela(transacoes: Transacao[]): void{
  const tabela = document.querySelector("#transacoes tbody");
  if(!tabela) return;
  transacoes.forEach(transacao => {
    tabela.innerHTML += `
    <tr>
      <td>${transacao.nome}</td>
      <td>${transacao.email}</td>
      <td>R$ ${transacao.moeda}</td>
      <td>${transacao.pagamento}</td>
      <td>${transacao.status}</td>
    </tr>
    `;
  });
}

handleData()
