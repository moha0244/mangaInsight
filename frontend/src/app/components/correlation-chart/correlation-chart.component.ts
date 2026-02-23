import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { ANIME_CONTENT } from '../../constants/constants';
import { AnimeDataService } from '../../services/anime-service/anime.service';

@Component({
  selector: 'app-correlation-chart',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './correlation-chart.component.html',
  styleUrls: ['./correlation-chart.component.scss'],
})
export class CorrelationChartComponent implements OnInit {
  content = ANIME_CONTENT.correlation;
  public options: any;

  constructor(
    private animeService: AnimeDataService,
    private cdr: ChangeDetectorRef,
  ) {
    this.initChartOptions();
  }

  ngOnInit(): void {
    this.animeService.getCorrelation().subscribe((response: any) => {
      console.log('Données corrélation reçues :', response);

      if (response && response.points) {
        this.updateChartData(response.points);

        if (response.stats) {
          this.content.badge = response.stats.rValue;
        }

        this.cdr.detectChanges();
      }
    });
  }

  updateChartData(points: any[]) {
    this.options = {
      ...this.options,
      series: [
        {
          name: 'Animes',
          type: 'scatter',
          data: points,
        },
        {
          name: 'Régression linéaire',
          type: 'line',
          data: [
            { x: 1000, y: 7.2 },
            { x: 4000000, y: 8.8 },
          ],
        },
      ],
    };
  }

  initChartOptions() {
    this.options = {
      series: [],
      chart: {
        type: 'line',
        height: 450,
        background: 'transparent',
        toolbar: { show: false },
        animations: { enabled: false },
      },
      colors: ['#5c6bc0', '#ec407a'],

      fill: {
        type: 'solid',
        opacity: [0.2, 1],
      },
      markers: {
        size: [2.5, 0],
        strokeWidth: 0,
        hover: {
          size: 4,
          sizeOffset: 3,
        },
      },
      stroke: {
        width: [0, 2],
        dashArray: [0, 8],
      },
      xaxis: {
        type: 'logarithmic',
        tickAmount: 4,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: { colors: '#8b949e', fontSize: '11px' },
          formatter: (val: number) => {
            if (val >= 1000000) return (val / 1000000).toFixed(0) + 'M';
            if (val >= 10000) return (val / 1000).toFixed(0) + 'k';
            return '';
          },
        },
      },
      yaxis: {
        min: 6,
        max: 10,
        tickAmount: 2,
        labels: {
          style: { colors: '#8b949e' },
          formatter: (val: number) => val.toFixed(1),
        },
      },
      grid: {
        show: true,
        borderColor: '#30363d',
        strokeDashArray: 0,

        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true, opacity: 0.1 } },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 10,
        },
      },
      tooltip: { theme: 'dark' },
      legend: { fontSize: '20px', show: false },
    };
  }
}
