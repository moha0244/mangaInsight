# NestJS backend for MangaInsight

This directory contains a TypeScript/NestJS reimplementation of the original Python FastAPI backend. It exposes the same endpoints and computes the same analytics from a cached `anime_cache.json` file.

## Getting started

1. `cd backend-nest`
2. `npm install`
3. set environment variable `MAL_CLIENT_ID` (or create a `.env` file in root)
4. `npm run start:dev` to start server on port 8000

The scheduler fetches the top anime list every 15 minutes and writes to `app/data/anime_cache.json`.

Endpoints mirror the former Python API under `/api` and `/`.
