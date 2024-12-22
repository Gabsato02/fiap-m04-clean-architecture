import { useEffect } from "react";
import Chart from 'chart.js/auto';

export default function Investments() {
  const MONTH_LABELS = [
    "Jan", 
    "Fev", 
    "Mar", 
    "Abr", 
    "Mai", 
    "Jun", 
    "Jul", 
    "Ago", 
    "Set", 
    "Out", 
    "Nov", 
    "Dez"
  ];

  function getMonthsYTD() {
    const currentMonth = new Date().getMonth();
    return MONTH_LABELS.slice(0, currentMonth + 1);
  }

  useEffect(() => {
    (async function() {
      const labels = getMonthsYTD();
      const data = {
        labels: labels,
        datasets: [{
          label: 'Minha carteira',
          data: [5, 24, 37, 43, 51, 51, 58, 67, 74, 89, 90, 93],
          backgroundColor: '#198754',
          borderColor: '#198754',
          tension: 0.1
        },
        {
          label: 'CDI',
          data: [3, 3, 15, 17, 22, 25, 33, 35, 54, 85, 89, 99],
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd ',
          tension: 0.1
        }]
      };

      new Chart(
        document.getElementById('acquisitions') as HTMLCanvasElement,
        {
          type: 'line',
          data,
        }
      );
    })();
  }, [])

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-success">
          Investimentos
          <i className="fa-solid fa-sack-dollar ms-2"></i>
        </h5>
        <small className="card-text mb-3 d-block">
          Confira abaixo o resultado dos seus investimentos neste ano.
        </small>
        <p className="card-text">
          <strong>R$ 1000</strong>
        </p>
        <canvas id="acquisitions"></canvas>
      </div>
    </div>
  )
}