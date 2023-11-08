import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const getSingleNews = query({
  args: { newId: v.id('news') },
  handler: async (ctx, args) => {
    const news = await ctx.db.get(args.newId);
    return news;
  },
});

export const getAllNews = query({
  handler: async (ctx) => {
    const news = await ctx.db.query('news').order('desc').collect();

    return news;
  },
});

export const createNews = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    isPublished: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw Error('You must be logged in to add a news');
    }

    const news = await ctx.db.insert('news', {
      title: args.title,
      content: args.content,
      imageUrl: args.imageUrl,
      isPublished: args.isPublished,
    });

    return news;
  },
});

export const updateNews = mutation({
  args: {
    id: v.id('news'),
    content: v.string(),
    isPublished: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw Error('You must be logged in to add a news');
    }

    const { id, ...rest } = args;

    const existingNews = await ctx.db.get(id);

    if (!existingNews) {
      throw new Error(`No news found with the given ID ${args.id}`);
    }

    const news = await ctx.db.patch(id, { ...rest });

    return news;
  },
});

export const deleteNews = mutation({
  args: { id: v.id('news') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
