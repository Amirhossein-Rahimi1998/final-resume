export const sidebarLinks = [
  {
  imgURL: "/threads_assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
  imgURL: "/threads_assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
  imgURL: "/threads_assets/heart.svg",
    route: "/activity",
    label: "Activity",
  },
  {
  imgURL: "/threads_assets/create.svg",
    route: "/create-thread",
    label: "Create Thread",
  },
  {
  imgURL: "/threads_assets/community.svg",
    route: "/communities",
    label: "Communities",
  },
  {
  imgURL: "/threads_assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/threads_assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/threads_assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/threads_assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/threads_assets/reply.svg" },
  { value: "members", label: "Members", icon: "/threads_assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/threads_assets/request.svg" },
];
