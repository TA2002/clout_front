export function chartOptionsForDonut(
  labels: string[],
  percentages: number[]
): ApexCharts.ApexOptions {
  return {
    chart: {
      type: "donut",
    },
    labels: labels.map(
      (label: string, index: number) => `${label} (${percentages[index]}%)`
    ),
    series: percentages,
    legend: {
      show: false,
      fontSize: "13px",
      fontWeight: "500",
      position: "bottom", // Set the legend position to 'bottom'
      formatter: function (legendName: string) {
        return legendName;
      },
      markers: {
        width: 6,
        height: 6,
        strokeWidth: 0,
        strokeColor: "#fff",
        radius: 6,
        onClick: undefined,
        offsetX: -5,
        offsetY: 0,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName: string) {
            return seriesName;
          },
        },
        formatter: function () {
          return ""; // Add '%' to the tooltip value
        },
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          minAngleToShowLabel: 360,
        },
        startAngle: 0, // Adjust the start angle as needed
        endAngle: 360, // Adjust the end angle as needed
        donut: {
          size: "70%", // Adjust the size to control the gap between segments
        },
        expandOnClick: false,
      },
    },
    colors: ["#e11d48", "#27272a"],
    stroke: {
      width: 0,
      colors: ["white"],
      lineCap: "square",
    },
  };
}
