'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { LuMenu } from "react-icons/lu";
import React, { useState } from 'react'
import { Logo } from '@/components/Logo'
import { NavBarItem } from '@/app/components/NavBar/NavBarItem'
import { ThemeSwitcherBtn } from '@/components/ThemeSwitcherBtn'
import { UserButton } from '@clerk/nextjs'
import { useRoutes } from '@/hooks/useRoutes'

export const MobileNavBar = () => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className='block border-separate bg-background md:hidden'>
            <nav className="container flex items-center justify-between px-8">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <LuMenu size={24} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-[400px] sm:w-[540px]'
                        side='left'
                    >
                        <Logo showWallet />
                        <div className='flex flex-col gap-1 pt-4'>
                            {routes.map((item) => (
                                <NavBarItem
                                    key={item.label}
                                    link={item.href}
                                    label={item.label}
                                    active={item.active}
                                    icon={item.icon}
                                    onClick={() => setIsOpen(prev => !prev)}
                                />
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <Logo />
                </div>
                <div className="flex items-center gap-2">
                    <ThemeSwitcherBtn />
                    <UserButton afterSignOutUrl='/sign-in' />
                </div>
            </nav>
        </div>
    )
}
