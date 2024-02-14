export type Comment = {
  id: string;
  activitySlug: string;
  userId: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  text: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string;
  replies?: Comment[];
};
