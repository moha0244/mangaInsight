import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTooltip,
  ApexTheme,
  ApexStroke,
  ApexPlotOptions,
  ApexDataLabels,
  ApexMarkers,
  ApexGrid,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';

interface BaseChartOptions {
  chart: ApexChart;
  theme: ApexTheme;
  colors: string[];
  tooltip?: ApexTooltip;
  grid: ApexGrid;
}

export interface CorrelationChartOptions extends BaseChartOptions {
  series: ApexAxisChartSeries;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  stroke: ApexStroke;
}

export interface GenreChartOptions extends BaseChartOptions {
  series: number[];
  labels: string[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
}

export interface SeasonalChartOptions extends BaseChartOptions {
  series: ApexAxisChartSeries;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
}

export interface StudioChartOptions extends BaseChartOptions {
  series: ApexAxisChartSeries;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke?: ApexStroke;
}

export interface AnimeAnalytics {
  correlation: { x: number; y: number }[];
  genres: { label: string; value: number }[];
  seasons: { name: string; data: number[] }[];
  studios: { names: string[]; scores: number[] };
}
