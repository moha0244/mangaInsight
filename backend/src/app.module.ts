import { Module } from "@nestjs/common";

import { ScheduleModule } from "@nestjs/schedule";
import { HttpModule } from "@nestjs/axios";
import { DataController } from "./data.controller";
import { DataService } from "./data.service";
import { AnimeScraperService } from "./anime-scraper.service";

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  controllers: [DataController],
  providers: [DataService, AnimeScraperService],
})
export class AppModule {}
