import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnimeDataService } from '../../services/anime-service/anime.service';
import { PROJECT_DATA } from '../../constants/constants';
import { ProjectData } from '../../interfaces/project-data';

@Component({
  selector: 'app-project-description',
  standalone: true,
  imports: [],
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
})
export class ProjectDescriptionComponent implements OnInit {
  projectData: ProjectData = PROJECT_DATA;

  constructor(
    private animeService: AnimeDataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.animeService.getRealStats().subscribe((realStats) => {
      console.log(realStats);
      this.projectData.stats = realStats;
      this.cdr.detectChanges();
    });
  }
}
