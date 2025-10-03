import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import UserCard from "@/components/socialApp/cards/UserCard";
import Searchbar from "@/components/socialApp/shared/Searchbar";
import Pagination from "@/components/socialApp/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";


async function Page({ searchParams }: { searchParams: any }) {
    // Next.js 14: searchParams باید await شود
    const params = await searchParams;
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/introduction-projects/social-app/onboarding");

    const result = await fetchUsers({
        userId: user.id,
        searchString: params.q,
        pageNumber: params?.page ? +params.page : 1,
        pageSize: 25,
    });

    return (
        <section>
            <h1 className='text-heading2-bold text-light-1 mb-10'>Search</h1>

            <Searchbar routeType='search' />

            <div className='mt-14 flex flex-col gap-9'>
                {result.users.length === 0 ? (
                    <p className='flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4'>No Result</p>
                ) : (
                    <>
                        {result.users.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType='User'
                            />
                        ))}
                    </>
                )}
            </div>

            <Pagination
                path='search'
                pageNumber={params?.page ? +params.page : 1}
                isNext={result.isNext}
            />
        </section>
    );
}

export default Page;