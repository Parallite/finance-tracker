import React, { FC } from 'react';
import { TbCoins } from "react-icons/tb";

interface LogoProps {
    showWallet?: boolean
}

export const Logo: FC<LogoProps> = ({
    showWallet
}) => {
    return (
        <a href='/' className='flex items-center gap-2'>
            {
                showWallet && <TbCoins className='stroke h-11 w-11 stroke-emerald-600 stroke-[1.5]' />
            }
            <p className='bg-gradient-to-t from-emerald-400 to-rose-700 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent'>
                FinanceTracker
            </p>
        </a>
    )
}