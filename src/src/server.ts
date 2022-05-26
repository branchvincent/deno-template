import { bold, cyan, green, yellow } from "std/fmt/colors.ts";
import { Application } from "oak";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(
    `${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)} - ${
      bold(
        String(rt),
      )
    }`,
  );
});

// Response time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

const port = 8000;
console.log(bold("Server listening on ") + yellow(`http://localhost:${port}`));
await app.listen({ hostname: "localhost", port });
