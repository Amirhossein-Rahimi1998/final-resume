import LeftSidebar from '@/components/socialApp/LeftSidebar'
import RightSidebar from '@/components/socialApp/RightSidebar'
import React from 'react'

export default function SocialAppLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className='flex justify-between max-w-6xl mx-auto'>
                <div className='hidden sm:inline border-r h-screen sticky top-0'>
                    <LeftSidebar />
                </div>

                <div className='w-2xl flex-1'>{children}</div>
                <div className='lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]'>
                    <RightSidebar />
                </div>
            </div>
        </section>
    )
}
