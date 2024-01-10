import Avatar from "@components/common/avatar/avatar";
import { Button } from "@components/ui/button/button";
import { getRelativeTime } from "@lib/getRelativeTime";
import { IconCornerDownLeftDouble } from "@tabler/icons-react";
import type { Comment } from "@type-definitions/Comment";
import { useMemo } from "react";

type CommentItemProps = {
  comment: Comment;
};

function CommentItem({ comment }: CommentItemProps) {
  const commentRelativeTime = useMemo(() => {
    return getRelativeTime(comment.createdAt);
  }, [comment.createdAt]);

  if (!comment) {
    return null;
  }

  return (
    <div className="flex items-start justify-between w-full gap-4">
      <div>
        <Avatar alt="user" fallback="AV" />
      </div>
      <div className="flex flex-col items-start justify-start flex-1 gap-2 rounded-md text-text-color">
        <div className="flex items-center justify-start w-full gap-2">
          <p className="text-sm font-semibold">Username</p>
          <p className="text-sm font-light">{commentRelativeTime}</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-4">
          <p className="text-sm font-light text-pretty">{comment.text}</p>
          <div className="flex items-center justify-end w-full">
            <Button
              variant="ghost"
              size="sm"
              iconLeft={<IconCornerDownLeftDouble />}
            >
              Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
