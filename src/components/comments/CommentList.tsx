import type { Comment } from "@type-definitions/Comment";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import CommentItem from "./CommentItem";
import CommentReplyToggle from "./CommentReplyToggle";

type CommentListProps = {
  comments: Comment[];
};

type OpenCommentsState = Record<string, boolean>;

const CommentList = ({ comments }: CommentListProps) => {
  // State to track open comments.
  const [openComments, setOpenComments] = useState<OpenCommentsState>({});
  const sortedComments = useMemo(() => {
    return comments.sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
    );
  }, [comments]);

  const handleCommentOpen = (commentId: string) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId], // Toggle the state for the specific comment
    }));
  };

  if (!comments) {
    return null;
  }

  return (
    <div className="flex flex-col items-start justify-start w-full gap-3 p-3 overflow-x-hidden overflow-y-auto md:w-11/12">
      {sortedComments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col items-start justify-start w-full gap-2 rounded-md"
        >
          <div className="flex items-start justify-between w-full gap-3">
            <CommentItem comment={comment} className="flex-1" />
            {comment.replies && comment.replies.length > 0 && (
              <CommentReplyToggle
                commentId={comment.id}
                repliesCount={comment.replies.length}
                isCommentOpen={openComments[comment.id]}
                handleCommentOpen={handleCommentOpen}
              />
            )}
          </div>
          {openComments[comment.id] && (
            <div className="flex flex-col items-start justify-start w-full gap-3 px-4 overflow-x-hidden overflow-y-auto rounded-md md:w-11/12">
              <CommentList comments={comment.replies ?? []} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
