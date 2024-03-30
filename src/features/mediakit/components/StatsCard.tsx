import { GenderRow, CountryRow, AgeRow } from "@/types";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HorizontalChart } from "@/components/charts/HorizontalChart";
import Chart from "react-apexcharts";
import { chartOptionsForDonut } from "@/components/charts/chartOptionsForDonut";
import { useTranslation } from "react-i18next";

interface StatsCardProps {
  statsName: string;
  statsNumber: string | null | undefined;
  statsGender: GenderRow[] | null;
  statsCountry: CountryRow[] | null;
  statsAge: AgeRow[] | null;
  statsIcon: React.ReactNode | null;
  statsType: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  statsName,
  statsNumber,
  statsGender,
  statsCountry,
  statsAge,
  statsIcon,
  statsType,
}) => {
  const { t } = useTranslation();

  let labels: string[] = [];
  let percentages: number[] = [];

  let chartOptions: ApexCharts.ApexOptions = {};
  let node: React.ReactNode | null = null;

  let isHere = statsIcon == null;
  console.log(isHere);

  if (statsType == "ageDistribution" && statsAge) {
    labels = statsAge.map((entry) => entry.age ?? "");
    percentages = statsAge.map((entry) => entry.percentage ?? 0);
    node = (
      <div className="flex flex-col align-middle justify-center center flex-1">
        <div className=" flex flex-row justify-center">
          <HorizontalChart names={labels} values={percentages} />
        </div>
      </div>
    );
  } else if (statsType == "countryDistribution" && statsCountry) {
    labels = statsCountry.map((entry) => entry.country ?? "");
    percentages = statsCountry.map((entry) => entry.percentage ?? 0);
    node = (
      <div className="flex flex-col align-middle justify-center center flex-1">
        <div className=" flex flex-row justify-center">
          <HorizontalChart names={labels} values={percentages} />
        </div>
      </div>
    );
  } else if (statsType == "genderDistribution" && statsGender) {
    labels = statsGender.map((entry) => entry.gender ?? "");
    percentages = statsGender.map((entry) => entry.percentage ?? 0);
    if (percentages.length == 2 && percentages[0] < percentages[1]) {
      let p = percentages[0];
      percentages[0] = percentages[1];
      percentages[1] = p;
      let l = labels[0];
      labels[0] = labels[1];
      labels[1] = l;
    }

    chartOptions = chartOptionsForDonut(labels, percentages);
    node = (
      <div className="flex flex-col align-middle justify-center center flex-1">
        <div className=" flex flex-row justify-center pt-3">
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="donut"
            width="250"
          />
        </div>
        {labels.map((item, index) => (
          <div
            className="flex flex-row justify-between w-[70%] mx-auto"
            key={index}
          >
            <div className="flex flex-row items-center gap-2">
              {/* <BsCircleFill className={`w-[5px] h-[5px] ${colors[index]}`} /> */}
              <p className="text-sm font-light">{t(item)}</p>
            </div>
            <p className="text-sm font-semibold">{percentages[index]}%</p>
          </div>
        ))}
      </div>
    );
  } else {
    node = <div className="text-2xl font-bold">{statsNumber}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{statsName}</CardTitle>
        {/* {statsIcon} */}
      </CardHeader>
      <CardContent>{node}</CardContent>
    </Card>
  );
};
