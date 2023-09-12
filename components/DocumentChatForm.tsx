"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
  message: z.string().min(1, {
    message: "Please enter a message.",
  }),
});
type Props = {};
function DocumentChatForm({}: Props) {
  const supabase = createClientComponentClient();
  const [userId, setUserId] = useState<string | null>(null);
  const params = useParams();
  const docId = params.docId;

  useEffect(() => {
    const getUser = async () => {
      const authUser = await supabase.auth.getUser();
      console.log(`authUser is `, authUser);
      if (authUser.data.user) {
        setUserId(authUser.data.user.id);
      }
    };
    getUser();
  }, [supabase]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    console.log(docId, userId);
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-end">
          <div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Message..."></Input>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Send</Button>
        </div>
      </form>
    </Form>
  );
}

export default DocumentChatForm;
