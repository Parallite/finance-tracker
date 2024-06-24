import React, { FC } from 'react'
import { TooltipRow } from '../TooltipRow';

interface CustomTooltipProps {
    active?: any;
    payload?: any;
    formatter: any;
}

export const CustomTooltip: FC<CustomTooltipProps> = ({
    active,
    payload,
    formatter
}) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;
    const { expense, income } = data;
    return (
        <div className='min-w-[300px] rounded border bg-background p-4'>
            <TooltipRow
                formatter={formatter}
                label="Expense"
                value={expense}
                bgColor="bg-red-500"
                textColor="text-red-500"
            />
            <TooltipRow
                formatter={formatter}
                label="Income"
                value={income}
                bgColor="bg-emerald-500"
                textColor="text-emerald-500"
            />
            <TooltipRow
                formatter={formatter}
                label="Balance"
                value={income - expense}
                bgColor="bg-gray-500"
                textColor="text-foreground"
            />
        </div>
    )
}
