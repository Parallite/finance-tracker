import { GetHistoryPeriodsResponseType } from '@/app/api/history-periods/route';
import { SkeletonWrapper } from '@/app/components/SkeletonWrapper';
import { Period, Timeframe } from '@/app/types'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react'
import { YearSelector } from '../YearSelector';
import { MonthSelector } from '../MonthSelector';

interface HistoryPeriodSelector {
    period: Period;
    setPeriod: (period: Period) => void;
    timeframe: Timeframe;
    setTimeframe: (timeframe: Timeframe) => void;
}
export const HistoryPeriodSelector: FC<HistoryPeriodSelector> = ({
    period,
    setPeriod,
    timeframe,
    setTimeframe
}) => {

    const historyPeriod = useQuery<GetHistoryPeriodsResponseType>({
        queryKey: ["overview", "history", "periods"],
        queryFn: () => fetch('/api/history-periods')
            .then(res => res.json())
    })
    return (
        <div className='flex flex-wrap items-center gap-4'>
            <SkeletonWrapper isLoading={historyPeriod.isFetching} fullWidth={false}>
                <Tabs value={timeframe} onValueChange={value => setTimeframe(value as Timeframe)}>
                    <TabsList>
                        <TabsTrigger value="year">
                            Year
                        </TabsTrigger>
                        <TabsTrigger value="month">
                            Month
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </SkeletonWrapper>
            <div className='flex flex-wrap items-center gap-2'>
                <SkeletonWrapper isLoading={historyPeriod.isFetching} fullWidth={false}>
                    <YearSelector
                        period={period}
                        setPeriod={setPeriod}
                        years={historyPeriod.data || []}
                    />
                </SkeletonWrapper>
                {timeframe === 'month' && (
                    <SkeletonWrapper isLoading={historyPeriod.isFetching} fullWidth={false}>
                        <MonthSelector
                            period={period}
                            setPeriod={setPeriod}
                        />
                    </SkeletonWrapper>
                )}
            </div>
        </div>
    )
}
