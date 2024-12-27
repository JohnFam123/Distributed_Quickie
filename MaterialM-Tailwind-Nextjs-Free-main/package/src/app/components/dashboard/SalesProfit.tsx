"use client";
import { usePrediction } from '@/app/query/global';
import { useDashboardStore } from "@/app/store/global";
import "dayjs/locale/en";
import { Select, ToggleSwitch } from "flowbite-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesProfit = () => {
  const [predictMode, setPredictMode] = useState(false);
  const [predictRange, setPredictRange] = useState<number>(0);
  const diemQuanTrac = useDashboardStore((state) => state.diemQuanTrac);
  const { data, isLoading } = usePrediction(diemQuanTrac)

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
    colors: ["var(--color-primary)", "#a6a6a6"],
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
            { offset: 0, color: "var(--color-primary)", opacity: 0.1 },
            { offset: 100, color: "var(--color-primary)", opacity: 0.3 },
          ],
          [
            { offset: 0, color: "#808080", opacity: 0.1 },
            { offset: 100, color: "#808080", opacity: 0.3 },
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
      dashArray: [0, 8],
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
    data: isLoading ? [] : data.history.map((item: any) => ({
      x: new Date(item.time).getTime(),
      y: item.actual_wqi
    }))
  };

  const predictionData = {
    name: "Prediction",
    data: isLoading ? [] : data.predicted.map((item: any) => ({
      x: new Date(item.date).getTime(),
      y: item.predicted_wqi.toFixed(2)
    }))
  };

  const chartData = useMemo(() => {
    const data = [historicalData];
    if (predictMode) {
      let processedPredictionData = predictionData.data.filter((_: any, index: number) => index < predictRange);
      processedPredictionData.unshift(historicalData.data.at(-1));
      data.push({
        ...predictionData,
        data: processedPredictionData
      });
    }
    return data;
  }, [predictMode, historicalData, predictionData]);

  return (
    <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center">
        <h5 className="card-title">Water Monitoring</h5>
        <div className="flex justify-end items-center gap-4">
          <label htmlFor="predict-mode">Prediction Mode</label>
          <ToggleSwitch
            checked={predictMode}
            onChange={() => setPredictMode((prev) => !prev)}
            id="predict-mode"
          />
          <Select
            disabled={!predictMode}
            onChange={(e) =>
              setPredictRange(parseInt((e.target as HTMLSelectElement).value))}
          >
            <option value={1}>1 Week</option>
            <option value={2}>2 Weeks</option>
            <option value={3}>3 Weeks</option>
            <option value={4}>4 Weeks</option>
            <option value={5}>5 Weeks</option>
            <option value={6}>6 Weeks</option>
            <option value={7}>7 Weeks</option>
            <option value={8}>8 Weeks</option>
            <option value={9}>9 Weeks</option>
            <option value={10}>10 Weeks</option>
          </Select>
        </div>
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
