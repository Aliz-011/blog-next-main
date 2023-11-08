import BlogIdClient from './_components/client';

const BlogIdPage = ({ params }: { params: { blogId: string } }) => {
  return (
    <div>
      <BlogIdClient id={params.blogId} />
    </div>
  );
};

export default BlogIdPage;
