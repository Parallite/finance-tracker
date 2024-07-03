// Removed timezone from date

import { CURRENCIES } from "@/app/constants";

export function DateToUTCDate(date: Date) {
    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        )
    );
}

export function GetFormatterForCurrency(currency: string) {
    const locale = CURRENCIES.find((c) => c.value === currency)?.locale;

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    });
}