import Loader from '@/components/socialApp/Loader'
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <section>
                <ClerkLoading>
                    <Loader />
                </ClerkLoading>
                <ClerkLoaded>
                    {children}
                </ClerkLoaded>
            </section>
        </ClerkProvider>
    )
}
