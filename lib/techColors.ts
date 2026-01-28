export const techColors: Record<string, string> = {
  // Languages
  "python": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "javascript": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "typescript": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  
  // Frameworks & Libraries
  "react": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  "next.js": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "node.js": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "express": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "django": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "fastapi": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "flask": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "tensorflow": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "pytorch": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "scikit-learn": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "openai": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  
  // Databases & Cloud
  "mongodb": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "postgresql": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "mysql": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "redis": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "aws": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "docker": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "kubernetes": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",

  // Tools
  "git": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "github": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "figma": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

const palette = [
  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function getTechBadgeColor(tech: string): string {
  const normalizedTech = tech.toLowerCase().trim();
  
  // 1. Direct match for specific overrides
  if (techColors[normalizedTech]) return techColors[normalizedTech];

  // 2. Partial match for common platforms (optional, can be removed if dynamic is preferred everywhere)
  if (normalizedTech.includes('python')) return techColors['python'];
  if (normalizedTech.includes('react')) return techColors['react'];
  if (normalizedTech.includes('node')) return techColors['node.js'];
  if (normalizedTech.includes('aws')) return techColors['aws'];
  
  // 3. Deterministic Dynamic Color
  const hash = hashCode(normalizedTech);
  const colorIndex = hash % palette.length;
  
  return palette[colorIndex];
}
