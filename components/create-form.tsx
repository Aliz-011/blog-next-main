'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { useEdgeStore } from '@/lib/edgestore';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  title: z.string().min(6, {
    message: 'title must be at least 6 characters.',
  }),
  content: z.string().min(10, {
    message: 'title must be at least 10 characters.',
  }),
  isPublished: z.enum(['published', 'archived']),
});

const CreateForm = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState('');

  const create = useMutation(api.news.createNews);
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await create({
      ...values,
      imageUrl: url,
    });

    toast.success('Success');

    setIsSubmitting(false);
    form.reset();
    router.push('/blog');
  }
  return (
    <div className={cn('grid gap-6')}>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Make great post!</CardTitle>
          <CardDescription>
            Fill out the fields below to make a new news post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            id="title"
                            placeholder="Enter Title..."
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Is Published</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-1"
                            defaultValue={field.value}
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="archived" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Archive
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="published" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Publish
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            className="bg-white"
                            disabled={isSubmitting}
                            placeholder="This content about..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Upload Image</Label>
                  {file && (
                    <div>
                      <picture>
                        <img
                          alt="not found"
                          className="w-full"
                          src={URL.createObjectURL(file)}
                        />
                      </picture>
                      <br />
                      <button onClick={() => setFile(undefined)}>Remove</button>
                    </div>
                  )}
                  <input
                    type="file"
                    name="myImage"
                    onChange={async (event) => {
                      if (event.target.files) {
                        setFile(event.target.files![0]);
                        const res = await edgestore.publicFiles.upload({
                          file: event.target.files![0],
                        });
                        setUrl(res.url);
                      }
                    }}
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  Create Post
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateForm;
