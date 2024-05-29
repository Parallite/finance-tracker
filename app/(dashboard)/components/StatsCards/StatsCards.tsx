"use client"

import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { SkeletonWrapper } from "@/app/components/SkeletonWrapper";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { UserSettings } from "@prisma/client"
import { useQuery } from "@tanstack/react-query";
import { FC, useMemo } from "react";
import { LuTrendingDown, LuTrendingUp, LuWallet } from "react-icons/lu";
import { StatCard } from "../StatCard";

interface StatsCardsProps {
    from: Date;
    to: Date;
    userSettings: UserSettings;
}

export const StatsCards: FC<StatsCardsProps> = ({
    from,
    to,
    userSettings
}) => {
    const statsQuery = useQuery<GetBalanceStatsResponseType>({
        queryKey: ["overview", "stats", from, to],
        queryFn: () => fetch(`/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`)
            .then((res) => res.json())
    })

    const formatter = useMemo(() => {
        return GetFormatterForCurrency(userSettings.currency)
    }, [userSettings.currency])

    const income = statsQuery.data?.income || 0;
    const expense = statsQuery.data?.expense || 0;

    const balance = income - expense

    return (
        <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
            <SkeletonWrapper isLoading={statsQuery.isFetching} >
                <StatCard
                    formatter={formatter}
                    value={income}
                    title="Income"
                    icon={
                        <LuTrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
                    }
                />
            </SkeletonWrapper>
            <SkeletonWrapper isLoading={statsQuery.isFetching} >
                <StatCard
                    formatter={formatter}
                    value={expense}
                    title="Expense"
                    icon={
                        <LuTrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
                    }
                />
            </SkeletonWrapper>
            <SkeletonWrapper isLoading={statsQuery.isFetching} >
                <StatCard
                    formatter={formatter}
                    value={balance}
                    title="Balance"
                    icon={
                        <LuWallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
                    }
                />
            </SkeletonWrapper>
        </div>
    )
}
