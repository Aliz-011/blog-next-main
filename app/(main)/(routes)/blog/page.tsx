'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

import BlogCard from '@/components/blog-card';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';

const BlogPage = () => {
  const allNews = useQuery(api.news.getAllNews);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div className="col-span-full">
        <Heading title="News" subtitle="See what happened around you." />
        <Separator className="mt-4" />
      </div>
      {allNews
        ?.filter((item) => item.isPublished === 'published')
        .map((item) => (
          <BlogCard key={item._id} data={item} />
        ))}
    </div>
  );
};
export default BlogPage;
