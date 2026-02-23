import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { ANIME_CONTENT } from '../../constants/constants';
import { AnimeDataService } from '../../services/anime-service/anime.service';

@Component({
  selector: 'app-seasonal-chart',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './seasonal-chart.component.html',
  styleUrls: ['./seasonal-chart.component.scss'],
})
export class SeasonalChartComponent implements OnInit {
  content = ANIME_CONTENT.seasons;
  public options: any;

  constructor(
    private animeService: AnimeDataService,
    private cdr: ChangeDetectorRef,
  ) {
    this.initChartOptions();
  }

  ngOnInit(): void {
    this.animeService.getSeasonal().subscribe((data) => {
      console.log('Données saisonnières reçues (Tableau) :', data);

      if (data) {
        this.updateChartData(data);
        this.cdr.detectChanges();
      }
    });
  }

  private updateChartData(seasonalData: any[]) {
    const labels = ['winter', 'spring', 'summer', 'fall'];

    const removeLastYear = seasonalData.pop();
    const recentYears = seasonalData.slice(-2);

    const formattedSeries = recentYears.map((yearGroup) => {
      const scoresBySeason = labels.map((s) => {
        const found = yearGroup.data.find((d: any) => d.season === s);
        return found ? found.avg : null;
      });

      return {
        name: yearGroup.name,
        data: scoresBySeason,
      };
    });

    this.options = {
      ...this.options,
      series: formattedSeries,
      xaxis: {
        ...this.options.xaxis,
        categories: ['Hiver', 'Printemps', 'Été', 'Automne'],
      },
    };
  }

  initChartOptions() {
    this.options = {
      series: [],
      chart: {
        type: 'area',
        height: 450,
        background: 'transparent',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      colors: ['#388bfd', '#ec407a'],
      stroke: { curve: 'smooth', width: 3 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100],
        },
      },
      markers: { size: 9, strokeWidth: 0, hover: { size: 7 } },
      xaxis: {
        categories: [],
        labels: { style: { colors: '#8b949e' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        min: 6,
        max: 9,
        tickAmount: 4,
        labels: {
          style: { colors: '#8b949e' },
          formatter: (val: number) => val.toFixed(1),
        },
      },
      grid: {
        borderColor: '#30363d',
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
      },
      tooltip: { theme: 'dark' },
      legend: { show: false },
    };
  }
}
