import type { Comment } from "@type-definitions/Comment";
import dayjs from "dayjs";
import { useMemo } from "react";
import CommentItem from "./comment-item";

type CommentListProps = {
  comments: Comment[];
};

const CommentList = ({ comments }: CommentListProps) => {
  const sortedComments = useMemo(() => {
    return comments.sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
    );
  }, [comments]);

  return (
    <div className="w-full p-3 overflow-x-hidden overflow-y-auto md:w-4/5">
      {sortedComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
