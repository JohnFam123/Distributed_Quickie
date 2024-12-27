"use client";
import { useDashboardStore } from "@/app/store/global";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en";
import { ToggleSwitch } from "flowbite-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesProfit = () => {
  const [predictMode, setPredictMode] = useState(false);
  const [predictRange, setPredictRange] = useState<Dayjs>(dayjs());
  const diemQuanTrac = useDashboardStore((state) => state.diemQuanTrac);

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
      <div>
        <h5 className="card-title">Water Monitoring</h5>
        <div className="flex justify-between items-center gap-4">
          <label htmlFor="predict-mode">Prediction Mode</label>
          <ToggleSwitch
            checked={predictMode}
            onChange={() => setPredictMode((prev) => !prev)}
            id="predict-mode"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DatePicker
              disabled={!predictMode}
              minDate={dayjs()}
              onChange={(value) => setPredictRange(dayjs(value))}
            />
          </LocalizationProvider>
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
