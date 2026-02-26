import { Controller, Get } from "@nestjs/common";
import { DataService } from "./data.service";

@Controller("api")
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get("correlation")
  async getCorrelation() {
    return this.dataService.getCorrelation();
  }

  @Get("genres")
  async getGenres() {
    return this.dataService.getGenres();
  }

  @Get("studios")
  async getStudios() {
    return this.dataService.getStudios();
  }

  @Get("seasonal")
  async getSeasonal() {
    return this.dataService.getSeasonal();
  }

  @Get("anime-list")
  async getAnimeList() {
    return this.dataService.getAnimeList();
  }

  @Get()
  root() {
    return { status: "Backend is running", data_source: "MyAnimeList API v2" };
  }
}
