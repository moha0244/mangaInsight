import { Module, Global } from "@nestjs/common";
import { kv } from "@vercel/kv";

@Global()
@Module({
  providers: [
    {
      provide: "KV_CLIENT",
      useValue: kv,
    },
  ],
  exports: ["KV_CLIENT"],
})
export class KvModule {}
