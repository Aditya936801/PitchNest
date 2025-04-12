"use client";
import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("**Hello world!!!**");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (err) {
      console.log({ err });
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "An unexpected error has occured",
        variant: "destructive",
      });
      return { ...prevState, error: "An unexpected error has occured", status: "ERROR" };
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });
  const handlePitch = (value?: string) => {
    setPitch(value as string);
  };
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input id="title" name="title" className="startup-form_input" placeholder="Startup Title" />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea id="description" name="description" className="startup-form_textarea" placeholder="Startup Description" />
        {errors.description && <p className="startup-form_error">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input id="category" name="category" className="startup-form_input" placeholder="Startup Category (Tech, Health, Education...)" />
        {errors.category && <p className="startup-form_error">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input id="link" name="link" className="startup-form_input" placeholder="Startup Image URL" />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={handlePitch}
          preview="edit"
          height={300}
          style={pitchStyle}
          textareaProps={pitchTextAreaProps}
          previewOptions={pitchPreviewOptions}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button type="submit" disabled={isPending} className="startup-form_btn text-white">
        {isPending ? (
          "Submitting..."
        ) : (
          <>
            <p>Submit Your Pitch</p>
            <Send className="size-6 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
};

export default StartupForm;

const pitchStyle = { borderRadius: 20, overflow: "hidden" };

const pitchTextAreaProps = {
  placeholder: "Briefly describe your idea and what problem it solves",
};

const pitchPreviewOptions = {
  disallowedElements: ["style"],
};
