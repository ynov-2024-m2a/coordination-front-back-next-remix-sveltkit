export const isActionSuccessful = <T>(action?: {
  data?: T;
  serverError?: string;
}): action is { data: T; serverError: undefined } => {
  if (!action) {
    return false;
  }

  if (action.serverError) {
    return false;
  }

  if (!action.data) {
    return false;
  }

  return true;
};
