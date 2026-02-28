import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class AnimeScraperService {
  private readonly logger = new Logger(AnimeScraperService.name);

  private readonly dataDir = path.join(process.cwd(), "data");
  private readonly cachePath = path.join(this.dataDir, "anime_cache.json");

  constructor(private readonly http: HttpService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  handleCron() {
    this.fetchAndSaveTopAnime();
  }

  /**
   * Fetches the top anime from MyAnimeList API and saves them
   * to a local JSON cache file.
   *
   * This function is called every 30 minutes by the scheduler.
   * It fetches the top anime in blocks of 500 and saves them
   * to a local file. If the API blocks the request, it will
   * stop fetching anime.
   *
   * @returns {Promise<void>}
   */
  async fetchAndSaveTopAnime() {
    const clientId = process.env.MAL_CLIENT_ID;

    const allAnime: any[] = [];

    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }

    for (let offset = 0; offset < 10000; offset += 500) {
      const url = "https://api.myanimelist.net/v2/anime/ranking";
      const params = new URLSearchParams({
        ranking_type: "all",
        limit: "500",
        offset: offset.toString(),
        fields: "mean,num_list_users,genres,studios,start_season",
      });

      try {
        const response = await lastValueFrom(
          this.http.get(`${url}?${params.toString()}`, {
            headers: { "X-MAL-CLIENT-ID": clientId },
          }),
        );

        if (response.data && response.data.data) {
          allAnime.push(...response.data.data);
          this.logger.log(`Récupéré : ${allAnime.length} animés...`);
        }
      } catch (err) {
        this.logger.error(`Erreur API à l'offset ${offset}: ${err.message}`);
        break; // Arrête la boucle si l'API bloque
      }
    }

    if (allAnime.length > 0) {
      fs.writeFileSync(this.cachePath, JSON.stringify(allAnime, null, 2));
      this.logger.log(
        `✅ Succès : ${allAnime.length} animés sauvegardés dans le cache.`,
      );
    } else {
      this.logger.warn(
        "⚠️ Aucune donnée n'a été récupérée. Le fichier n'a pas été mis à jour.",
      );
    }
  }
}
