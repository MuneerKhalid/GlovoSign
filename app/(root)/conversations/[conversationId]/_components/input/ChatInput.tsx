"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { useConversation } from "@/hooks/useConversation";
import { useMutationState } from "@/hooks/useMutationState";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { SendHorizonal, Mic } from "lucide-react"; // Import the Mic icon

type Props = {};

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field can't be empty",
  }),
});

const ChatInput = (props: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [predictedWord, setPredictedWord] = useState<string>("");

  const { conversationId } = useConversation();

  const { mutate: createMessage, pending } = useMutationState(
    api.message.create
  );

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/conversations/${conversationId}`,
          {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.prediction) {
          setPredictedWord((prevWord) => prevWord + data.prediction);
        }
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    };

    const intervalId = setInterval(fetchPrediction, 3000); // Fetch prediction every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [conversationId]);

  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;

    if (selectionStart !== null) {
      form.setValue("content", value);
      setPredictedWord(value); // Update the predicted word if the user changes the input
    }
  };

  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: "text",
      content: [values.content],
    })
      .then(() => {
        form.reset();
        setPredictedWord(""); // Reset predicted word after message is sent
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError ? error.data : "Unexpected error occurred"
        );
      });
  };

  let recognition: any = null;

  const startRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Your browser does not support speech recognition.");
      return;
    }

    recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setPredictedWord((prev) => prev + " " + speechResult);
      form.setValue("content", predictedWord + " " + speechResult);
    };

    recognition.onerror = (event: any) => {
      toast.error("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-2 items-end w-full"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <FormItem className="h-full w-full">
                    <FormControl>
                      <TextareaAutosize
                        onKeyDown={async (e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            await form.handleSubmit(handleSubmit)();
                          }
                        }}
                        rows={1}
                        maxRows={3}
                        {...field}
                        onChange={handleInputChange}
                        onClick={handleInputChange}
                        placeholder="Type a message..."
                        className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5"
                        value={predictedWord}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button
              onMouseDown={startRecognition}
              onMouseUp={stopRecognition}
              onTouchStart={startRecognition} // For mobile touch support
              onTouchEnd={stopRecognition}   // For mobile touch support
              size="icon"
              type="button"
            >
              <Mic />
            </Button>
            <Button disabled={pending} size="icon" type="submit">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ChatInput;
