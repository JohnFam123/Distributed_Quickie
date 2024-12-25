"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Select } from "flowbite-react";
import { useMemo } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesProfit = () => {
  const [predictMode, setPredictMode] = useState(false);
  // chart
  const optionscolumnchart: any = {
    chart: {
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      fontSize: "12px",
      offsetX: 0,
      offsetY: 10,
      animations: {
        speed: 500,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["var(--color-primary)", "#f00"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.1,
        opacity: 0.3,
        stops: [100],
        colorStops: [
          [
            {
              offset: 0,
              color: "var(--color-primary)",
              opacity: 0.1,
            },
            {
              offset: 100,
              color: "var(--color-primary)",
              opacity: 0.3,
            },
          ],
          [
            {
              offset: 0,
              color: "#f00",
              opacity: 0.1,
            },
            {
              offset: 100,
              color: "#f00",
              opacity: 0.3,
            },
          ],
        ],
      },
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: "#90A4AE50",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        format: "Week %W",
      },
      type: "datetime",
    },
    yaxis: {
      min: 0,
      tickAmount: 10,
    },
    annotations: {
      xaxis: [{
        x: new Date("2024-04-01").getTime(),
        borderColor: "#999",
        borderWidth: 1,
        label: {
          text: "Current",
          style: {
            color: "#999",
          },
        },
      }],
    },
    legend: {
      show: true,
      labels: {
        colors: "#adb0bb",
      },
      customLegendItems: ["Historical", "Prediction"],
    },
    tooltip: { theme: "dark" },
  };

  const historicalData = {
    name: "Historical",
    data: [
      { x: new Date("2024-03-01").getTime(), y: 65 },
      { x: new Date("2024-03-08").getTime(), y: 70 },
      { x: new Date("2024-03-15").getTime(), y: 75 },
      { x: new Date("2024-03-22").getTime(), y: 80 },
      { x: new Date("2024-04-01").getTime(), y: 85 },
    ],
  };

  const predictionData = {
    name: "Prediction",
    data: [
      { x: new Date("2024-04-01").getTime(), y: 85 },
      { x: new Date("2024-04-08").getTime(), y: 88 },
      { x: new Date("2024-04-15").getTime(), y: 92 },
      { x: new Date("2024-04-22").getTime(), y: 95 },
      { x: new Date("2024-04-29").getTime(), y: 98 },
    ],
  };

  const chartData = useMemo(() => {
    const data = [historicalData];
    if (predictMode) {
      data.push(predictionData);
    }
    return data;
  }, [predictMode]);

  return (
    <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center">
        <h5 className="card-title">Sales Profit</h5>
        <button onClick={(prev) => setPredictMode(!prev)}>
          toggle prediction
        </button>
        <Select id="countries" className="select-md" required>
          <option>This Week</option>
          <option>April 2024</option>
          <option>May 2024</option>
          <option>June 2024</option>
        </Select>
      </div>

      <div className="-ms-4 -me-3 mt-2">
        <Chart
          options={optionscolumnchart}
          series={chartData}
          type="area"
          height="315px"
          width="100%"
        />
      </div>
    </div>
  );
};

export default SalesProfit;
