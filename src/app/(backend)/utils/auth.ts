import { getUserFromRequest, handleApiError } from "./utils";

export function withAuth(
  handler: (req: Request, userId: string) => Promise<Response>
) {
  return async (req: Request) => {
    try {
      const { userId } = getUserFromRequest(req);
      return handler(req, userId);
    } catch (err) {
      return handleApiError(err);
    }
  };
}
