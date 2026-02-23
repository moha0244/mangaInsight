import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { ANIME_CONTENT } from '../../constants/constants';
import { AnimeDataService } from '../../services/anime-service/anime.service';
import { AnimeStats } from '../../interfaces/anim-stats';

@Component({
  selector: 'app-studio-chart',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './studio-chart.component.html',
  styleUrls: ['./studio-chart.component.scss'],
})
export class StudioChartComponent implements OnInit {
  content = ANIME_CONTENT.studios;
  public options: any;

  constructor(
    private animeService: AnimeDataService,
    private cdr: ChangeDetectorRef,
  ) {
    this.initChartOptions();
  }

  ngOnInit(): void {
    this.animeService.getStudios().subscribe((data: AnimeStats['studioRanking']) => {
      this.updateChartData(data.scores, data.names);

      this.cdr.detectChanges();
    });
  }

  private updateChartData(scores: number[], names: string[]) {
    this.options = {
      ...this.options,
      series: [
        {
          name: 'Score Moyen',
          data: [...scores],
        },
      ],
      xaxis: {
        ...this.options.xaxis,
        categories: [...names],
      },
    };
  }
  private initChartOptions() {
    this.options = {
      series: [],
      chart: {
        type: 'bar',
        height: 450,
        background: 'transparent',
        toolbar: { show: false },
      },
      colors: ['#388bfd'],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '95%',
          borderRadius: 4,
          dataLabels: { position: 'top' },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 45,
        style: {
          fontSize: '12px',
          fontWeight: 700,
          colors: ['#f0f6fc'],
        },
        formatter: (val: number) => val.toFixed(2),
      },
      xaxis: {
        categories: [],
        max: 10,
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { colors: '#8b949e', fontSize: '13px' },
        },
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 50,
          bottom: 0,
          left: 10,
        },
      },
      tooltip: {
        theme: 'dark',
        y: { formatter: (val: number) => `${val} / 10` },
      },
    };
  }
}
