'use client'

import { MAX_DATE_RANGE_DAYS } from '@/app/constants';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { UserSettings } from '@prisma/client'
import { differenceInDays, startOfMonth } from 'date-fns';
import React, { FC, useState } from 'react'
import { toast } from 'sonner';

interface OverviewProps {
    userSettings: UserSettings;
}

interface Range {
    from: Date | undefined;
    to: Date | undefined;
}

interface PickerData {
    range: Range;
    rangeCompare?: Range | undefined;
}

export const Overview: FC<OverviewProps> = ({
    userSettings
}) => {
    const [dateRange, setDateRange] = useState<Range>({
        from: startOfMonth(new Date()),
        to: new Date()
    })

    const handleUpdateDate = (values: PickerData) => {
        const { from, to } = values.range;
        if (!from || !to) return
        if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
            toast.error(`The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS}!`)
            return
        };
        setDateRange({ from, to })
    }

    return (
        <>
            <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
                <h2 className='text-3xl font-bold'>
                    Overview
                </h2>
                <div className="flex items-center gap-3">
                    <DateRangePicker
                        onUpdate={handleUpdateDate}
                        initialDateFrom={dateRange.from}
                        initialDateTo={dateRange.to}
                        showCompare={false}
                    />
                </div>
            </div>
        </>
    )
}
