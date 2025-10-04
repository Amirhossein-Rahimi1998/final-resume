import React from 'react'
import { SidebarDemo } from '../../components/sidebar/Sidebar';
import Image from 'next/image';
import Container from '@/components/Container';
import CustomBadge from '@/components/ui/profile-ui/CustomBadge';
import SkillsShowcase from '@/components/profile/SkillsShowcase';

const Intro = () => {
    return (
        <div className='flex w-screen h-screen overflow-x-hidden'>
            <section className='flex-none h-full'>
                <SidebarDemo />
            </section>
            <section className='flex-1 h-fit bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-center'>
                <Container>
                    <CustomBadge backgroundColor="bg-teal-400" text="INFORMATION" />
                    <div className="w-1/3 mx-auto flex justify-between items-center">
                        <div className="">
                            <Image
                                src="/sess_0_364044_0_0.jpg"
                                alt='avatar'
                                width={100}
                                height={100}
                                className='rounded-lg'
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <p className='my-2'>Amirhossein Rahimi </p>
                            <p className='my-2'>Fronend Developer</p>
                            <p className='my-2'>ahr.developing@gmail.com</p>
                        </div>
                    </div>
                    <CustomBadge backgroundColor="bg-amber-500" text="SKILLS" />
                    <div className="">
                        <SkillsShowcase />
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Intro;