export const adminProjectKey = {
  all: ["adminProject"] as const,
  lists: () => [...adminProjectKey.all, "list"] as const,
  list: (id: string) => [...adminProjectKey.all, "list", id] as const,
  details: () => [...adminProjectKey.all, "detail"] as const,
  detail: (id: string) => [...adminProjectKey.details(), id] as const,
};
