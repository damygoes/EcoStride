import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import type { Comment } from "@type-definitions/Comment";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import CommentItem from "./comment-item";

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

  return (
    <div className="flex flex-col items-start justify-start w-full gap-3 p-3 overflow-x-hidden overflow-y-auto md:w-11/12">
      {sortedComments.map((comment) => (
        <div
          key={comment.commentId}
          className="flex flex-col items-start justify-start w-full gap-2 rounded-md"
        >
          <div className="flex items-start justify-between w-full gap-3">
            <CommentItem comment={comment} className="flex-1" />
            {comment.subComments &&
              comment.subComments.length > 0 &&
              (openComments[comment.commentId] ? (
                <IconChevronUp
                  size={20}
                  onClick={() => handleCommentOpen(comment.commentId)}
                  className="cursor-pointer text-text-color hover:text-accent"
                />
              ) : (
                <IconChevronDown
                  size={20}
                  onClick={() => handleCommentOpen(comment.commentId)}
                  className="cursor-pointer text-text-color hover:text-accent"
                />
              ))}
          </div>
          {openComments[comment.commentId] && (
            <div className="flex flex-col items-start justify-start w-full gap-3 p-3 overflow-x-hidden overflow-y-auto rounded-md shadow-sm md:w-11/12 bg-gradient-to-br from-white to-text-color/20">
              <CommentList comments={comment.subComments} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
