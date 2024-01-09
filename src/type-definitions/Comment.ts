export type Comment = {
  userId: string;
  id: string;
  text: string;
  subComments: Comment[];
  createdAt: string;
};
