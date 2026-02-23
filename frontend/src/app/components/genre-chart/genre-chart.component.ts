import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common'; // Important pour @if
import { ANIME_CONTENT } from '../../constants/constants';
import { AnimeDataService } from '../../services/anime-service/anime.service';

@Component({
  selector: 'app-genre-chart',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './genre-chart.component.html',
  styleUrls: ['./genre-chart.component.scss'],
})
export class GenreChartComponent implements OnInit {
  content = ANIME_CONTENT.genres;
  public options: any;

  constructor(
    private animeService: AnimeDataService,
    private cdr: ChangeDetectorRef,
  ) {
    this.initChartOptions();
  }

  ngOnInit(): void {
    this.animeService.getGenres().subscribe((data) => {
      this.updateChartData(data.series, data.labels);
      this.cdr.detectChanges();
    });
  }

  private updateChartData(series: number[], labels: string[]) {
    this.options = {
      ...this.options,
      series: series,
      labels: labels,
    };
  }

  private initChartOptions() {
    this.options = {
      series: [],
      labels: [],
      chart: {
        type: 'donut',
        height: 450,
        background: 'transparent',
        foreColor: '#f0f6fc',
      },
      plotOptions: {
        pie: {
          customScale: 0.9,
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                fontSize: '26px',
                color: '#f0f6fc',
                formatter: () => '100 titles',
              },
            },
          },
        },
      },
      legend: {
        show: true,
        position: 'right',
        verticalAlign: 'middle',
        horizontalAlign: 'right',
        fontSize: '20px',
        width: 300,
        offsetY: 0,
        offsetX: -30,
        itemMargin: {
          horizontal: 10,
          vertical: 6,
        },
        labels: {
          colors: '#8b949e',
          useSeriesColors: false,
        },
        markers: {
          width: 10,
          height: 10,
          radius: 10,
        },
      },
      tooltip: { theme: 'dark' },
      states: {
        hover: { filter: { type: 'none' } },
        active: { filter: { type: 'none' } },
      },
    };
  }
}
