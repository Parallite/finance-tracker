import { GetHistoryPeriodsResponseType } from '@/app/api/history-periods/route';
import { Period } from '@/app/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { FC } from 'react'

interface MonthSelectorProps {
    period: Period;
    setPeriod: (period: Period) => void;
}

export const MonthSelector: FC<MonthSelectorProps> = ({
    period,
    setPeriod,
}) => {
    const handleChange = (value: string) => {
        setPeriod({
            year: period.year,
            month: parseInt(value)
        })
    }
    return (
        <Select
            value={period.month.toString()}
            onValueChange={handleChange}
        >
            <SelectTrigger className='w-[180px]'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {
                    Array.from({ length: 12 }, (_, i) => i)
                        .map((month) => {
                            const monthStr = new Date(period.year, month, 1).toLocaleString(
                                "default",
                                { month: 'long' }
                            )
                            return (
                                <SelectItem key={month} value={month.toString()}>
                                    {monthStr}
                                </SelectItem>
                            )
                        })
                }
            </SelectContent>
        </Select>
    )
}
