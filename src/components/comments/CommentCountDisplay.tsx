import { useTranslation } from "react-i18next";

type CommentCountDisplayProps = {
  commentCount: number;
};

function CommentCountDisplay({ commentCount }: CommentCountDisplayProps) {
  const { t } = useTranslation();
  let message = `${t("comment.no-comments")}`;
  if (commentCount === 1) {
    message = `${commentCount} ${t("comment.comment")}`;
  } else if (commentCount > 1) {
    message = `${commentCount} ${t("comment.comments")}`;
  }

  return <p className="text-lg font-medium">{message}</p>;
}

export default CommentCountDisplay;
