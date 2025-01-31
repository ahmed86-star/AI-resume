export const debugConfig = {
  database: true,
  auth: true,
  api: true,
  components: true,
  ai: true
};

type DebugCategory = keyof typeof debugConfig;
const activeCategories = new Set<DebugCategory>(['database', 'auth', 'api']);

export function debug(category: DebugCategory, label: string, data?: any) {
  if (debugConfig[category] && activeCategories.has(category)) {
    console.log(`[DEBUG:${category.toUpperCase()}] ${label}`, {
      timestamp: new Date().toISOString(),
      ...(data && { data: JSON.parse(JSON.stringify(data)) })
    });
  }
} 