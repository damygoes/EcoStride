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
import { useActivityForm } from "@utils/activity/activity-form-store";
import { useActivityRequestModalStore } from "@utils/activity/activity-request-modal-store";
import { PickerOverlay } from "filestack-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormSection from "./ActivityFormSection";

const ActivityForm = () => {
  const { setIsActivityRequestModalOpen } = useActivityRequestModalStore();
  const { activity, resetActivity } = useActivityForm();
  const [showImageUploadPicker, setShowImageUploadPicker] =
    useState<boolean>(false);
  const [shouldRenderClimbCategorySelect, setShouldRenderClimbCategorySelect] =
    useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    activity?.addressDetails.country ?? "",
  );
  const [selectedState, setSelectedState] = useState<string>(
    activity?.addressDetails.state ?? "",
  );
  const [uploadedPhotoUrls, setUploadedPhotoUrls] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState(activity?.tags?.join(", ") ?? "");
  const [richTextDescription, setRichTextDescription] = useState<string>(
    activity?.description ?? "",
  );

  const form = useForm<ActivityFormType>({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: {
      activityName: activity?.name ?? "",
      activityDescription: "",
      distance: activity?.distance.toString() ?? "",
      elevationGain: activity?.elevationGain.toString() ?? "",
      minimumGrade: activity?.minimumGrade?.toString() ?? "",
      maximumGrade: activity?.maximumGrade?.toString() ?? "",
      averageGrade: activity?.averageGrade.toString() ?? "",
      timeToComplete: activity?.timeToComplete?.toString() ?? "",
      difficultyLevel: activity?.difficultyLevel ?? "",
      activityType: activity?.activityType ?? "Bike",
      routeType: activity?.routeType ?? "",
      climbCategory: activity?.climbCategory ?? "",
      photos: activity?.photos ?? [],
      tags: [],
      addressDetails: {
        city: activity?.addressDetails.city ?? "",
        state: activity?.addressDetails.state ?? "",
        country: activity?.addressDetails.country ?? "",
      },
      startCoordinateDetails: {
        latitude: activity?.startCoordinateDetails?.latitude?.toString() ?? "",
        longitude:
          activity?.startCoordinateDetails?.longitude?.toString() ?? "",
      },
      endCoordinateDetails: {
        latitude: activity?.endCoordinateDetails?.latitude?.toString() ?? "",
        longitude: activity?.endCoordinateDetails?.longitude?.toString() ?? "",
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
    form.setValue("activityDescription", value);
  };

  // Submit handler.
  const onSubmit: SubmitHandler<ActivityFormType> = (data) => {
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
      startCoordinates: {
        latitude: parseFloat(data.startCoordinates.latitude),
        longitude: parseFloat(data.startCoordinates.longitude),
      },
      endCoordinates: {
        latitude: parseFloat(data.endCoordinates.latitude),
        longitude: parseFloat(data.endCoordinates.longitude),
      },
      tags: tagsArray,
    };

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form submitted:", transformedForm);
    form.reset();
    handleClose();
  };

  const handleClose = () => {
    resetActivity();
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
        <FormSection title="Activity Information">
          <p className="mt-1 text-sm font-light leading-6 text-text-color/60">
            We will review your request and get back to you as soon as possible.
          </p>
          {/* Activity Name */}
          <FormGroup className="grid-cols-1 my-2">
            <FormField
              control={form.control}
              name="activityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Activity Name</FormLabel>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="Name of the activity"
                      {...field}
                      isErrored={
                        form.formState.errors.activityName ? true : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          {/* Activity Description */}
          <FormGroup className="grid-cols-1 my-2">
            <FormField
              control={form.control}
              name="activityDescription"
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
          <FormGroup className="grid-cols-3 my-2">
            <FormField
              control={form.control}
              name="addressDetails.country"
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
                        form.formState.errors.addressDetails?.country
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
              name="addressDetails.state"
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
                        form.formState.errors.addressDetails?.state
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
              name="addressDetails.city"
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
                        form.formState.errors.addressDetails?.city
                          ? true
                          : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
        </FormSection>
        {/* Activity, Route Type and Technical Details */}
        <FormSection>
          <p className="mt-1 mb-6 text-lg font-semibold leading-6 text-text-color/80">
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
                      isErrored={form.formState.errors.routeType ? true : false}
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
          <br />
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
                      isErrored={form.formState.errors.distance ? true : false}
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
        </FormSection>
        {/* Coordinates */}
        <FormSection>
          <p className="mt-1 mb-6 text-lg font-semibold leading-6 text-text-color/80">
            Coordinates
          </p>
          {/* Start and End Latitudes */}
          <FormGroup className="grid-cols-2 gap-12 my-2">
            <FormField
              control={form.control}
              name="startCoordinateDetails.latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Latitude</FormLabel>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder={
                        activity?.startCoordinateDetails?.latitude.toString() ??
                        "Start Latitude"
                      }
                      {...field}
                      isErrored={
                        form.formState.errors.startCoordinateDetails?.latitude
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
              name="endCoordinateDetails.latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Latitude</FormLabel>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder={
                        activity?.endCoordinateDetails?.latitude.toString() ??
                        "End Latitude"
                      }
                      {...field}
                      isErrored={
                        form.formState.errors.endCoordinateDetails?.latitude
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
          <FormGroup className="grid-cols-2 gap-12 my-2">
            <FormField
              control={form.control}
              name="startCoordinateDetails.longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Longitude</FormLabel>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder={
                        activity?.startCoordinateDetails?.longitude.toString() ??
                        "Start Longitude"
                      }
                      {...field}
                      isErrored={
                        form.formState.errors.startCoordinateDetails?.longitude
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
              name="endCoordinateDetails.longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Longitude</FormLabel>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder={
                        activity?.endCoordinateDetails?.longitude.toString() ??
                        "End Longitude"
                      }
                      {...field}
                      isErrored={
                        form.formState.errors.endCoordinateDetails?.longitude
                          ? true
                          : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
        </FormSection>
        {/* Tags */}
        <FormSection>
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
        </FormSection>
        {/* Media Section */}
        <FormSection title="Photo(s)">
          <div className="mt-4 col-span-full">
            <div className="flex items-center justify-start gap-3">
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
          </div>
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
            <div className="flex flex-wrap items-start justify-start gap-4 px-6 py-10 mt-2 overflow-x-hidden overflow-y-auto bg-transparent border border-dashed rounded-lg border-text-color/25">
              {uploadedPhotoUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Uploaded photo"
                  className="object-cover rounded-lg w-52 h-52"
                />
              ))}
            </div>
          )}
          {activity?.photos && activity.photos.length > 0 && (
            <div className="flex items-start justify-start gap-4 px-6 py-10 mt-2 overflow-x-auto overflow-y-hidden bg-transparent border border-dashed rounded-lg border-text-color/25">
              {activity.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt="Uploaded photo"
                  className="object-cover rounded-lg w-52 h-52"
                />
              ))}
            </div>
          )}
        </FormSection>

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
