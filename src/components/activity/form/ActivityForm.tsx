import ActivityTypeSelect from "@components/common/activity-type-select/activity-type-select";
import CitySelect from "@components/common/city-select/city-select";
import ClimbCategorySelect from "@components/common/climb-category-select/climb-category-select";
import CountrySelect from "@components/common/country-select/country-select";
import DifficultyLevelSelect from "@components/common/difficulty-level-select/difficulty-level-select";
import RouteTypeSelect from "@components/common/route-type-select/route-type-select";
import StateSelect from "@components/common/state-select/state-select";
import TipTapRichTextEditor from "@components/common/tiptap-rich-text-editor/tiptap-rich-text-editor";
import { Button } from "@components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormGroup,
  FormItem,
  FormLabel,
} from "@components/ui/form/form";
import { InputField } from "@components/ui/input-field/input-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { ENV_VARIABLES } from "@lib/env";
import {
  ActivityFormSchema,
  ActivityFormType,
} from "@models/activity-form-schema";
import { IconPhoto } from "@tabler/icons-react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Activity, ActivityRequestObject } from "@type-definitions/Activity";
import { useActivityActions } from "@utils/activity/activity-actions-store";
import { useActivityForm } from "@utils/activity/activity-form-store";
import { useActivity } from "@utils/activity/activity-store";
import { PickerOverlay } from "filestack-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { default as ActivityFormSection } from "./ActivityFormSection";

