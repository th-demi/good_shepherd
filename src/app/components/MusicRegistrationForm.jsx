"use client"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PhoneInput } from "@/components/ui/phone-input"

// Form validation schema
const formSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  "Activity Status": z.string().optional(),
  Gender: z.string().min(1, "Gender is required"),
  "School / College / Occupation": z.string().optional(),
  "E - mail": z.string().email().optional(),
  "Phone number": z.string().min(1, "Phone number is required"),
  "Residence Address": z.string().optional(),
  "Type of Musical Instrument": z.string().min(1, "Instrument type is required"),
  "Date of Birth": z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"), // Accepting string but validating format
})

const activityOptions = [
  "School",
  "College",
  "Working Professional",
  "Other"
]

const genderOptions = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say"
]

const instrumentOptions = [
  "Piano",
  "Keyboard",
  "Guitar",
  "Violin",
  "Drums",
  "Recorder",
  "Ukulele",
  "Classical Vocals",
  "Western Vocals",
  "Dance",
  "Other"
]

export default function MusicRegistrationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      "Activity Status": "",
      Gender: "",
      "School / College / Occupation": "",
      "E - mail": "",
      "Phone number": "",
      "Residence Address": "",
      "Type of Musical Instrument": "",
      "Date of Birth": "",
    },
  })

  // Form submission handler
  async function onSubmit(values) {
    try {
      // Debugging: Log form data to check its structure
      console.log("Form data before submission:", values);

      // Convert Date of Birth to Date object and format it as an ISO string
      const formattedValues = {
        ...values,
        "Date of Birth": new Date(values["Date of Birth"]).toISOString(),  // Ensure a valid date format for submission
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues), // Send the updated values
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Form submitted successfully!")
        form.reset() // Optionally reset the form
      } else {
        toast.error(data.error || "Failed to submit the form. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error", error)
      toast.error("Failed to submit the form. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        {/* Grid Layout for Name and Date of Birth */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="Date of Birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="Select your date of birth"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Rest of the form */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="Activity Status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Current Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="Gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="School / College / Occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School / College / Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Enter your school/college/occupation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="E - mail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="Phone number"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput {...field} defaultCountry="IN" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="Residence Address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Residence Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Type of Musical Instrument"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Musical Instrument</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an instrument you want to learn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {instrumentOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
