import type { CollectionConfig } from 'payload'

export const GuestGroups: CollectionConfig = {
  slug: 'guest-groups',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.collection === 'users' && user.role === 'Admin',
    update: ({ req: { user }, id }) => {
      if (user?.collection === 'users' && user.role === 'Admin') return true
      return user?.id === id
    },
    delete: ({ req: { user } }) => user?.collection === 'users' && user.role === 'Admin',
    admin: ({ req: { user } }) => user?.collection === 'users' && user.role === 'Admin',
  },
  auth: {
    loginWithUsername: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'guests',
      type: 'join',
      collection: 'guests',
      on: 'guestGroup',
    },
  ],
}
