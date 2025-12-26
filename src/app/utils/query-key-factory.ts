export const adminProjectKey = {
  all: ["adminProject"] as const,
  lists: () => [...adminProjectKey.all, "list"] as const,
  list: (id: string) => [...adminProjectKey.all, "list", id] as const,
  details: () => [...adminProjectKey.all, "detail"] as const,
  detail: (id: string) => [...adminProjectKey.details(), id] as const,
};

export const adminNewsKey = {
  all: ["adminNews"] as const,
  lists: () => [...adminNewsKey.all, "list"] as const,
  list: (id: string) => [...adminNewsKey.all, "list", id] as const,
  details: () => [...adminNewsKey.all, "detail"] as const,
  detail: (id: string) => [...adminNewsKey.details(), id] as const,
};
