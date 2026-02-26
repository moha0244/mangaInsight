"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const path = require("path");
let DataService = class DataService {
    constructor() {
        this.cachePath = path.join(__dirname, "../data/anime_cache.json");
    }
    async loadCachedData() {
        try {
            const raw = await (0, promises_1.readFile)(this.cachePath, { encoding: "utf-8" });
            return JSON.parse(raw);
        }
        catch (e) {
            console.error("Erreur lecture cache", e);
            return [];
        }
    }
    async getCorrelation() {
        const data = await this.loadCachedData();
        const x_vals = [];
        const y_vals = [];
        const points = [];
        for (const item of data) {
            const node = item.node || {};
            if (node.mean !== undefined && node.num_list_users !== undefined) {
                const x = node.num_list_users;
                const y = node.mean;
                points.push({ x, y });
                x_vals.push(x);
                y_vals.push(y);
            }
        }
        const n = x_vals.length;
        let sum_x = 0, sum_y = 0, sum_xy = 0, sum_x2 = 0, sum_y2 = 0;
        for (let i = 0; i < n; i++) {
            sum_x += x_vals[i];
            sum_y += y_vals[i];
            sum_xy += x_vals[i] * y_vals[i];
            sum_x2 += x_vals[i] * x_vals[i];
            sum_y2 += y_vals[i] * y_vals[i];
        }
        const rValue = (n * sum_xy - sum_x * sum_y) /
            Math.sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));
        return {
            points,
            stats: {
                rValue: `r = ${rValue.toFixed(3)}`,
                count: points.length,
            },
        };
    }
    async getGenres() {
        const data = await this.loadCachedData();
        const genreCounts = {};
        const top100 = data.slice(0, 100);
        for (const item of top100) {
            const genres = (item.node && item.node.genres) || [];
            for (const g of genres) {
                genreCounts[g.name] = (genreCounts[g.name] || 0) + 1;
            }
        }
        const sorted = Object.entries(genreCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 15);
        return {
            series: sorted.map(([, count]) => count),
            labels: sorted.map(([name]) => name),
        };
    }
    async getStudios() {
        const data = await this.loadCachedData();
        const studioMap = {};
        for (const item of data) {
            const node = item.node || {};
            const score = node.mean;
            const studios = node.studios || [];
            if (score !== undefined && studios.length) {
                studios.forEach((s) => {
                    if (!studioMap[s.name])
                        studioMap[s.name] = [];
                    studioMap[s.name].push(score);
                });
            }
        }
        const stats = Object.entries(studioMap)
            .filter(([, scores]) => scores.length >= 3)
            .map(([name, scores]) => {
            const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
            return {
                name,
                score: Math.round(avg * 100) / 100,
                count: scores.length,
            };
        })
            .sort((a, b) => b.score - a.score)
            .slice(0, 15);
        return {
            names: stats.map((s) => s.name),
            scores: stats.map((s) => s.score),
        };
    }
    async getSeasonal() {
        const data = await this.loadCachedData();
        const seasonalMap = {};
        for (const item of data) {
            const node = item.node || {};
            const score = node.mean;
            const seasonInfo = node.start_season;
            if (score !== undefined && seasonInfo) {
                const year = seasonInfo.year;
                const season = seasonInfo.season;
                seasonalMap[year] = seasonalMap[year] || {};
                seasonalMap[year][season] = seasonalMap[year][season] || [];
                seasonalMap[year][season].push(score);
            }
        }
        const result = [];
        for (const year of Object.keys(seasonalMap)
            .map((k) => parseInt(k, 10))
            .sort()) {
            const yearData = [];
            for (const s of ["winter", "spring", "summer", "fall"]) {
                const scores = seasonalMap[year][s] || [];
                if (scores.length) {
                    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
                    const std = scores.length > 1
                        ? Math.sqrt(scores
                            .map((v) => (v - avg) * (v - avg))
                            .reduce((a, b) => a + b, 0) /
                            (scores.length - 1))
                        : 0;
                    yearData.push({
                        season: s,
                        avg: Math.round(avg * 100) / 100,
                        std: Math.round(std * 100) / 100,
                    });
                }
            }
            result.push({ name: year.toString(), data: yearData });
        }
        return result;
    }
    async getAnimeList() {
        const data = await this.loadCachedData();
        return data.map((item) => {
            const node = item.node || {};
            return {
                id: node.id,
                title: node.title,
                score: node.mean,
                studio_name: node.studios && node.studios.length
                    ? node.studios[0].name
                    : "Unknown",
                genres: (node.genres || []).map((g) => g.name),
                year: node.start_season?.year,
            };
        });
    }
};
exports.DataService = DataService;
exports.DataService = DataService = __decorate([
    (0, common_1.Injectable)()
], DataService);
//# sourceMappingURL=data.service.js.map