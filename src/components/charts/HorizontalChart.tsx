import { Progress } from "../ui/progress";
import * as React from "react";

interface HorizontalChartProps {
  names: string[];
  values: number[];
}

export const HorizontalChart: React.FC<HorizontalChartProps> = ({
  names,
  values,
}) => {
  return (
    <div className="w-full">
      {values.map((value, index) => (
        <div className="flex flex-col my-3" key={index}>
          <div className="flex flex-row justify-between text-sm mb-1">
            <p className="font-light">{names[index]}</p>
            <p className="font-medium">{value}%</p>
          </div>
          <Progress value={value} />
        </div>
      ))}
    </div>
  );
};
