type CommentCountDisplayProps = {
  commentCount: number;
};

function CommentCountDisplay({ commentCount }: CommentCountDisplayProps) {
  let message = "No Comments";
  if (commentCount === 1) {
    message = "1 Comment";
  } else if (commentCount > 1) {
    message = `${commentCount} Comments`;
  }

  return <p className="text-lg font-medium">{message}</p>;
}

export default CommentCountDisplay;
