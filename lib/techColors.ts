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

export function getTechBadgeColor(tech: string): string {
  const normalizedTech = tech.toLowerCase().trim();
  // Direct match or partial match for common terms
  if (techColors[normalizedTech]) return techColors[normalizedTech];

  if (normalizedTech.includes('python')) return techColors['python'];
  if (normalizedTech.includes('react')) return techColors['react'];
  if (normalizedTech.includes('node')) return techColors['node.js'];
  if (normalizedTech.includes('aws')) return techColors['aws'];
  if (normalizedTech.includes('mongo')) return techColors['mongodb'];
  if (normalizedTech.includes('sql')) return techColors['postgresql'];
  
  // Default fallback
  return "bg-secondary text-secondary-foreground";
}
