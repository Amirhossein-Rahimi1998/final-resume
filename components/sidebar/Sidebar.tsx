"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/SidebarUI";
import { links } from "@/data";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function SidebarDemo() {

    const [open, setOpen] = useState(false);
    console.log(open)
    return (
        <div
            className={cn(
                "flex w-fit max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
                "h-screen",
            )}
        >
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <>
                            <Logo open={open} />
                        </>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "A.H.Rahimi",
                                href: "#",
                                icon: (
                                    <img
                                        src="/sess_0_364044_0_0.jpg"
                                        className="h-7 w-7 shrink-0 rounded-full object-cover"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}
export const Logo = ({ open }: { open: boolean }) => {
    return (
        <a
            href="#"
            className="relative z-20 flex flex-col items-center justify-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <img
              src="/sess_0_364044_0_0.jpg"
              alt="avatar"
              className={`object-contain  ${open ? "w-40 h-40" : "w-10 h-10"} shrink-0 bg-white rounded-full`}
              width={50}
              height={50}
              />

            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                {open ? (<p className="brder border-b-1 border-neutral-400 p-4"> Amirhossein Rahimi</p>) : null}
            </motion.span>
        </a>
    );
};
export const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        </a>
    );
};
