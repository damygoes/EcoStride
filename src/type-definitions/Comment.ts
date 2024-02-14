export type Comment = {
  id: string;
  activitySlug: string;
  userId: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  text: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string;
  replies?: Comment[];
};

/**
 * {
    "activitySlug": "paris-seine-river-morning-run",
    "userId": {
      "id": "65c9fa34e75e34c21fd83e65",
      "firstName": "Damilola",
      "lastName": "Bada",
      "avatar": "https://lh3.googleusercontent.com/a/ACg8ocLb5idy9-3BGngJRuKXzt0irMZC5EpaPaGCABWcveMnQvg=s96-c"
    },
    "text": "Perfect trail for a morning run!",
    "replies": [
      {
        "id": "65ccbffa5857003ce9370e2d",
        "activitySlug": "paris-seine-river-morning-run",
        "userId": {
          "id": "65c9fa34e75e34c21fd83e65",
          "firstName": "Damilola",
          "lastName": "Bada",
          "avatar": "https://lh3.googleusercontent.com/a/ACg8ocLb5idy9-3BGngJRuKXzt0irMZC5EpaPaGCABWcveMnQvg=s96-c"
        },
        "text": "How long did it take you to finish the trail?",
        "createdAt": "2024-02-14T13:28:26.834Z",
        "updatedAt": "2024-02-14T13:28:26.834Z",
        "parentId": "65ccbfc65857003ce9370df3"
      }
    ],
    "createdAt": "2024-02-14T13:27:34.133Z",
    "updatedAt": "2024-02-14T13:28:26.855Z",
    "id": "65ccbfc65857003ce9370df3"
  }
 */
