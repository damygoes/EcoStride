export type Comment = {
  userId: string;
  commentId: string;
  activityId: string;
  text: string;
  subComments: Comment[];
  createdAt: string;
};
