# Stage 1: Build Remix
FROM oven/bun AS builder
WORKDIR /app
COPY . . 
RUN bun install && bun run build

# Stage 2: Run Remix
FROM oven/bun
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000
CMD ["bun", "run", "start"]
