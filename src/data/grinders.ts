// Local storage key for grinders
const GRINDERS_STORAGE_KEY = 'coffee-logbook-grinders';

export function saveGrinder(name: string): void {
  const grinders = getGrinders();
  if (!grinders.includes(name)) {
    grinders.push(name);
    localStorage.setItem(GRINDERS_STORAGE_KEY, JSON.stringify(grinders));
  }
}

export function getGrinders(): string[] {
  try {
    const stored = localStorage.getItem(GRINDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}