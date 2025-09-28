import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "../introduction-projects/social-app/api/uploadthing/core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // config: { ... },
});
