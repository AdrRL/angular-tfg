export interface ComplexityMapping {
  low: number;
  average: number;
  high: number;
}

export interface Data {
  id: number,
  minDET: number,
  maxDET: number,
  minRET: number,
  maxRET: number,
  result: string
}

//ILF y EIF
export const complexityILFEIF: Data[] = [
  { id: 1, minDET: 1, maxDET: 19, minRET: 1, maxRET: 1, result: "low" },
  { id: 2, minDET: 1, maxDET: 19, minRET: 2, maxRET: 5, result: "low" },
  { id: 3, minDET: 1, maxDET: 19, minRET: 6, maxRET: Infinity, result: "medium" },
  { id: 4, minDET: 20, maxDET: 50, minRET: 1, maxRET: 1, result: "low" },
  { id: 5, minDET: 20, maxDET: 50, minRET: 2, maxRET: 5, result: "medium" },
  { id: 6, minDET: 20, maxDET: 50, minRET: 6, maxRET: Infinity, result: "high" },
  { id: 7, minDET: 51, maxDET: Infinity, minRET: 1, maxRET: 1, result: "medium" },
  { id: 8, minDET: 51, maxDET: Infinity, minRET: 2, maxRET: 5, result: "high" },
  { id: 9, minDET: 51, maxDET: Infinity, minRET: 6, maxRET: Infinity, result: "high" }
];

//EI
export const complexityEI: Data[] = [
  { id: 1, minDET: 1, maxDET: 4, minRET: 0, maxRET: 1, result: "low" },
  { id: 2, minDET: 1, maxDET: 4, minRET: 2, maxRET: 2, result: "low" },
  { id: 3, minDET: 1, maxDET: 4, minRET: 3, maxRET: Infinity, result: "medium" },
  { id: 4, minDET: 5, maxDET: 15, minRET: 0, maxRET: 1, result: "low" },
  { id: 5, minDET: 5, maxDET: 15, minRET: 2, maxRET: 2, result: "medium" },
  { id: 6, minDET: 5, maxDET: 15, minRET: 3, maxRET: Infinity, result: "high" },
  { id: 7, minDET: 16, maxDET: Infinity, minRET: 0, maxRET: 1, result: "medium" },
  { id: 8, minDET: 16, maxDET: Infinity, minRET: 2, maxRET: 2, result: "high" },
  { id: 9, minDET: 16, maxDET: Infinity, minRET: 3, maxRET: Infinity, result: "high" }
];

//EO y EQ
export const complexityEOEQ: Data[] = [
  { id: 1, minDET: 1, maxDET: 5, minRET: 0, maxRET: 1, result: "low" },
  { id: 2, minDET: 1, maxDET: 5, minRET: 2, maxRET: 3, result: "low" },
  { id: 3, minDET: 1, maxDET: 5, minRET: 4, maxRET: Infinity, result: "medium" },
  { id: 4, minDET: 6, maxDET: 19, minRET: 0, maxRET: 1, result: "low" },
  { id: 5, minDET: 6, maxDET: 19, minRET: 2, maxRET: 3, result: "medium" },
  { id: 6, minDET: 6, maxDET: 19, minRET: 4, maxRET: Infinity, result: "high" },
  { id: 7, minDET: 20, maxDET: Infinity, minRET: 0, maxRET: 1, result: "medium" },
  { id: 8, minDET: 20, maxDET: Infinity, minRET: 2, maxRET: 3, result: "high" },
  { id: 9, minDET: 20, maxDET: Infinity, minRET: 4, maxRET: Infinity, result: "high" }
];

