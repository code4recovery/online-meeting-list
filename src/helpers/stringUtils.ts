export function sanitizeQuotes(str: string): string {
    return str
      .replace(/[‘’‛‚]/g, "'")
      .replace(/[“”„‟]/g, '"');
  }  