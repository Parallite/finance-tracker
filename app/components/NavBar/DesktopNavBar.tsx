'use client'

import React from 'react'
import { Logo } from '@/components/Logo'
import { NavBarItem } from '@/app/components/NavBar/NavBarItem'
import { UserButton } from '@clerk/nextjs'
import { ThemeSwitcherBtn } from '@/components/ThemeSwitcherBtn'
import { useRoutes } from '@/app/hooks/useRoutes'

export const DesktopNavBar = () => {
    const routes = useRoutes();

    return (
        <div className='hidden border-separate border-b bg-background md:block'>
            <nav className='container flex items-center justify-between px-8'>
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <Logo showWallet />
                    <div className='flex h-full'>
                        {routes.map((item) => (
                            <NavBarItem
                                key={item.label}
                                link={item.href}
                                label={item.label}
                                active={item.active}
                                icon={item.icon}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeSwitcherBtn />
                    <UserButton afterSignOutUrl='/sign-in' />
                </div>
            </nav>
        </div>
    )
}
