import React from 'react'
import { DesktopNavBar } from '@/app/components/NavBar/DesktopNavBar'
import { MobileNavBar } from '@/app/components/NavBar/MobileNavBar'

export const NavBar = () => {
    return (
        <>
            <DesktopNavBar />
            <MobileNavBar />
        </>
    )
}
