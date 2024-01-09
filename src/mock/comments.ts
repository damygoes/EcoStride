import type { Comment } from "@type-definitions/Comment";
export const MOCK_COMMENTS: Comment[] = [
  {
    userId: "user1",
    id: "comment1",
    text: "This is the first comment.",
    createdAt: "2023-01-08T12:00:00.000Z",
    subComments: [
      {
        userId: "user2",
        id: "comment1-1",
        text: "This is a sub-comment to the first comment.",
        createdAt: "2023-01-08T13:00:00.000Z",
        subComments: [],
      },
    ],
  },
  {
    userId: "user3",
    id: "comment2",
    text: "Here is another top-level comment.",
    createdAt: "2023-01-08T14:00:00.000Z",
    subComments: [
      {
        userId: "user4",
        id: "comment2-1",
        text: "A sub-comment to the second comment.",
        createdAt: "2023-01-08T15:00:00.000Z",
        subComments: [
          {
            userId: "user5",
            id: "comment2-1-1",
            text: "Another level of sub-comment.",
            createdAt: "2023-01-08T16:00:00.000Z",
            subComments: [],
          },
        ],
      },
    ],
  },
  {
    userId: "user6",
    id: "comment3",
    text: "Great article!",
    createdAt: "2023-01-09T09:30:00.000Z",
    subComments: [],
  },
  {
    userId: "user7",
    id: "comment4",
    text: "I disagree with the previous comments.",
    createdAt: "2023-01-09T10:15:00.000Z",
    subComments: [
      {
        userId: "user8",
        id: "comment4-1",
        text: "Can you explain why?",
        createdAt: "2023-01-09T11:00:00.000Z",
        subComments: [],
      },
    ],
  },
  {
    userId: "user9",
    id: "comment5",
    text: "I have a question about this topic.",
    createdAt: "2023-01-09T11:45:00.000Z",
    subComments: [],
  },
  {
    userId: "user10",
    id: "comment6",
    text: "This topic is very relevant to current trends.",
    createdAt: "2023-12-09T08:00:00.000Z",
    subComments: [],
  },
  {
    userId: "user11",
    id: "comment7",
    text: "I found this information very useful, thanks!",
    createdAt: "2023-12-09T09:30:00.000Z",
    subComments: [
      {
        userId: "user12",
        id: "comment7-1",
        text: "Glad to hear it was helpful!",
        createdAt: "2023-12-09T10:00:00.000Z",
        subComments: [],
      },
    ],
  },
  {
    userId: "user13",
    id: "comment8",
    text: "There seems to be a mistake in the data presented.",
    createdAt: "2023-12-09T11:15:00.000Z",
    subComments: [],
  },
  {
    userId: "user14",
    id: "comment8-3",
    text: "This is an example of a comment with a very long text.",
    createdAt: "2024-01-09T11:15:00.000Z",
    subComments: [],
  },
  {
    userId: "user15",
    id: "comment8-rst",
    text: "Everyone should try this climb, it's amazing!",
    createdAt: "2024-01-10T00:00:00.000Z",
    subComments: [],
  },
];
