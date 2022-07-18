/** @jsx h */
import { h } from "preact";
import { tw } from '@twind'
import { Handlers } from "$fresh/server.ts";
import { webviewEnv } from "../utils/ua.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const redirect = new URL(req.url).searchParams.get("redirect") || "";
    const uae = webviewEnv(req.headers.get("user-agent") as string);
    const resp = await ctx.render();
    // 微信中
    if (uae.isWeixin && !uae.isWorkWeixin && redirect && uae.isAndroid) {
      /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types */
      resp.headers.set(
        "Content-Disposition",
        'attachment; filename="load.doc"'
      );
      resp.headers.set("Content-type", "application/msword");
      return resp;
    }
    if (redirect && uae.isAndroid)
      return Response.redirect(decodeURIComponent(redirect), 307);
    return resp;
  },
};

export default function OpenPage() {
  return (
    <main class={tw`max-w-screen bg-[#0e0e0e] min-h-screen text-white `}>
      <img class={tw`w-full`} src="/resource/ios.gif" />
      <h1 class={tw`text-center text-3xl`}>⚡️ WXOPEN</h1>
    </main>
  );
}
