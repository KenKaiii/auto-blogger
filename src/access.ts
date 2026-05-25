import type { Access, FieldAccess } from "payload";

export const anyone: Access = (): boolean => true;

export const authenticated: Access = ({ req: { user } }): boolean =>
  Boolean(user);

export const authenticatedField: FieldAccess = ({ req: { user } }): boolean =>
  Boolean(user);

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  };
};
