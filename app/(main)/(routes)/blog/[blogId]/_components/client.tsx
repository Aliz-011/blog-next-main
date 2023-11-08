'use client';

import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

import Editor from '@/components/editor';
import Preview from '@/components/preview';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/clerk-react';
import { isAdmin } from '@/lib/admin';

const formSchema = z.object({
  content: z.string().min(10, {
    message: 'description is required',
  }),
});

const BlogIdClient = ({ id }: { id: string }) => {
  const router = useRouter();
  const { userId } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const news = useQuery(api.news.getSingleNews, {
    newId: id as Id<'news'>,
  });
  const update = useMutation(api.news.updateNews);
  const deleteNews = useMutation(api.news.deleteNews);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: news?.content || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const data = update({
        id: news?._id!,
        content: values.content,
      });

      if (!data) {
        throw new Error('Something went wrong');
      }

      toggleEdit();
      toast.success('Success updating the news!');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message!);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = () => {
    deleteNews({ id: news?._id! });
    toast.success('Success deleting the news!');
    router.push('/blog');
  };

  return (
    <>
      <div className="mb-4 md:mb-0 w-full max-w-screen-lg mx-auto relative h-96">
        <div
          className="absolute left-0 bottom-0 w-full h-full z-10"
          style={{
            backgroundImage:
              'linear-gradient(180deg,transparent,rgba(0, 0, 0, 0.7))',
          }}
        ></div>
        <picture>
          <img
            src={news?.imageUrl}
            alt="news image"
            className="absolute left-0 top-0 w-full h-full z-0 object-cover rounded-xl"
          />
        </picture>

        <div className="p-4 absolute bottom-0 left-0 z-20">
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            {news?.title}
          </h2>
          <div className="flex mt-3">
            <div>
              <p className="font-semibold text-gray-400 text-xs">
                {new Date(news?._creationTime!).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isAdmin(userId) && (
        <div className="px-4 lg:px-0 mt-6 max-w-screen-lg mx-auto flex items-center gap-x-4">
          <Button onClick={toggleEdit} variant="secondary">
            <Pencil2Icon className="h-4 w-4 mr-2" />
            Edit content
          </Button>
          <Button onClick={onDelete}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete news
          </Button>
        </div>
      )}

      <div className="px-4 lg:px-0 mt-8 text-gray-700 max-w-screen-lg mx-auto text-lg leading-relaxed">
        {!isEditing && <Preview value={news?.content!} />}

        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </>
  );
};

export default BlogIdClient;
