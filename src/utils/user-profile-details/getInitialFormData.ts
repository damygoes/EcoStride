import { UserProfileFormType } from "@models/user-profile-form-schema";
import { User } from "@type-definitions/User";

export function getInitialFormData(user?: User): UserProfileFormType {
  // This assumes that a user profile details can be undefined initially
  return {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    profile: {
      bio: user?.profile?.bio || "",
      age: user?.profile?.age ? user?.profile?.age.toString() : "",
      ftp: user?.profile?.ftp ? user?.profile?.ftp.toString() : "",
      bodyWeight: user?.profile?.bodyWeight
        ? user?.profile?.bodyWeight.toString()
        : "",
      bikeWeight: user?.profile?.bikeWeight
        ? user?.profile?.bikeWeight.toString()
        : "",
    },
  };
}
