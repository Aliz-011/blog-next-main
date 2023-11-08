import Link from 'next/link';

const BlogCard = ({
  data,
}: {
  data: {
    _id: string;
    title: string;
    content: string;
    _creationTime: number;
    imageUrl: string;
  };
}) => {
  return (
    <div
      className="rounded-xl border bg-white p-3 hover:shadow-xl hover:transform hover:scale-105 duration-300"
      key={data._id}
    >
      <Link href={`/blog/${data._id}`}>
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <picture>
            <img
              src={data.imageUrl}
              alt="news"
              className="h-48 max-h-[12rem]"
            />
          </picture>
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700 font-semibold line-clamp-2">
            {data.title}
          </h2>

          <div
            className="mt-5 line-clamp-2 truncate text-sm leading-6 text-gray-600"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>

          <div className="mt-3 flex items-end justify-between">
            <time className="text-gray-500 text-sm">
              {new Date(data._creationTime).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
