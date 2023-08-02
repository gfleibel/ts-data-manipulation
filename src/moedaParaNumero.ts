/**
 * Recebe string no formato "R$ 1.000,00 retorna number: 1000.00
 */
export default function moedaParaNumero(moeda: string): number | null{
  const numero = Number(moeda.replaceAll('.','').replaceAll(',','.'));
  return (isNaN(numero) ? null : numero);
}
