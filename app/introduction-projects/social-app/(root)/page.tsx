import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/socialApp/cards/ThreadCard";
import Pagination from "@/components/socialApp/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

async function Home({ searchParams }: { searchParams: any }) {
  // `searchParams` is async in newer Next.js versions and should be awaited
  const params = await searchParams;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/introduction-projects/social-app/onboarding");

  const result = await fetchPosts(params?.page ? +params.page : 1, 30);

  return (
    <>
      <h1 className='text-heading2-bold text-light-1 text-left'>Home</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className='flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4'>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='/'
        pageNumber={params?.page ? +params.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;