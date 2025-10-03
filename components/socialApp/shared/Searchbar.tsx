"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/social-app-ui/input";

interface Props {
    routeType: string;
}

function Searchbar({ routeType }: Props) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    // query after 0.3s of no input

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // اگر routeType با / شروع می‌شود، همان را استفاده کن، وگرنه مسیر کامل بساز
            let basePath = routeType.startsWith("/") ? routeType : `/introduction-projects/social-app/${routeType}`;
            if (!basePath.startsWith("/introduction-projects/social-app/")) {
                basePath = `/introduction-projects/social-app${basePath}`;
            }
            if (search) {
                router.push(`${basePath}?q=${encodeURIComponent(search)}`);
            } else {
                router.push(basePath);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, routeType]);

    return (
        <div className='flex gap-1 rounded-lg bg-dark-3 px-4 py-2'>
            <Image
                src='/threads_assets/search-gray.svg'
                alt='search'
                width={24}
                height={24}
                className='object-contain'
            />
            <Input
                id='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`${routeType !== "/search" ? "Search communities" : "Search creators"
                    }`}
                className='border-none bg-dark-3 text-base-regular text-light-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
            />
        </div>
    );
}

export default Searchbar;