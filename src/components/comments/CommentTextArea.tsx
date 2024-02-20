import defaultUserIcon from "@assets/user-fallback.svg";
import Avatar from "@components/common/avatar/avatar";
import { Button } from "@components/ui/button/button";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useComment } from "@utils/comment/comment-store";
import { useUser } from "@utils/user/user-store";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
interface CommentTextAreaProps {
  placeholder: string;
  parentCommentId?: string;
  type?: "comment" | "reply";
  secondaryFunction?: () => void;
}

function CommentTextArea({
  placeholder,
  parentCommentId,
  type = "comment",
  secondaryFunction,
}: CommentTextAreaProps) {
  const queryClient = new QueryClient();
  const { activitySlug } = useParams();
  const { user } = useUser();
  const { t } = useTranslation();
  const { createComment } = useComment();
  const navigate = useNavigate();
  const currentURL = useLocation();
  const [newComment, setNewComment] = useState("");
  const [showCommentActionButtons, setShowCommentActionButtons] =
    useState(false);
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const slug = useMemo(() => {
    return activitySlug ?? ("" as string);
  }, [activitySlug]);

  const { mutateAsync: createCommentMutation } = useMutation({
    mutationFn: createComment,
    onMutate: () => {
      setIsCreatingComment(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] }).then(() => {
        setIsCreatingComment(false); // Now reset loading state after comments are refetched
        setNewComment(""); // Reset comment input
        setShowCommentActionButtons(false); // Hide action buttons
        secondaryFunction && secondaryFunction(); // Run secondary function if provided
      });
    },
  });

  const handleTextareaFocus = () => {
    setShowCommentActionButtons(true);
  };

  const handleCommentTyping = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewComment(event.currentTarget.value);
  };

  const handleCancelComment = () => {
    setNewComment("");
    setShowCommentActionButtons(false);
    secondaryFunction && secondaryFunction();
  };

  const handleCreateComment = async () => {
    // Handle creating a new comment only for authenticated users
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    }
    // This function will handle both new comments and replies based on parentCommentId
    const commentData = {
      activitySlug: slug,
      comment: newComment,
      parentCommentId: parentCommentId, // This will be undefined if not replying, which is fine
    };
    await createCommentMutation(commentData);
  };

  return (
    <div className="w-full">
      <label htmlFor="comments-about-activity" className="sr-only">
        {t("comment.comments-label")}
      </label>

      <div className="flex items-start justify-start gap-3 overflow-hidden">
        <Avatar
          src={user?.avatar || defaultUserIcon}
          alt={`${user?.firstName} ${user?.lastName}'s Avatar`}
          fallback="AV"
          size="sm"
        />
        <textarea
          id="activity-comments"
          className="w-full p-2 align-top border border-t-0 border-solid resize-none bg-background border-text-color/20 border-x-0 sm:text-sm"
          rows={1}
          placeholder={placeholder}
          value={newComment}
          onChange={(event) => handleCommentTyping(event)}
          onFocus={handleTextareaFocus}
        />
      </div>
      {showCommentActionButtons && (
        <div className="flex items-center justify-end gap-4 py-3">
          {isCreatingComment && (
            <p className="text-xs italic text-text-color">
              {t("comment.creating-comment")}
            </p>
          )}
          <Button variant="ghost" size="xs" onClick={handleCancelComment}>
            {t("comment.cancel-comment")}
          </Button>
          <Button
            size="xs"
            className="rounded-full justify-self-end"
            onClick={handleCreateComment}
            disabled={!newComment.trim()}
          >
            {type === "comment"
              ? `${t("comment.comment")}`
              : `${t("comment.reply")}`}
          </Button>
        </div>
      )}
    </div>
  );
}

export default CommentTextArea;
