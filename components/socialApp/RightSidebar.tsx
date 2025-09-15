'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import News from './News';

export default function RightSidebar() {
    const [input, setInput] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        router.push(`/introduction-projects/social-app/search/${input}`);
    };

    return (
        <>
            <div className='sticky top-0 py-2'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='bg-natural-100 border border-gray-400 rounded-3xl text-sm w-full px-4 py-2'
                    />
                </form>
            </div>
            <News />
        </>
    );
}