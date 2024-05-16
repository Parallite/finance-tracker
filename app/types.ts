export type Currencies = Currency[];

export interface Currency {
    value: string;
    label: string;
    locale: string;
}

export type TransactionType = "income" | "expense"