const ActivityForm = () => {
  const queryClient = new QueryClient();
  const { setIsActivityRequestModalOpen } = useActivityActions();
  const { existingActivity, resetExistingActivity } = useActivityForm();
  const { createActivity, updateActivity } = useActivity();
  const [showImageUploadPicker, setShowImageUploadPicker] =
    useState<boolean>(false);
  const [shouldRenderClimbCategorySelect, setShouldRenderClimbCategorySelect] =
    useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    existingActivity?.address.country ?? "",
  );
  const [selectedState, setSelectedState] = useState<string>(
    existingActivity?.address.state ?? "",
  );
  const [uploadedPhotoUrls, setUploadedPhotoUrls] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState(
    existingActivity?.tags?.join(", ") ?? "",
  );
  const [richTextDescription, setRichTextDescription] = useState<string>(
    existingActivity?.description ?? "",
  );

  const form = useForm<ActivityFormType>({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: {
      name: existingActivity?.name ?? "",
      description: "",
      distance: existingActivity?.distance.toString() ?? "",
      elevationGain: existingActivity?.elevationGain.toString() ?? "",
      minimumGrade: existingActivity?.minimumGrade?.toString() ?? "",
      maximumGrade: existingActivity?.maximumGrade?.toString() ?? "",
      averageGrade: existingActivity?.averageGrade.toString() ?? "",
      timeToComplete: existingActivity?.timeToComplete?.toString() ?? "",
      difficultyLevel: existingActivity?.difficultyLevel ?? "",
      activityType: existingActivity?.activityType ?? "Bike",
      routeType: existingActivity?.routeType ?? "",
      climbCategory: existingActivity?.climbCategory ?? "",
      photos: existingActivity?.photos ?? [],
      tags: [],
      address: {
        city: existingActivity?.address.city ?? "",
        state: existingActivity?.address.state ?? "",
        country: existingActivity?.address.country ?? "",
      },
      startCoordinate: {
        latitude: existingActivity?.startCoordinate?.latitude?.toString() ?? "",
        longitude:
          existingActivity?.startCoordinate?.longitude?.toString() ?? "",
      },
      endCoordinate: {
        latitude: existingActivity?.endCoordinate?.latitude?.toString() ?? "",
        longitude: existingActivity?.endCoordinate?.longitude?.toString() ?? "",
      },
    },
  });

  const activityType = form.watch("activityType");
  const routeType = form.watch("routeType");

  useEffect(() => {
    if (activityType === "Bike" && routeType === "Hilly") {
      setShouldRenderClimbCategorySelect(true);
    } else {
      setShouldRenderClimbCategorySelect(false);
    }
  }, [activityType, routeType]);

  const handleDescriptionChange = (value: string) => {
    setRichTextDescription(value);
    form.setValue("description", value);
  };

  const { mutateAsync: createActivityMutation } = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
  const { mutateAsync: updateActivityMutation } = useMutation({
    mutationFn: updateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  // Submit handler.
  const onSubmit: SubmitHandler<ActivityFormType> = async (data) => {
    // Convert tagsInput string to an array of trimmed strings
    const tagsArray = tagsInput.split(",").map((tag) => tag.trim());

    // Create a new form submission object with tagsArray
    const transformedForm = {
      ...data,
      distance: parseFloat(data.distance),
      elevationGain: parseFloat(data.elevationGain),
      minimumGrade: parseFloat(data.minimumGrade ?? ""),
      maximumGrade: parseFloat(data.maximumGrade ?? ""),
      averageGrade: parseFloat(data.averageGrade),
      timeToComplete: parseFloat(data.timeToComplete ?? ""),
      startCoordinate: {
        latitude: parseFloat(data.startCoordinate.latitude),
        longitude: parseFloat(data.startCoordinate.longitude),
      },
      endCoordinate: {
        latitude: parseFloat(data.endCoordinate.latitude),
        longitude: parseFloat(data.endCoordinate.longitude),
      },
      tags: tagsArray,
    };

    const transformedActivityUpdateForm = {
      ...transformedForm,
      slug: existingActivity?.slug,
    };

    if (existingActivity) {
      // Update Function

      await updateActivityMutation(transformedActivityUpdateForm as Activity);
    } else {
      // Create Function
      await createActivityMutation(transformedForm as ActivityRequestObject);
    }
    form.reset();
    handleClose();
  };

  const handleClose = () => {
    resetExistingActivity();
    form.reset();
    setIsActivityRequestModalOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-start w-full h-full gap-3 overflow-x-hidden overflow-y-auto"
      >
        {/* Information Section */}
        <ActivityFormSection title="Activity Information" className="pb-2">
          <p className="mt-1 text-sm font-light leading-6 text-text-color/60">
            We will review your request and get back to you as soon as possible.
          </p>
        </ActivityFormSection>
        {/* Grid Container */}
        <div className="grid w-full h-full grid-cols-1 gap-4 lg:grid-cols-2">
          <ActivityFormSection>
            {/* Activity Name */}
            <FormGroup className="grid-cols-1 lg:col-start-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Activity Name</FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder="Name of the activity"
                        {...field}
                        isErrored={form.formState.errors.name ? true : false}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            {/* Activity Description */}
            <FormGroup className="grid-cols-1 my-2 lg:col-start-1">
              <FormField
                control={form.control}
                name="description"
                render={() => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <TipTapRichTextEditor
                        richText={richTextDescription}
                        onChange={handleDescriptionChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            {/* Country, State and City Inputs */}
            <FormGroup className="grid-cols-3 mt-2 lg:col-start-1">
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Country</FormLabel>
                    <FormControl>
                      <CountrySelect
                        selectedCountry={selectedCountry}
                        onChange={(value) => {
                          field.onChange(value);
                          setSelectedCountry(value);
                        }}
                        isErrored={
                          form.formState.errors.address?.country ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <FormControl>
                      <StateSelect
                        selectedCountry={selectedCountry}
                        selectedState={selectedState}
                        onChange={(value) => {
                          field.onChange(value);
                          setSelectedState(value);
                        }}
                        isErrored={
                          form.formState.errors.address?.state ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <CitySelect
                        selectedCountry={selectedCountry}
                        selectedState={selectedState}
                        selectedCity={field.value as string}
                        onChange={(value) => field.onChange(value)}
                        isErrored={
                          form.formState.errors.address?.city ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
          </ActivityFormSection>
          {/* Activity, Route Type and Technical Details */}
          <ActivityFormSection className="border-none lg:col-start-2">
            <p className="mb-2 text-lg font-semibold leading-6 text-text-color/80">
              Technical Details
            </p>
            <FormGroup className="grid-cols-4 my-2">
              <FormField
                control={form.control}
                name="activityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Activity Type</FormLabel>
                    <FormControl>
                      <ActivityTypeSelect
                        selectedActivityType={field.value as string}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        isErrored={
                          form.formState.errors.activityType ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="routeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Route Type</FormLabel>
                    <FormControl>
                      <RouteTypeSelect
                        selectedRouteType={field.value as string}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        isErrored={
                          form.formState.errors.routeType ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficultyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Difficulty Level</FormLabel>
                    <FormControl>
                      <DifficultyLevelSelect
                        selectedDifficultyLevel={field.value as string}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        isErrored={
                          form.formState.errors.difficultyLevel ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {shouldRenderClimbCategorySelect && (
                <FormField
                  control={form.control}
                  name="climbCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Climb Category</FormLabel>
                      <FormControl>
                        <ClimbCategorySelect
                          selectedClimbCategory={field.value as string}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          isErrored={
                            form.formState.errors.climbCategory ? true : false
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </FormGroup>
            <FormGroup className="grid-cols-3 my-2">
              <FormField
                control={form.control}
                name="minimumGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Min. Grade <span className="text-xs italic">(%)</span>
                    </FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder="Min. Grade (%)"
                        {...field}
                        isErrored={
                          form.formState.errors.minimumGrade ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maximumGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Max. Grade<span className="text-xs italic">(%)</span>
                    </FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder="Max. Grade (%)"
                        {...field}
                        isErrored={
                          form.formState.errors.maximumGrade ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="averageGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>
                      Avg. Grade <span className="text-xs italic">(%)</span>
                    </FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder="Avg. Grade (%)"
                        {...field}
                        isErrored={
                          form.formState.errors.averageGrade ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            <FormGroup className="grid-cols-3 my-2">
              <FormField
                control={form.control}
                name="elevationGain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>
                      Elevation <span className="text-xs italic">(metres)</span>
                    </FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder="Elevation (m)"
                        {...field}
                        isErrored={
                          form.formState.errors.elevationGain ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="distance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>
                      Distance <span className="text-xs italic">(km)</span>
                    </FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder="Distance (km)"
                        {...field}
                        isErrored={
                          form.formState.errors.distance ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeToComplete"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>
                      Avg. Duration
                      <span className="text-xs italic">(seconds)</span>
                    </FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder="Average completion time (seconds)"
                        {...field}
                        isErrored={
                          form.formState.errors.timeToComplete ? true : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            {/* Tags */}
            <FormGroup className="grid-cols-1">
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder="One word to describe the climb e.g 'gravel', 'paved'. Separate multiple tags with a comma"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        isErrored={form.formState.errors.tags ? true : false}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            {/* Photo Upload Button */}
            <div className="flex items-center justify-start gap-3 mt-7 col-span-full">
              <button
                type="button"
                className="flex items-center justify-start gap-4 p-3 text-sm font-semibold rounded-lg text-text-color/80 bg-primary hover:bg-primary/60 hover:text-text-color/70"
                onClick={() => setShowImageUploadPicker(true)}
              >
                <IconPhoto
                  className="w-6 h-6 text-accent/80"
                  aria-hidden="true"
                />
                upload photo(s)
              </button>
              <p className="text-xs italic font-medium leading-5 text-text-color/80">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </ActivityFormSection>
          {/* Coordinates */}
          <ActivityFormSection className="border-none lg:col-start-1">
            <p className="my-1 text-lg font-semibold leading-6 text-text-color/80">
              Coordinates
            </p>
            {/* Start and End Latitudes */}
            <FormGroup className="grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startCoordinate.latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Latitude</FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder={
                          existingActivity?.startCoordinate?.latitude.toString() ??
                          "Start Latitude"
                        }
                        {...field}
                        isErrored={
                          form.formState.errors.startCoordinate?.latitude
                            ? true
                            : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endCoordinate.latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Latitude</FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder={
                          existingActivity?.endCoordinate?.latitude.toString() ??
                          "End Latitude"
                        }
                        {...field}
                        isErrored={
                          form.formState.errors.endCoordinate?.latitude
                            ? true
                            : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            {/* Start and End Longitudes */}
            <FormGroup className="grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startCoordinate.longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Longitude</FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder={
                          existingActivity?.startCoordinate?.longitude.toString() ??
                          "Start Longitude"
                        }
                        {...field}
                        isErrored={
                          form.formState.errors.startCoordinate?.longitude
                            ? true
                            : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endCoordinate.longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Longitude</FormLabel>
                    <FormControl>
                      <InputField
                        type="text"
                        placeholder={
                          existingActivity?.endCoordinate?.longitude.toString() ??
                          "End Longitude"
                        }
                        {...field}
                        isErrored={
                          form.formState.errors.endCoordinate?.longitude
                            ? true
                            : false
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
          </ActivityFormSection>

          {/* Media Section */}
          <ActivityFormSection className="border-none">
            {showImageUploadPicker && (
              <PickerOverlay
                apikey={ENV_VARIABLES.FILESTACK_API_KEY}
                pickerOptions={{
                  maxFiles: 5,
                  maxSize: 10 * 1024 * 1024,
                  fromSources: [
                    "local_file_system",
                    "url",
                    "imagesearch",
                    "facebook",
                    "instagram",
                    "googledrive",
                    "dropbox",
                    "onedrive",
                    "unsplash",
                  ],
                  accept: ["image/jpeg", "image/png", "image/jpg"],
                  transformations: {
                    crop: {
                      aspectRatio: 4 / 3,
                    },
                  },
                  onUploadDone: (res) => {
                    const urls = res.filesUploaded.map((file) => file.url);
                    setUploadedPhotoUrls(urls);
                    form.setValue("photos", urls);
                    setShowImageUploadPicker(false);
                  },
                }}
              />
            )}
            {uploadedPhotoUrls.length > 0 && (
              <div className="flex flex-wrap items-start justify-start gap-4 p-3 overflow-x-hidden overflow-y-auto bg-transparent border border-dashed rounded-lg border-text-color/25">
                {uploadedPhotoUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt="Uploaded photo"
                    className="object-cover w-32 h-32 rounded-lg"
                  />
                ))}
              </div>
            )}
            {existingActivity?.photos && existingActivity.photos.length > 0 && (
              <div className="flex items-start justify-start gap-4 p-3 overflow-x-auto overflow-y-hidden bg-transparent border border-dashed rounded-lg border-text-color/25">
                {existingActivity.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="Uploaded photo"
                    className="object-cover w-32 h-32 rounded-lg"
                  />
                ))}
              </div>
            )}
          </ActivityFormSection>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end w-full mt-6 gap-x-6">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ActivityForm;
