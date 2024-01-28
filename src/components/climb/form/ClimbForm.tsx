import CitySelect from "@components/common/city-select/city-select";
import CountrySelect from "@components/common/country-select/country-select";
import StateSelect from "@components/common/state-select/state-select";
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
import { Textarea } from "@components/ui/text-area/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClimbFormSchema, ClimbFormType } from "@models/climb-form-schema";
import { IconPhoto } from "@tabler/icons-react";
import { useClimbRequestModalStore } from "@utils/climb/climb-request-modal-store";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import CategoryButtons from "./ClimbFormCategoryButtons";
import FormSection from "./ClimbFormSection";

const ClimbForm = () => {
  const { setIsClimbRequestModalOpen } = useClimbRequestModalStore();
  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ClimbFormType>({
    resolver: zodResolver(ClimbFormSchema),
    defaultValues: {
      id: uuidv4(),
      slug: "",
      climbName: "",
      climbSummary: "",
      climbDescription: "",
      location: {
        country: "",
        state: "",
        city: "",
      },
      photos: [],
      gradient: {
        min: "",
        max: "",
        average: "",
      },
      elevationGain: "",
      distance: "",
      category: "",
      tags: "",
      startLocation: { latitude: "", longitude: "" },
      endLocation: { latitude: "", longitude: "" },
      createdAt: new Date().toISOString(), // Current date in ISO format
      updatedAt: new Date().toISOString(), // Current date in ISO format
    },
  });

  // File change handler for photo upload.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const promises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            resolve(e.target.result as string);
          } else {
            reject(new Error("FileReader error"));
          }
        };
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file as Blob); // Ensure file is typed as Blob
      });
    });

    Promise.all(promises)
      .then((base64Files) => {
        form.setValue("photos", base64Files);
      })
      .catch((error) => {
        // Handle error
        console.error("Error reading files:", error);
      });
  };

  // Submit handler.
  const onSubmit: SubmitHandler<ClimbFormType> = (data) => {
    // Split tags into an array
    const tagsArray = data.tags?.split(",").map((tag: string) => tag.trim());

    // Replace string with array of strings
    const newFormData = { ...data, tags: tagsArray };

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form submitted:", newFormData);
    form.reset();
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsClimbRequestModalOpen(false);
  };

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  // Use the `watch` function from react-hook-form to observe changes in climbName
  const climbName = form.watch("climbName");
  useEffect(() => {
    // Update the slug field whenever climbName changes
    const slug = slugify(climbName, {
      lower: true, // convert to lower case
      strict: true, // strip special characters
    });

    form.setValue("slug", slug, { shouldDirty: true, shouldValidate: true });
  }, [climbName, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-start w-full h-full gap-3 overflow-x-hidden overflow-y-auto"
      >
        {/* Information Section */}
        <FormSection title="Information about the climb">
          <p className="mt-1 text-sm font-light leading-6 text-text-color/60">
            We will review your request and get back to you as soon as possible.
          </p>
          <FormGroup className="grid-cols-1 my-2">
            <FormField
              control={form.control}
              name="climbName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="Name of the climb"
                      {...field}
                      isErrored={form.formState.errors.climbName ? true : false}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          <FormGroup className="grid-cols-1 my-2">
            <FormField
              control={form.control}
              name="climbSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Summary</FormLabel>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="Describe the climb in one sentence"
                      {...field}
                      isErrored={
                        form.formState.errors.climbSummary ? true : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          <FormGroup className="grid-cols-1 my-2">
            <FormField
              control={form.control}
              name="climbDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a few sentences about the climb"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          <FormGroup className="grid-cols-3 my-2">
            <FormField
              control={form.control}
              name="location.country"
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
                        form.formState.errors.location?.country ? true : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.state"
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
                        form.formState.errors.location?.state ? true : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.city"
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
                        form.formState.errors.location?.city ? true : false
                      }
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
            <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-text-color/25">
              <div className="text-center">
                <IconPhoto
                  className="w-12 h-12 mx-auto text-accent/80"
                  aria-hidden="true"
                />
                <div className="flex items-center mt-4 text-sm leading-6 text-text-color">
                  <InputField
                    id="file-upload"
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>
                <p className="my-2 text-xs leading-5 text-text-color">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </FormSection>
        {/* Statistics Section */}
        <FormSection title="Stats">
          <FormGroup className="grid-cols-3 my-2">
            <FormField
              control={form.control}
              name="gradient.min"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel required>Min. Grade (%)</FormLabel> */}
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="Min. Grade (%)"
                      {...field}
                      isErrored={
                        form.formState.errors.gradient?.min ? true : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradient.max"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel required>Max. Grade (%)</FormLabel> */}
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="Max. Grade (%)"
                      {...field}
                      isErrored={
                        form.formState.errors.gradient?.max ? true : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradient.average"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel required>Avg. Grade (%)</FormLabel> */}
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="Avg. Grade (%)"
                      {...field}
                      isErrored={
                        form.formState.errors.gradient?.average ? true : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          <FormGroup className="grid-cols-2 my-3">
            <FormField
              control={form.control}
              name="elevationGain"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel required>Elevation (metres)</FormLabel> */}
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="Elevation (metres)"
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
                  {/* <FormLabel required>Distance (km)</FormLabel> */}
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
          </FormGroup>
        </FormSection>
        <FormSection>
          {/* Radio Butttons */}
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-text-color">
              Category
            </legend>
            <Controller
              control={form.control}
              name="category"
              render={({ field: { value, onChange, name } }) => (
                <CategoryButtons
                  value={value}
                  onChange={onChange}
                  name={name}
                />
              )}
            />
          </fieldset>
        </FormSection>
        {/* Tags */}
        <FormSection>
          <FormGroup className="grid-cols-1">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="One word to describe the climb e.g 'gravel', 'paved'. Separate multiple tags with a comma"
                      {...field}
                      isErrored={form.formState.errors.tags ? true : false}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
        </FormSection>
        {/* Coordinates */}
        <FormSection>
          <p className="text-sm leading-6 text-text-color/60">Coordinates</p>
          <FormGroup className="grid-cols-2 my-2">
            <FormField
              control={form.control}
              name="startLocation.latitude"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="Start Latitude"
                      {...field}
                      isErrored={
                        form.formState.errors.startLocation?.latitude
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
              name="startLocation.longitude"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="Start Longitude"
                      {...field}
                      isErrored={
                        form.formState.errors.startLocation?.longitude
                          ? true
                          : false
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          <FormGroup className="grid-cols-2 my-2">
            <FormField
              control={form.control}
              name="endLocation.latitude"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="End Latitude"
                      {...field}
                      isErrored={
                        form.formState.errors.endLocation?.latitude
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
              name="endLocation.longitude"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputField
                      type="text"
                      placeholder="End Longitude"
                      {...field}
                      isErrored={
                        form.formState.errors.endLocation?.longitude
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
export default ClimbForm;
