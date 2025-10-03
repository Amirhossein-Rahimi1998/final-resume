import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    const msg = "Missing MongoDB URL (process.env.MONGODB_URL). Skipping DB connection.";
    console.warn(msg);
    throw new Error(msg);
  }

  // If already connected, return early
  if (mongoose.connection.readyState === 1) {
    // 1 = connected
    isConnected = true;
    return;
  }

  // Connection options. Note: `useNewUrlParser` and `useUnifiedTopology` are
  // no longer needed with mongodb driver v4+; avoid passing them to prevent warnings.
  const connectOptions: mongoose.ConnectOptions = {
    // Allow a longer selection timeout for SRV DNS lookups
    serverSelectionTimeoutMS: 15000,
  };

  // Simple retry/backoff loop for transient DNS/timeout errors (e.g., querySrv ETIMEOUT)
  const maxAttempts = 3;
  let attempt = 0;
  let lastError: any = null;

  while (attempt < maxAttempts && !isConnected) {
    attempt += 1;
    try {
      await mongoose.connect(mongoUrl, connectOptions);
      isConnected = true;
      console.log("MongoDB connected");
      break;
    } catch (error) {
      lastError = error;
      isConnected = false;
      console.warn(`MongoDB connection attempt ${attempt} failed:`, error);
      // Exponential backoff before retrying
      const backoffMs = 500 * Math.pow(2, attempt - 1);
      await new Promise((res) => setTimeout(res, backoffMs));
    }
  }

  if (!isConnected) {
    console.error("MongoDB connection error (all attempts failed):", lastError);
    // Re-throw so callers know the DB is not available
    throw lastError;
  }
};