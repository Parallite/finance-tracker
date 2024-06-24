export type Currencies = Currency[];

export interface Currency {
    value: string;
    label: string;
    locale: string;
}

export type TransactionType = "income" | "expense";

export type Timeframe = "month" | "year";

export interface Period {
    year: number;
    month: number
}