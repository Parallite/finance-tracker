import { GetHistoryPeriodsResponseType } from '@/app/api/history-periods/route';
import { Period } from '@/app/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { FC } from 'react'

interface YearSelectorProps {
    period: Period;
    setPeriod: (period: Period) => void;
    years: GetHistoryPeriodsResponseType;
}

export const YearSelector: FC<YearSelectorProps> = ({
    period,
    setPeriod,
    years
}) => {
    const handleChange = (value: string) => {
        setPeriod({
            month: period.month,
            year: parseInt(value)
        })
    }
    return (
        <Select
            value={period.year.toString()}
            onValueChange={handleChange}
        >
            <SelectTrigger className='w-[180px]'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {
                    years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}
