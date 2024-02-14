import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useMemo } from "react";

type CommentReplyToggleProps = {
  commentId: string;
  repliesCount: number;
  isCommentOpen: boolean;
  handleCommentOpen: (commentId: string) => void;
};

function CommentReplyToggle({
  commentId,
  repliesCount,
  isCommentOpen,
  handleCommentOpen,
}: CommentReplyToggleProps) {
  let buttonText;
  const buttonFirstWord = useMemo(() => {
    return isCommentOpen ? "Hide" : "Show";
  }, [isCommentOpen]);

  if (repliesCount === 1) {
    buttonText = "reply";
  }
  if (repliesCount > 1) {
    buttonText = "replies";
  }

  const iconToRender = isCommentOpen ? (
    <IconChevronUp
      size={20}
      className="cursor-pointer group text-text-color/70 hover:text-text-color"
    />
  ) : (
    <IconChevronDown
      size={20}
      className="cursor-pointer group text-text-color/70 hover:text-text-color"
    />
  );

  return (
    <div
      className="flex items-center justify-start gap-1 px-3 text-xs rounded-full cursor-pointer text-text-color w-fit hover:bg-secondary/50"
      onClick={() => handleCommentOpen(commentId)}
    >
      {iconToRender}
      {`${buttonFirstWord} ${repliesCount} ${buttonText}`}
    </div>
  );
}

export default CommentReplyToggle;
