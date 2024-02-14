import Avatar from "@components/common/avatar/avatar";
import { getRelativeTime } from "@lib/getRelativeTime";
import { cn } from "@lib/utils";
import { IconArrowBackUpDouble, IconTrashX } from "@tabler/icons-react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import type { Comment } from "@type-definitions/Comment";
import { useComment } from "@utils/comment/comment-store";
import { useUser } from "@utils/user/user-store";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CommentTextArea from "./CommentTextArea";

type CommentItemProps = {
  comment: Comment;
  className?: string;
};

function CommentItem({ comment, className }: CommentItemProps) {
  const queryClient = new QueryClient();
  const { user } = useUser();
  const { activitySlug } = useParams();
  const { deleteComment } = useComment();
  const [showReply, setShowReply] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const commentRelativeTime = useMemo(() => {
    return getRelativeTime(comment.createdAt);
  }, [comment.createdAt]);

  const shouldRenderDeleteButton = useMemo(() => {
    return comment.userId.id === user?.id || user?.role === "ADMIN";
  }, [comment.userId.id, user?.id, user?.role]);

  const commentId = useMemo(() => {
    return comment.id;
  }, [comment.id]);

  const { mutateAsync: deleteCommentMutation } = useMutation({
    mutationFn: deleteComment,
    onMutate: () => {
      setIsDeletingComment(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] }).then(() => {
        setIsDeletingComment(false);
      });
    },
  });

  if (!comment) {
    return null;
  }

  // console.log("Comment received: ", comment);

  // Function to toggle the reply area visibility
  // const toggleReply = () => setShowReply((prevShowReply) => !prevShowReply);
  const handleShowReply = () => {
    setShowReply(true);
  };
  const handleHideReply = () => {
    setShowReply(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    const slug = activitySlug ?? ("" as string);
    setIsDeletingComment(true);
    await deleteCommentMutation({ commentId, slug });
    setIsDeletingComment(false);
  };

  // console.log("Comment received: ", comment);

  return (
    <div
      className={cn("flex items-start justify-between w-full gap-4", className)}
    >
      <Avatar src={comment.userId.avatar} alt="user" fallback="AV" size="sm" />
      <div className="relative flex flex-col items-start justify-start flex-1 gap-2 rounded-md text-text-color">
        <div className="flex items-center justify-between w-full gap-4 text-sm">
          <div className="flex items-center justify-start flex-1 gap-2">
            <p className="font-semibold">
              {`${comment.userId.firstName} ${comment.userId.lastName}`}
            </p>
            <p className="font-light">{commentRelativeTime}</p>
            {isDeletingComment && (
              <p className="text-xs italic text-accent">deleting comment...</p>
            )}
          </div>
          <div className="flex items-center justify-start gap-3 ">
            <IconArrowBackUpDouble
              onClick={handleShowReply}
              size={18}
              className="cursor-pointer text-text-color/70 hover:text-text-color"
            />
            {shouldRenderDeleteButton && (
              <IconTrashX
                size={18}
                onClick={() => handleDeleteComment(commentId)}
                className="cursor-pointer text-accent/60 hover:text-accent"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-4">
          <p className="text-sm font-light text-pretty">{comment.text}</p>
        </div>
        {showReply && (
          <CommentTextArea
            placeholder="Reply"
            type="reply"
            parentCommentId={comment.id}
            secondaryFunction={handleHideReply}
          />
          // <div className="flex flex-col items-end justify-start w-full gap-2 mt-2">
          //   <textarea
          //     className="w-full p-2 border rounded-md resize-none border-secondary/30 text-text-color/60"
          //     placeholder="Write a reply..."
          //   />
          //   <div className="flex justify-between gap-3">
          //     <IconX
          //       size={18}
          //       onClick={handleHideReply}
          //       className="cursor-pointer text-secondary/60 hover:text-secondary"
          //     />
          //     <IconSend2
          //       size={18}
          //       className="cursor-pointer text-secondary/60 hover:text-secondary"
          //     />
          //   </div>
          // </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
