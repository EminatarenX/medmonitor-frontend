import { LineChart, barElementClasses } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
const colors: string[] = ["#006BD6", "#EC407A"];
const grayColor = "#2E3135";
const whiteColor = "#F2F8FF";

interface Props {
  width: number;
  height: number;
  firstData: number[];
  secondData?: number[];
  labels: string[];
  firstLabel: string;
  secondLabel?: string;
}

export const DobleLineChart = ({
  width,
  height,
  labels,
  firstData,
  secondData,
  firstLabel,
  secondLabel
}: Props): React.JSX.Element => {
  return (
    <LineChart
      sx={(theme) => ({
        [`.${barElementClasses.root}`]: {
          fill: theme.palette.background.paper,
          strokeWidth: 2,
        },
        [`.MuiBarElement-series-l_id`]: {
          stroke: colors[0],
        },
        [`.`]: {},
        [`.MuiBarElement-series-2_id`]: {
          stroke: colors[1],
        },
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: grayColor,
            strokeWidth: 3,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: whiteColor,
          },
        },
        [`.MuiLineChart-legendItem`]: {
          // Clases de estilo para la leyenda
          color: whiteColor,
        },

        border: `1px solid rgba(${
          theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
        }, 0.1)`,
        backgroundImage: `linear-gradient(rgba(${
          theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
        }, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${
          theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
        }, 0.1) 1px, transparent 1px)`,
        backgroundSize: "35px 35px",
        backgroundPosition: "20px 20px, 20px 20px",
      })}
      xAxis={[{ scaleType: "band", data: labels }]}
      series={[
        { data: firstData, label: firstLabel, id: "l_id" },
        { data: secondData, label: secondLabel, id: "2_id" },
      ]}
      colors={colors}
      width={width}
      height={height}
      slotProps={{
        axisTickLabel: {
    
            fontSize: 6,
            fill: whiteColor,

        
        },
        legend: {
          labelStyle: {
            fontSize: 12,
            fill: whiteColor,
          },
          
        },
      }}
    />
  );
};
