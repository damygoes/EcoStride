import { axiosClient } from "@services/axios/axios-client";
import { Comment } from "@type-definitions/Comment";

export const useComment = () => {
  const createComment = async (commentData: {
    activitySlug: string | null;
    comment: string;
    parentCommentId?: string | null;
  }) => {
    const text = commentData.comment;
    const parentId = commentData.parentCommentId;

    const response = await axiosClient.post(
      `/activities/${commentData.activitySlug}/comments`,
      {
        text,
        parentId,
      },
    );

    return response.data as Comment;
  };

  const fetchComments = async (activitySlug?: string | null) => {
    const response = await axiosClient.get(
      `/activities/${activitySlug}/comments`,
    );
    return response.data as Comment[];
  };

  const deleteComment = async ({
    commentId,
    slug,
  }: {
    commentId: string;
    slug: string | null;
  }) => {
    const response = await axiosClient.delete(
      `/activities/${slug}/comments/${commentId}`,
    );
    return response.data;
  };

  return {
    createComment,
    fetchComments,
    deleteComment,
  };
};
