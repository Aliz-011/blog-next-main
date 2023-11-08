'use client';

import BlogCard from '@/components/blog-card';
import Heading from '@/components/heading';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

const FromBlog = () => {
  const allNews = useQuery(api.news.getAllNews);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div className="col-span-full">
        <Heading
          title="From blog"
          subtitle="Read latest news from us."
          center
        />
      </div>
      {allNews
        ?.filter((item) => item.isPublished === 'published')
        .map((item) => <BlogCard key={item._id} data={item} />)
        .slice(0, 3)}
    </div>
  );
};

export default FromBlog;
