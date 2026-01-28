export const techColors: Record<string, string> = {
  // Languages
  "python": "bg-yellow-500/90 text-white border-yellow-400/50 shadow-sm backdrop-blur-md border",
  "javascript": "bg-amber-400/90 text-black border-amber-300/50 shadow-sm backdrop-blur-md border",
  "typescript": "bg-blue-600/90 text-white border-blue-500/50 shadow-sm backdrop-blur-md border",
  
  // Frameworks & Libraries
  "react": "bg-cyan-500/90 text-white border-cyan-400/50 shadow-sm backdrop-blur-md border",
  "next.js": "bg-black/90 text-white border-gray-600/50 dark:bg-white/90 dark:text-black shadow-sm backdrop-blur-md border",
  "node.js": "bg-green-600/90 text-white border-green-500/50 shadow-sm backdrop-blur-md border",
  "express": "bg-gray-600/90 text-white border-gray-500/50 shadow-sm backdrop-blur-md border",
  "django": "bg-green-800/90 text-white border-green-600/50 shadow-sm backdrop-blur-md border",
  "fastapi": "bg-teal-600/90 text-white border-teal-500/50 shadow-sm backdrop-blur-md border",
  "flask": "bg-gray-500/90 text-white border-gray-400/50 shadow-sm backdrop-blur-md border",
  "tensorflow": "bg-orange-500/90 text-white border-orange-400/50 shadow-sm backdrop-blur-md border",
  "pytorch": "bg-red-600/90 text-white border-red-500/50 shadow-sm backdrop-blur-md border",
  "scikit-learn": "bg-orange-600/90 text-white border-orange-500/50 shadow-sm backdrop-blur-md border",
  "openai": "bg-emerald-600/90 text-white border-emerald-500/50 shadow-sm backdrop-blur-md border",
  
  // Databases & Cloud
  "mongodb": "bg-green-500/90 text-white border-green-400/50 shadow-sm backdrop-blur-md border",
  "postgresql": "bg-blue-700/90 text-white border-blue-600/50 shadow-sm backdrop-blur-md border",
  "mysql": "bg-blue-600/90 text-white border-blue-500/50 shadow-sm backdrop-blur-md border",
  "redis": "bg-red-500/90 text-white border-red-400/50 shadow-sm backdrop-blur-md border",
  "aws": "bg-orange-500/90 text-white border-orange-400/50 shadow-sm backdrop-blur-md border",
  "docker": "bg-blue-500/90 text-white border-blue-400/50 shadow-sm backdrop-blur-md border",
  "kubernetes": "bg-blue-600/90 text-white border-blue-500/50 shadow-sm backdrop-blur-md border",

  // Tools
  "git": "bg-orange-600/90 text-white border-orange-500/50 shadow-sm backdrop-blur-md border",
  "github": "bg-gray-800/90 text-white border-gray-700/50 shadow-sm backdrop-blur-md border",
  "figma": "bg-purple-600/90 text-white border-purple-500/50 shadow-sm backdrop-blur-md border",
};

const palette = [
  "bg-red-500/90 text-white border-red-400/50 shadow-sm backdrop-blur-md border",
  "bg-orange-500/90 text-white border-orange-400/50 shadow-sm backdrop-blur-md border",
  "bg-amber-500/90 text-white border-amber-400/50 shadow-sm backdrop-blur-md border",
  "bg-yellow-500/90 text-white border-yellow-400/50 shadow-sm backdrop-blur-md border",
  "bg-lime-600/90 text-white border-lime-500/50 shadow-sm backdrop-blur-md border",
  "bg-green-600/90 text-white border-green-500/50 shadow-sm backdrop-blur-md border",
  "bg-emerald-600/90 text-white border-emerald-500/50 shadow-sm backdrop-blur-md border",
  "bg-teal-600/90 text-white border-teal-500/50 shadow-sm backdrop-blur-md border",
  "bg-cyan-600/90 text-white border-cyan-500/50 shadow-sm backdrop-blur-md border",
  "bg-sky-600/90 text-white border-sky-500/50 shadow-sm backdrop-blur-md border",
  "bg-blue-600/90 text-white border-blue-500/50 shadow-sm backdrop-blur-md border",
  "bg-indigo-600/90 text-white border-indigo-500/50 shadow-sm backdrop-blur-md border",
  "bg-violet-600/90 text-white border-violet-500/50 shadow-sm backdrop-blur-md border",
  "bg-purple-600/90 text-white border-purple-500/50 shadow-sm backdrop-blur-md border",
  "bg-fuchsia-600/90 text-white border-fuchsia-500/50 shadow-sm backdrop-blur-md border",
  "bg-pink-600/90 text-white border-pink-500/50 shadow-sm backdrop-blur-md border",
  "bg-rose-600/90 text-white border-rose-500/50 shadow-sm backdrop-blur-md border",
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

  // 2. Partial match for common platforms
  if (normalizedTech.includes('python')) return techColors['python'];
  if (normalizedTech.includes('react')) return techColors['react'];
  if (normalizedTech.includes('node')) return techColors['node.js'];
  if (normalizedTech.includes('aws')) return techColors['aws'];
  
  // 3. Deterministic Dynamic Color
  const hash = hashCode(normalizedTech);
  const colorIndex = hash % palette.length;
  
  return palette[colorIndex];
}
