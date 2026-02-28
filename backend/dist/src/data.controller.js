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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("./data.service");
let DataController = class DataController {
    constructor(dataService) {
        this.dataService = dataService;
    }
    async getCorrelation() {
        return this.dataService.getCorrelation();
    }
    async getGenres() {
        return this.dataService.getGenres();
    }
    async getStudios() {
        return this.dataService.getStudios();
    }
    async getSeasonal() {
        return this.dataService.getSeasonal();
    }
    async getAnimeList() {
        return this.dataService.getAnimeList();
    }
    root() {
        return { status: "Backend is running", data_source: "MyAnimeList API v2" };
    }
};
exports.DataController = DataController;
__decorate([
    (0, common_1.Get)("correlation"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getCorrelation", null);
__decorate([
    (0, common_1.Get)("genres"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getGenres", null);
__decorate([
    (0, common_1.Get)("studios"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getStudios", null);
__decorate([
    (0, common_1.Get)("seasonal"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getSeasonal", null);
__decorate([
    (0, common_1.Get)("anime-list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getAnimeList", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataController.prototype, "root", null);
exports.DataController = DataController = __decorate([
    (0, common_1.Controller)("api"),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DataController);
//# sourceMappingURL=data.controller.js.map