import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

import { communityTabs } from "@/constants";

import UserCard from "@/components/socialApp/cards/UserCard";
import ThreadsTab from "@/components/socialApp/shared/ThreadsTab";
import ProfileHeader from "@/components/socialApp/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/social-app-ui/tabs";

import { fetchCommunityDetails } from "@/lib/actions/community.actions";

async function Page({ params }: { params: { id: string } }) {
    // Next.js 14: params باید await شود
    const awaitedParams = await params;
    const user = await currentUser();
    if (!user) return null;

    const communityDetails = await fetchCommunityDetails(awaitedParams.id);

    // اگر createdBy وجود نداشت، پروفایل را نمایش نده یا مقدار پیش‌فرض قرار بده
    const createdById = communityDetails?.createdBy?.id || "";
    const threadsCount = Array.isArray(communityDetails?.threads) ? communityDetails.threads.length : 0;

    return (
        <section>
            {createdById && (
                <ProfileHeader
                    accountId={createdById}
                    authUserId={user.id}
                    name={communityDetails?.name}
                    username={communityDetails?.username}
                    imgUrl={communityDetails?.image}
                    bio={communityDetails?.bio}
                    type='Community'
                />
            )}

            <div className='mt-9'>
                <Tabs defaultValue='threads' className='w-full'>
                    <TabsList className='tab'>
                        {communityTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className='object-contain'
                                />
                                <p className='max-sm:hidden'>{tab.label}</p>

                                {tab.label === "Threads" && (
                                    <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                                        {threadsCount}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {communityDetails?._id && (
                        <TabsContent value='threads' className='w-full text-light-1'>
                            {/* @ts-ignore */}
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={communityDetails._id}
                                accountType='Community'
                            />
                        </TabsContent>
                    )}

                    <TabsContent value='members' className='mt-9 w-full text-light-1'>
                        <section className='mt-9 flex flex-col gap-10'>
                            {communityDetails?.members?.map((member: any) => (
                                <UserCard
                                    key={member.id}
                                    id={member.id}
                                    name={member.name}
                                    username={member.username}
                                    imgUrl={member.image}
                                    personType='User'
                                />
                            ))}
                        </section>
                    </TabsContent>

                    {communityDetails?._id && (
                        <TabsContent value='requests' className='w-full text-light-1'>
                            {/* @ts-ignore */}
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={communityDetails._id}
                                accountType='Community'
                            />
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </section>
    );
}

export default Page;