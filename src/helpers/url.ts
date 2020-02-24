export function domain(url: string): string {
  return new URL(url).hostname;
}
