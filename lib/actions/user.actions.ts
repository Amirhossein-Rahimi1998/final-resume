"use server";
// دریافت کاربر بر اساس _id یا clerkId (برای صفحه پروفایل)
import mongoose from "mongoose";
export async function fetchUserById(id: string) {
  try {
    await connectToDB();
    // اگر id یک ObjectId معتبر نبود، فرض کن clerkId است و با آن جستجو کن
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // استفاده از همان منطق fetchUser
      return await User.findOne({ clerkId: id }).populate({
        path: "communities",
        model: Community,
      });
    }
    // در غیر این صورت با _id جستجو کن
    return await User.findById(id).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user by id: ${error.message}`);
  }
}

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";

import { connectToDB } from "@/lib/MongoDbForSocialApp/mongoose";

export async function fetchUser(userId: string) {
  try {
    await connectToDB();
    return await User.findOne({ clerkId: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    await connectToDB();
    await User.findOneAndUpdate(
      { clerkId: userId },
      {
        username: username.toLowerCase(),
        firstName: name.split(" ")[0] || "",
        lastName: name.split(" ")[1] || "",
        avatar: image,
        bio: bio || "",
        onboarded: true,
      },
      { upsert: true }
    );
    if (path === "/introduction-projects/social-app/profile/edit") {
      revalidatePath(path);
    }
    // اگر کاربر در مسیر آنبوردینگ یا مسیر اصلی بود، مسیر اصلی را invalidate کن
    if (
      path === "/introduction-projects/social-app/onboarding" ||
      path === "/introduction-projects/social-app"
    ) {
      revalidatePath("/introduction-projects/social-app");
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    await connectToDB();
    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ clerkId: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "firstName lastName avatar clerkId", // Select the correct fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    await connectToDB();
    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;
    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");
    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      clerkId: { $ne: userId }, // Exclude the current user from the results.
    };
    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
      ];
    }
    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };
    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);
    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);
    const users = await usersQuery.exec();
    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;
    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getActivity(userId: string) {
  try {
    await connectToDB();

    // Find all threads created by the user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
