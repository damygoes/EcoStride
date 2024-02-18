import defaultUserIcon from "@assets/user-fallback.svg";
import Avatar from "@components/common/avatar/avatar";
import { useToast } from "@components/common/toast/use-toast";
import { Button } from "@components/ui/button/button";
import { InputField } from "@components/ui/input-field/input-field";
import { Label } from "@components/ui/label/label";
import { Textarea } from "@components/ui/text-area/text-area";
import { ENV_VARIABLES } from "@lib/env";
import { UserProfileFormType } from "@models/user-profile-form-schema";
import { IconCirclePlus } from "@tabler/icons-react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@type-definitions/User";
import { getInitialFormData } from "@utils/user-profile-details/getInitialFormData";
import { useUser } from "@utils/user/user-store";
import { PickerOverlay } from "filestack-react";
import { useEffect, useState } from "react";
import { FileStackConfig } from "../../../services/filestack/filestack-config";

function UserProfile() {
  const { user, fetchUserDetails, updateUserDetails } = useUser();
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const [formData, setFormData] =
    useState<UserProfileFormType>(getInitialFormData());
  const [showImageUploadPicker, setShowImageUploadPicker] =
    useState<boolean>(false);
  const [uploadedAvatar, setUploadedAvatar] = useState("");

  const {
    data: userDetails,
    // isError,
    // isFetching,
  } = useQuery<User>({
    queryKey: ["user-profile-details"],
    queryFn: fetchUserDetails,
    enabled: !!user?.id,
    refetchInterval: 2000, // 2 seconds
  });

  const { mutateAsync: updateUserDetailsMutation } = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile-details"] });
      toast({
        title: "Profile Update",
        description: "Your profile has been updated successfully",
        variant: "success",
      });
    },
  });

  useEffect(() => {
    setFormData(getInitialFormData(userDetails));
  }, [userDetails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("profile.")) {
      const profileFieldName = name.split(
        ".",
      )[1] as keyof typeof formData.profile;
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile: {
          ...prevFormData.profile,
          [profileFieldName]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const transformedData = {
      ...formData,
      avatar: uploadedAvatar || formData.avatar,
      profile: {
        ...formData.profile,
        age: parseInt(formData.profile.age, 10),
        ftp: parseInt(formData.profile.ftp, 10),
        bodyWeight: parseFloat(formData.profile.bodyWeight),
        bikeWeight: parseFloat(formData.profile.bikeWeight),
      },
    };

    await updateUserDetailsMutation(transformedData as User);
  };

  return (
    <div className="flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto rounded-md shadow-sm lg:overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-start w-full h-full gap-5 p-8 overflow-x-hidden overflow-y-auto lg:overflow-hidden"
      >
        {/* Avatar */}
        <div className="flex items-end justify-start gap-4">
          <Avatar
            src={uploadedAvatar || formData.avatar || defaultUserIcon}
            alt={`${user?.firstName}${user?.lastName}'s avatar`}
            fallback="AV"
            size="square"
            className="max-w-32 max-h-32"
          />

          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-xs"
            iconLeft={<IconCirclePlus />}
            onClick={() => setShowImageUploadPicker(true)}
          >
            upload image
          </Button>
          {showImageUploadPicker && (
            <PickerOverlay
              apikey={ENV_VARIABLES.FILESTACK_API_KEY}
              pickerOptions={{
                ...FileStackConfig,

                onUploadDone: (res) => {
                  const url = res.filesUploaded[0].url;
                  setUploadedAvatar(url);
                  setShowImageUploadPicker(false);
                },
              }}
            />
          )}
        </div>
        {/* First Name and Last Name */}
        <div className="w-full grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-start gap-5">
            <Label htmlFor="firstName" className="text-md min-w-36">
              First Name
            </Label>
            <InputField
              className="pl-0 focus:pl-2"
              maskForm
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
            />
          </div>
          <div className="flex items-center justify-start gap-5">
            <Label htmlFor="firstName" className="text-md min-w-36">
              Last Name
            </Label>
            <InputField
              className="pl-0 focus:pl-2"
              maskForm
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
            />
          </div>
        </div>
        {/* Email Address and Bio */}
        <div className="w-full grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-start gap-5">
            <Label htmlFor="firstName" className="text-md min-w-36">
              Email
            </Label>
            <InputField
              className="pl-0 focus:pl-2"
              maskForm
              type="text"
              placeholder="Email Name"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="flex items-center justify-start gap-5">
            <Label htmlFor="firstName" className="text-md min-w-36">
              Bio
            </Label>
            <Textarea
              rows={1}
              maskTextArea
              placeholder="Bio"
              name="profile.bio"
              value={formData.profile.bio}
              onChange={handleChange}
              className="pl-0 focus:pl-2 min-h-8"
            />
          </div>
        </div>
        {/* Ftp and Age */}
        <div className="w-full grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-start gap-5">
            <Label htmlFor="firstName" className="text-md min-w-36">
              Ftp
            </Label>
            <InputField
              className="pl-0 focus:pl-2"
              maskForm
              type="text"
              placeholder={user?.profile?.ftp.toString() ?? "Ftp (watts)"}
              value={formData.profile.ftp}
              onChange={handleChange}
              name="profile.ftp"
            />
          </div>
          <div className="flex items-center justify-start gap-5">
            <Label htmlFor="firstName" className="text-md min-w-36">
              Age
            </Label>

            <InputField
              className="pl-0 focus:pl-2"
              maskForm
              type="text"
              placeholder={user?.profile?.age.toString() ?? "Age"}
              value={formData.profile.age}
              onChange={handleChange}
              name="profile.age"
            />
          </div>
        </div>
        {/* Body and Bike Weight */}
        <div className="w-full grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-start gap-5">
            <Label htmlFor="firstName" className="text-md min-w-36">
              Body Weight
            </Label>
            <InputField
              className="pl-0 focus:pl-2"
              maskForm
              type="text"
              placeholder={
                user?.profile?.bodyWeight.toString() ?? "Body Weight (kg)"
              }
              value={formData.profile.bodyWeight}
              onChange={handleChange}
              name="profile.bodyWeight"
            />
          </div>
          <div className="flex items-center justify-start gap-5">
            <Label htmlFor="firstName" className="text-md min-w-36">
              Bike Weight
            </Label>

            <InputField
              className="pl-0 focus:pl-2"
              maskForm
              type="text"
              placeholder={
                user?.profile?.bikeWeight.toString() ?? "Bike Weight (kg)"
              }
              value={formData.profile.bikeWeight}
              onChange={handleChange}
              name="profile.bikeWeight"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end w-full mt-6 gap-x-6">
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
