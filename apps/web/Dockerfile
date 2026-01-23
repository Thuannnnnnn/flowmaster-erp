# Giai đoạn 1: Build
FROM docker.io/node:20-alpine AS builder

WORKDIR /app

# Copy file package để cài dependency
COPY package.json package-lock.json ./
# Cài đặt dependency (dùng --legacy-peer-deps để tránh lỗi conflict)
RUN npm ci --legacy-peer-deps

# Copy toàn bộ source code
COPY . .

# Build dự án web
# Lưu ý: Đảm bảo apps/web/next.config.js đã có output: 'standalone'
RUN npx nx build web --prod

# Giai đoạn 2: Runner (Chạy thật)
FROM docker.io/node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4200
ENV HOSTNAME="0.0.0.0"

# Tạo user non-root cho bảo mật (Optional nhưng tốt)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# --- QUAN TRỌNG: COPY ĐÚNG CẤU TRÚC ---

# 1. Copy thư mục public (nếu có ảnh/icon)
# COPY --from=builder /app/apps/web/public ./apps/web/public

# 2. Copy folder .next/static vào đúng chỗ để nhận CSS/JS
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/web/.next/static ./dist/apps/web/.next/static

# 3. Copy thư mục standalone (chứa server.js và node_modules tối giản)
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/web/.next/standalone ./

# Đổi quyền user
USER nextjs

# Mở cổng
EXPOSE 4200

# --- SỬA LỖI Ở ĐÂY ---
# Thay vì chạy "node server.js", ta phải chỉ rõ đường dẫn bên trong monorepo
CMD ["node", "apps/web/server.js"]