import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/socialApp/shared/ThreadsTab";
import ProfileHeader from "@/components/socialApp/shared/ProfileHeader";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/social-app-ui/tabs";

import { fetchUserById } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {


    // Next.js 14: params باید await شود
    const awaitedParams = await params;
    const user = await currentUser();
    if (!user) {
        redirect("/introduction-projects/social-app/sign-in");
    }

    const userInfo = await fetchUserById(awaitedParams.id);

    // اگر کاربر پیدا نشد یا آنبورد نشده بود، و کاربر فعلی همان کاربر پروفایل است، به آنبوردینگ ریدایرکت کن
    if (!userInfo || !userInfo.onboarded) {
        if (user.id === awaitedParams.id) {
            redirect("/introduction-projects/social-app/onboarding");
        } else {
            // اگر کاربر دیگر پیدا نشد، می‌توان صفحه 404 یا پیام مناسب نمایش داد
            return <div className="text-light-1 p-8">User not found or not onboarded.</div>;
        }
    }

    return (
        <section>
            <ProfileHeader
                accountId={userInfo._id?.toString?.() || userInfo.id}
                authUserId={user.id}
                name={`${userInfo.firstName || ""} ${userInfo.lastName || ""}`.trim()}
                username={userInfo.username}
                imgUrl={userInfo.avatar}
                bio={userInfo.bio || ""}
            />

            <div className='mt-9'>
                <Tabs defaultValue='threads' className='w-full'>
                    <TabsList className='tab'>
                        {profileTabs.map((tab) => (
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
                                        {Array.isArray(userInfo.threads) ? userInfo.threads.length : 0}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent
                            key={`content-${tab.label}`}
                            value={tab.value}
                            className='w-full text-light-1'
                        >
                            {/* @ts-ignore */}
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={userInfo._id?.toString?.() || userInfo.id}
                                accountType='User'
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}
export default Page;