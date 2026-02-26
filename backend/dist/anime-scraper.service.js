"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AnimeScraperService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeScraperService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const fs = require("fs");
const path = require("path");
let AnimeScraperService = AnimeScraperService_1 = class AnimeScraperService {
    constructor(http) {
        this.http = http;
        this.logger = new common_1.Logger(AnimeScraperService_1.name);
        this.dataDir = path.join(process.cwd(), "data");
        this.cachePath = path.join(this.dataDir, "anime_cache.json");
    }
    handleCron() {
        this.fetchAndSaveTopAnime();
    }
    async fetchAndSaveTopAnime() {
        const clientId = process.env.MAL_CLIENT_ID;
        const allAnime = [];
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
                const response = await (0, rxjs_1.lastValueFrom)(this.http.get(`${url}?${params.toString()}`, {
                    headers: { "X-MAL-CLIENT-ID": clientId },
                }));
                if (response.data && response.data.data) {
                    allAnime.push(...response.data.data);
                    this.logger.log(`Récupéré : ${allAnime.length} animés...`);
                }
            }
            catch (err) {
                this.logger.error(`Erreur API à l'offset ${offset}: ${err.message}`);
                break;
            }
        }
        if (allAnime.length > 0) {
            fs.writeFileSync(this.cachePath, JSON.stringify(allAnime, null, 2));
            this.logger.log(`✅ Succès : ${allAnime.length} animés sauvegardés dans le cache.`);
        }
        else {
            this.logger.warn("⚠️ Aucune donnée n'a été récupérée. Le fichier n'a pas été mis à jour.");
        }
    }
};
exports.AnimeScraperService = AnimeScraperService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimeScraperService.prototype, "handleCron", null);
exports.AnimeScraperService = AnimeScraperService = AnimeScraperService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AnimeScraperService);
//# sourceMappingURL=anime-scraper.service.js.map