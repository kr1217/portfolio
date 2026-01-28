export const techColors: Record<string, string> = {
  // Languages
  "python": "bg-yellow-500 text-white",
  "javascript": "bg-amber-400 text-black",
  "typescript": "bg-blue-600 text-white",
  
  // Frameworks & Libraries
  "react": "bg-cyan-500 text-white",
  "next.js": "bg-black text-white dark:bg-white dark:text-black",
  "node.js": "bg-green-600 text-white",
  "express": "bg-gray-600 text-white",
  "django": "bg-green-800 text-white",
  "fastapi": "bg-teal-600 text-white",
  "flask": "bg-gray-500 text-white",
  "tensorflow": "bg-orange-500 text-white",
  "pytorch": "bg-red-600 text-white",
  "scikit-learn": "bg-orange-600 text-white",
  "openai": "bg-emerald-600 text-white",
  
  // Databases & Cloud
  "mongodb": "bg-green-500 text-white",
  "postgresql": "bg-blue-700 text-white",
  "mysql": "bg-blue-600 text-white",
  "redis": "bg-red-500 text-white",
  "aws": "bg-orange-500 text-white",
  "docker": "bg-blue-500 text-white",
  "kubernetes": "bg-blue-600 text-white",

  // Tools
  "git": "bg-orange-600 text-white",
  "github": "bg-gray-800 text-white",
  "figma": "bg-purple-600 text-white",
};

const palette = [
  "bg-red-500 text-white",
  "bg-orange-500 text-white",
  "bg-amber-500 text-white",
  "bg-yellow-500 text-white",
  "bg-lime-600 text-white",
  "bg-green-600 text-white",
  "bg-emerald-600 text-white",
  "bg-teal-600 text-white",
  "bg-cyan-600 text-white",
  "bg-sky-600 text-white",
  "bg-blue-600 text-white",
  "bg-indigo-600 text-white",
  "bg-violet-600 text-white",
  "bg-purple-600 text-white",
  "bg-fuchsia-600 text-white",
  "bg-pink-600 text-white",
  "bg-rose-600 text-white",
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
