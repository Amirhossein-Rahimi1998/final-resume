import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/socialApp/shared/Topbar";
import LeftSidebar from "@/components/socialApp/shared/LeftSidebar";
import RightSidebar from "@/components/socialApp/shared/RightSidebar";
import Bottombar from "@/components/socialApp/shared/Bottombar";
// import { dark } from "@clerk/themes";

// import "../../../globals.css";

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
    //   appearance={{
    //     baseTheme: dark,
    //   }}
    afterSignOutUrl="/"
    >
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
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