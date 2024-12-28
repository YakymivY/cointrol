export interface HistoricalDataEntry {
    price: number | null;
    change: number | null;
}

export interface HistoricalData {
  [key: string]: HistoricalDataEntry;
}