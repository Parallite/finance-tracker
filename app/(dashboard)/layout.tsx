import React, { ReactNode } from 'react'
import { NavBar } from '@/app/components/NavBar/NavBar'

function layout({ children }: { children: ReactNode }) {
    return (
        <div className='relative flex h-screen w-full flex-col'>
            <NavBar />
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}

export default layout