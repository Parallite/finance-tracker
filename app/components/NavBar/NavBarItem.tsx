'use client'

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { FC } from 'react';
import { IconType } from 'react-icons';

interface NavBarItemProps {
    link: string;
    label: string;
    icon: IconType;
    onClick?: () => void;
    active: boolean
}

export const NavBarItem: FC<NavBarItemProps> = ({
    link,
    label,
    onClick,
    icon: Icon,
    active
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

    return (
        <div className='relative flex items-center'>
            <Link
                href={link}
                className={cn(
                    buttonVariants({
                        variant: 'ghost'
                    }),
                    `w-full text-lg text-muted-foreground
                    hover:text-foreground flex justify-between md:justify-start`,
                    active && 'text-foreground'
                )}
                onClick={handleClick}
            >

                <span> {label} </span>
                <Icon className="block h-6 w-6 shrink-0 md:hidden text-orange-500" />
            </Link>
            {
                active && (
                    <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2
                    rounded-xl bg-foreground md:block
                    "></div>
                )
            }
        </div >
    )
}
