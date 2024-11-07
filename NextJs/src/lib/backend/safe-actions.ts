import { createSafeActionClient } from "next-safe-action";
import { logger } from "../logger";

class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type handleServerError = (e: Error) => string;

const handleServerError: handleServerError = (e) => {
  if (e instanceof ActionError) {
    logger.warn("[DEV] - Action Error", e.message);
    return e.message;
  }

  logger.error("[DEV] - Unknown Error", e);

  return "An unexpected error occurred.";
};

export const action = createSafeActionClient({
  handleServerError,
});
