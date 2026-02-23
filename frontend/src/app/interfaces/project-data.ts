export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  features: ProjectFeature[];
  stats: ProjectStat[];
}
