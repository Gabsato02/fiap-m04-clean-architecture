const WEEK_DAYS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado'
];

export function formatDate ($d: Date) {
    const week_day = WEEK_DAYS[$d.getDay()];
    const day = String($d.getDate()).padStart(2, '0');
    const month = String($d.getMonth() + 1).padStart(2, '0');
    const year = $d.getFullYear();
    const hour = $d.getHours();
    const minute = $d.getMinutes();

  return {
    week_day,
    day,
    month,
    year,
    hour,
    minute,
  }
};

export function getCurrentDate($date?: Date) {
  const currentDate = new Date();
  return formatDate($date || currentDate);
};

export const formatCurrency = (v: number) => v.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});