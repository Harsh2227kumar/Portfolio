import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { IncomingMessage, ServerResponse } from "node:http";

const apiRoutes: Record<string, string> = {
  "/api/auth/login": "/api/auth/login.ts",
  "/api/auth/logout": "/api/auth/logout.ts",
  "/api/auth/me": "/api/auth/me.ts",
  "/api/track": "/api/track.ts",
  "/api/dash/summary": "/api/dash/summary.ts",
  "/api/dash/new-vs-returning": "/api/dash/new-vs-returning.ts",
  "/api/dash/hourly-users": "/api/dash/hourly-users.ts",
  "/api/dash/insights": "/api/dash/insights.ts",
};

const readBody = (req: IncomingMessage) =>
  new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

const localApiPlugin = (): Plugin => ({
  name: "local-api-routes",
  configureServer(server) {
    server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
      if (!req.url) return next();

      const requestUrl = new URL(req.url, "http://127.0.0.1:8080");
      const routeModule = apiRoutes[requestUrl.pathname];
      if (!routeModule) return next();

      try {
        const mod = await server.ssrLoadModule(`${routeModule}?t=${Date.now()}`);
        const method = (req.method || "GET").toUpperCase();
        const handler = mod[method];

        if (typeof handler !== "function") {
          res.statusCode = 405;
          res.setHeader("content-type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        const headers = new Headers();
        for (const [key, value] of Object.entries(req.headers)) {
          if (Array.isArray(value)) value.forEach((item) => headers.append(key, item));
          else if (value) headers.set(key, value);
        }

        const body = method === "GET" || method === "HEAD" ? undefined : await readBody(req);
        const request = new Request(requestUrl.toString(), { method, headers, body });
        const response = await handler(request);

        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(Buffer.from(await response.arrayBuffer()));
      } catch (error) {
        server.ssrFixStacktrace(error as Error);
        console.error(error);
        res.statusCode = 500;
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ error: "Local API route failed." }));
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    base: "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      localApiPlugin(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
