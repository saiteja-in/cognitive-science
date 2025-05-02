
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";

import { saveUserData, clearAssessmentData } from "@/utils/localStorage";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({

 name: z.string().min(2, {

  message: "Name must be at least 2 characters.",

 }),

 email: z.string().email({

  message: "Please enter a valid email address.",

 }),

 fieldOfStudy: z.string().min(1, {

  message: "Please select a field of study.",

 }),

 password: z.string().min(8, {

  message: "Password must be at least 8 characters.",

 }),

});

const RegisterForm = () => {

 const [isSubmitting, setIsSubmitting] = useState(false);

 const navigate = useNavigate();

 const { toast } = useToast();

 const form = useForm<z.infer<typeof formSchema>>({

  resolver: zodResolver(formSchema),

  defaultValues: {

   name: "",

   email: "",

   fieldOfStudy: "",

   password: "",

  },

 });

 const onSubmit =async (values: z.infer<typeof formSchema>) => {

  setIsSubmitting(true);

  try {

   // Clear any previous assessment data

   clearAssessmentData();

   // Save user data to localStorage

   saveUserData(values);

   console.log(values);

   // save user to database

   const response = await fetch('http://localhost:5000/api/auth/register', {

    method: 'POST',

    headers: {

     'Content-Type': 'application/json'

    },

    body: JSON.stringify({...values, username: values.name})

   });

   if (response.ok) {

    toast({

     title: "Welcome aboard!",

     description: "Your information has been saved. Let's start the assessment.",

    });

    const data = await response.json();

    localStorage.setItem('userId', data.userId);

   }

   // Navigate to the questions page

   navigate("/questions");

  } catch (error) {

   toast({

    title: "Something went wrong",

    description: "There was an error saving your information.",

    variant: "destructive",

   });

  } finally {

   setIsSubmitting(false);

  }

 };

 return (

  <div className="w-full h-screen flex justify-center items-center">
    <Card className="w-full max-w-md">

<CardHeader>

 <CardTitle className="text-2xl font-bold">Welcome to the Assessment</CardTitle>

 <CardDescription>

  Please provide your information to get started.

 </CardDescription>

</CardHeader>

<CardContent>

 <Form {...form}>

  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

   <FormField

    control={form.control}

    name="name"

    render={({ field }) => (

     <FormItem>

      <FormLabel>Full Name</FormLabel>

      <FormControl>

       <Input placeholder="Enter your full name" {...field} />

      </FormControl>

      <FormMessage />

     </FormItem>

    )}

   />

   <FormField

    control={form.control}

    name="email"

    render={({ field }) => (

     <FormItem>

      <FormLabel>Email</FormLabel>

      <FormControl>

       <Input placeholder="your.email@example.com" type="email" {...field} />

      </FormControl>

      <FormMessage />

     </FormItem>

    )}

   />

   <FormField

    control={form.control}

    name="password"

    render={({ field }) => (

     <FormItem>

      <FormLabel>Password</FormLabel>

      <FormControl>

       <Input placeholder="Enter your password" type="password" {...field} />

      </FormControl>

      <FormMessage />

     </FormItem>

    )}

   />

   <FormField

    control={form.control}

    name="fieldOfStudy"

    render={({ field }) => (

     <FormItem>

      <FormLabel>Field of Study</FormLabel>

      <Select onValueChange={field.onChange} defaultValue={field.value}>

       <FormControl>

        <SelectTrigger>

         <SelectValue placeholder="Select your field" />

        </SelectTrigger>

       </FormControl>

       <SelectContent>

        <SelectItem value="computer_science">Computer Science</SelectItem>

        <SelectItem value="engineering">Engineering</SelectItem>

        <SelectItem value="business">Business</SelectItem>

        <SelectItem value="arts">Arts & Humanities</SelectItem>

        <SelectItem value="science">Science</SelectItem>

        <SelectItem value="other">Other</SelectItem>

       </SelectContent>

      </Select>

      <FormMessage />

     </FormItem>

    )}

   />

   <Link className="text-sm text-blue-500 underline text-center font-semibold" to="/signin">Already registered?</Link>

   <Button

    type="submit"

    className="w-full bg-assessment-primary hover:bg-assessment-primary/90"

    disabled={isSubmitting}

   >

    {isSubmitting ? "Submitting..." : "Start Assessment"}

   </Button>

  </form>

 </Form>

</CardContent>

</Card>
  </div>

 );

};

export default RegisterForm;



