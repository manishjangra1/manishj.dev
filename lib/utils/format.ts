/**
 * Date and contribution formatting utilities.
 */

export function formatYear(date: Date | string | undefined | null): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return d.getFullYear().toString();
}

export function formatYearRange(
  startDate: Date | string | undefined | null,
  endDate?: Date | string | null,
  current = false
): { startYear: string; endYear: string } {
  const startYear = formatYear(startDate) || '2023';
  if (current || !endDate) {
    return { startYear, endYear: 'Present' };
  }
  const endYear = formatYear(endDate);
  return { startYear, endYear: endYear || 'Present' };
}

/**
 * Normalizes contribution counts into 5 discrete levels (0 to 4).
 * Level 0: 0
 * Level 1: 1 - 3
 * Level 2: 4 - 6
 * Level 3: 7 - 9
 * Level 4: 10+
 */
export function bucketContribution(count: number): number {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

/**
 * Slices 53 weeks of contributions to a target count (e.g. 26 weeks for mobile).
 */
export function sliceContributionWeeks(weeks: number[][], count = 26): number[][] {
  if (!weeks || weeks.length <= count) return weeks;
  return weeks.slice(-count);
}
