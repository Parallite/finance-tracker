import { Card } from '@/components/ui/card';
import React, { FC, ReactNode, useCallback } from 'react'
import CountUp from 'react-countup'

interface StatCardProps {
    formatter: Intl.NumberFormat;
    icon: ReactNode,
    title: string;
    value: number
}

export const StatCard: FC<StatCardProps> = ({
    formatter,
    icon,
    title,
    value
}) => {
    const formatFn = useCallback((value: number) => {
        return formatter.format(value)
    }, [formatter]);

    return (
        <Card className='flex h-24 w-full items-center gap-2 p-4'>
            {icon}
            <div className='flex flex-col items-start gap-0'>
                <p className="text-muted-foreground pl-2">{title}</p>
                <CountUp
                    preserveValue
                    redraw={false}
                    end={value}
                    decimals={2}
                    formattingFn={formatFn}
                    className='text-2xl pl-1'
                />
            </div>
        </Card>
    )
}
