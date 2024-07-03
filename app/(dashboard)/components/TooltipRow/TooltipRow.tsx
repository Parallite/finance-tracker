import { cn } from '@/lib/utils';
import React, { FC, useCallback } from 'react'
import CountUp from 'react-countup';

interface TooltipRowProps {
    label: string;
    textColor: string;
    bgColor: string;
    value: number;
    formatter: Intl.NumberFormat;
}

export const TooltipRow: FC<TooltipRowProps> = ({
    label,
    textColor,
    bgColor,
    value,
    formatter
}) => {

    const formattingFn = useCallback((value: number) => {
        return formatter.format(value)
    }, [formatter])
    return (
        <div className='flex items-center gap-2'>
            <div className={cn('h-4 w-4 rounded-full', bgColor)} />
            <div className='flex w-full justify-between'>
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className={cn('text-sm font-bold', textColor)}>
                    <CountUp
                        duration={0.5}
                        preserveValue
                        end={value}
                        decimals={0}
                        formattingFn={formattingFn}
                        className='text-sm'
                    />
                </div>
            </div>
        </div>
    )
}
