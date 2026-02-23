export interface AnimeStats {
  correlationData: { x: number; y: number }[];

  genreDistribution: {
    labels: string[];
    series: number[];
  };

  seasonalTrends: {
    name: string;
    data: {
      season: string;
      avg: number;
      std: number;
    }[];
  }[];

  studioRanking: {
    names: string[];
    scores: number[];
  };
}

export interface DashboardSummary {
  totalAnalyzed: number;
  topGenre: string;
  averageScore: number;
}
