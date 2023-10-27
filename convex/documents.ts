import { v } from 'convex/values';

import { api } from './_generated/api';
import { Doc, Id } from './_generated/dataModel';
import { httpAction, mutation, query } from './_generated/server';

export const archive = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const recursiveArchive = async (documentId: Id<'documents'>) => {
      const children = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (query) =>
          query.eq('userId', userId).eq('parentDocument', documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true
        });

        await recursiveArchive(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true
    });

    recursiveArchive(args.id);

    return document;
  }
});

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id('documents'))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user_parent', (query) =>
        query.eq('userId', userId).eq('parentDocument', args.parentDocument)
      )
      .filter((query) => query.eq(query.field('isArchived'), false))
      .order('desc')
      .collect();

    return documents;
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('documents'))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const document = await ctx.db.insert('documents', {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false
    });

    return document;
  }
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (query) => query.eq('userId', userId))
      .filter((query) => query.eq(query.field('isArchived'), true))
      .order('desc')
      .collect();

    return documents;
  }
});

export const restore = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const recursiveRestore = async (documentId: Id<'documents'>) => {
      const children = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (query) =>
          query.eq('userId', userId).eq('parentDocument', documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<'documents'>> = {
      isArchived: false
    };

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const document = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    return document;
  }
});

export const remove = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await ctx.db.delete(args.id);

    return document;
  }
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (query) => query.eq('userId', userId))
      .filter((query) => query.eq(query.field('isArchived'), false))
      .order('desc')
      .collect();

    return documents;
  }
});

export const getById = query({
  args: { documentId: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error('Not found');
    }

    if (document.isPublished && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return document;
  }
});

export const update = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthenticated');
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await ctx.db.patch(args.id, {
      ...rest
    });

    return document;
  }
});

export const removeIcon = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthenticated');
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await ctx.db.patch(args.id, {
      icon: undefined
    });

    return document;
  }
});

export const removeCoverImage = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthenticated');
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await ctx.db.patch(args.id, {
      coverImage: undefined
    });

    return document;
  }
});

export const getByIdAction = httpAction(async ({ runQuery }, request) => {
  const url = new URL(request.url);
  const documentId: Id<'documents'> =
    (url.searchParams.get('documentId') as Id<'documents'>) ??
    (request.headers.get('documentId') as Id<'documents'>) ??
    null;
  if (documentId === null) {
    return new Response('Did not specify documentId as query param or header', {
      status: 400
    });
  }

  const document = await runQuery(api.documents.getById, {
    documentId: documentId
  });

  return new Response(JSON.stringify(document), {
    headers: {
      'content-type': 'application/json'
    },
    status: 200
  });
});
