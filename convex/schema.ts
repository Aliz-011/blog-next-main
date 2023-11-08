import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  news: defineTable({
    title: v.string(),
    content: v.string(),
    imageUrl: v.string(),
    isPublished: v.string(),
  }),
});
