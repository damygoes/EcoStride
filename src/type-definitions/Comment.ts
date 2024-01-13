export type Comment = {
  userId: string;
  commentId: string;
  climbId: string;
  text: string;
  subComments: Comment[];
  createdAt: string;
};