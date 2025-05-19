import Chart, { Tick, TooltipItem } from "chart.js/auto";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../store/atoms";
import { formatCurrency } from "../../utils";

let chartInstance: Chart | null = null;

export default function Investments() {
  const userInfo = useRecoilValue(userInfoAtom);

  const setChart = () => {
    const canvas = document.getElementById("acquisitions") as HTMLCanvasElement;

    if (!canvas) return;

    if (chartInstance) chartInstance.destroy();

    const data = {
      labels: Array(userInfo?.history.length).fill(""),
      datasets: [
        {
          label: "Evolução do saldo",
          data: userInfo?.history,
          backgroundColor: "#198754",
          borderColor: "#198754",
          tension: 0.1,
        },
      ],
    };

    chartInstance = new Chart(canvas, {
      type: "line",
      data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context: TooltipItem<"line">): string =>
                formatCurrency(context.raw as number),
            },
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value: Tick["value"]) =>
                formatCurrency(value as number, 0),
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    if (userInfo?.history) setChart();
  }, [userInfo]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-success">
          Histórico da conta
          <i className="fa-solid fa-sack-dollar ms-2"></i>
        </h5>
        <small className="card-text mb-3 d-block">
          Confira abaixo o histórico da sua conta.
        </small>
        {userInfo?.id && <canvas id="acquisitions"></canvas>}
      </div>
    </div>
  );
}
