import Avatar from "@components/common/avatar/avatar";
import { getRelativeTime } from "@lib/getRelativeTime";
import { cn } from "@lib/utils";
import { IconArrowBackUpDouble } from "@tabler/icons-react";
import type { Comment } from "@type-definitions/Comment";
import { useMemo } from "react";

type CommentItemProps = {
  comment: Comment;
  className?: string;
};

function CommentItem({ comment, className }: CommentItemProps) {
  const commentRelativeTime = useMemo(() => {
    return getRelativeTime(comment.createdAt);
  }, [comment.createdAt]);

  if (!comment) {
    return null;
  }

  return (
    <div
      className={cn("flex items-start justify-between w-full gap-4", className)}
    >
      <Avatar
        src="https://images.unsplash.com/photo-1695808403851-d2bf60f2808c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxjeWNsaW5nJTIwcm9hZHxlbnwwfHwwfHx8Mg%3D%3D"
        alt="user"
        fallback="AV"
        size="sm"
      />
      <div className="relative flex flex-col items-start justify-start flex-1 gap-2 rounded-md text-text-color">
        <div className="flex items-center justify-between w-full gap-4 text-sm">
          <div className="flex items-center justify-start flex-1 gap-2">
            <p className="font-semibold">Username</p>
            <p className="font-light">{commentRelativeTime}</p>
          </div>
          <span className="flex items-center justify-start gap-1 text-xs cursor-pointer hover:text-accent">
            <IconArrowBackUpDouble className="w-4 h-5" /> reply
          </span>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-4">
          <p className="text-sm font-light text-pretty">{comment.text}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
