export default function moedaParaNumero(moeda) {
    const numero = Number(moeda.replaceAll('.', '').replaceAll(',', '.'));
    return (isNaN(numero) ? null : numero);
}
//# sourceMappingURL=moedaParaNumero.js.map