import countBy from "./countBy.js";
function filtrarValor(transacao) {
    return transacao.valor !== null;
}
export default class Estatisticas {
    transacoes;
    total;
    pagamento;
    status;
    semana;
    melhorDia;
    constructor(transacoes) {
        this.transacoes = transacoes;
        this.total = this.setTotal();
        this.pagamento = this.setPagamento();
        this.status = this.setStatus();
        this.semana = this.setSemana();
        this.melhorDia = this.setMelhorDia();
    }
    setTotal() {
        const filtrado = this.transacoes.filter(filtrarValor).reduce((acc, item) => {
            return acc + item.valor;
        }, 0);
        return filtrado;
    }
    setPagamento() {
        return countBy(this.transacoes.map(({ pagamento }) => pagamento));
    }
    setStatus() {
        return countBy(this.transacoes.map(({ status }) => status));
    }
    setSemana() {
        const semana = {
            ['Domingo']: 0,
            ['Segunda']: 0,
            ['Terça']: 0,
            ['Quarta']: 0,
            ['Quinta']: 0,
            ['Sexta']: 0,
            ['Sabado']: 0,
        };
        for (let i = 0; i < this.transacoes.length; i++) {
            const day = this.transacoes[i].data?.getDay();
            if (day === 0)
                semana['Domingo']++;
            if (day === 1)
                semana['Segunda']++;
            if (day === 2)
                semana['Terça']++;
            if (day === 3)
                semana['Quarta']++;
            if (day === 4)
                semana['Quinta']++;
            if (day === 5)
                semana['Sexta']++;
            if (day === 6)
                semana['Sabado']++;
        }
        return semana;
    }
    setMelhorDia() {
        const semana = this.semana;
        const max = Math.max(...Object.values(semana));
        const dia = Object.keys(semana).find(key => semana[key] === max);
        return dia;
    }
}
//# sourceMappingURL=Estatisticas.js.map