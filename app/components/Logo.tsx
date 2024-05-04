import React, { FC } from 'react';
import { LuWallet } from 'react-icons/lu';

interface LogoProps {
    showWallet?: boolean
}

export const Logo: FC<LogoProps> = ({
    showWallet
}) => {
    return (
        <a href='/' className='flex items-center gap-2'>
            {
                showWallet && <LuWallet className='stroke h-11 w-11 stroke-amber-500 stroke-[1.5]' />
            }
            <p className='bg-gradient-to-t from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent'>
                WalletTracker
            </p>
        </a>
    )
}