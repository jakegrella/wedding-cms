import type { CollectionConfig } from 'payload'

export const Guests: CollectionConfig = {
  slug: 'guests',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.collection === 'users' && user.role === 'Admin',
    update: ({ req: { user } }) => user?.collection === 'users' && user.role === 'Admin',
    delete: ({ req: { user } }) => user?.collection === 'users' && user.role === 'Admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'group',
      type: 'relationship',
      relationTo: 'guest-groups',
    },
    {
      name: 'rsvpStatus',
      label: 'RSVP Status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Declined', value: 'declined' },
      ],
    },
    {
      name: 'dietaryRestrictions',
      type: 'text',
    },
    {
      name: 'plusOne',
      type: 'checkbox',
    },
    {
      name: 'comment',
      type: 'textarea',
    },
  ],
}
