import { connectToDB } from "@/lib/MongoDbForSocialApp/mongoose";
import User from "@/lib/models/user.model";

export async function createOrUpdateUser(
  clerkId: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: any,
  username: string
) {
  try {
    await connectToDB();
    const update = {
      firstName: first_name || "",
      lastName: last_name || "",
      avatar: image_url || "",
      username: username ? username.toLowerCase() : "",
      onboarded: true,
    } as any;

    const user = await User.findOneAndUpdate(
      { clerkId },
      update,
      { upsert: true, new: true }
    );

    return user;
  } catch (error) {
    console.error("createOrUpdateUser error:", error);
    throw error;
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDB();
    await User.findOneAndDelete({ clerkId });
  } catch (error) {
    console.error("deleteUser error:", error);
    throw error;
  }
}
