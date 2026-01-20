export const appColors = {
  // 1. Màu hệ thống (Bắt buộc phải có)
  transparent: "transparent",
  current: "currentColor",
  white: "#FFFFFF",
  black: "#000000",

  // 2. Màu thương hiệu của FlowMaster
  brand: {
    DEFAULT: "#0F172A", 
    light: "#334155",
    dark: "#020617",
  },
  
  // 3. Màu trạng thái
  success: "#22C55E",
  warning: "#F59E0B",
  error:   "#EF4444",
  info:    "#3B82F6",

  // 4. Các biến màu của Shadcn UI (Bắt buộc giữ để UI không vỡ)
  // Chúng ta map nó vào biến CSS Variable gốc
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
} as const;