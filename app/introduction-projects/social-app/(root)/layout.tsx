import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import LeftSidebar from "@/components/socialApp/shared/LeftSidebar";
import Bottombar from "@/components/socialApp/shared/Bottombar";
import RightSidebar from "@/components/socialApp/shared/RightSidebar";
import Topbar from "@/components/socialApp/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      signInFallbackRedirectUrl="/introduction-projects/social-app"
    >
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}