import type { CollectionConfig } from 'payload'

export const Guests: CollectionConfig = {
  slug: 'guests',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.collection === 'users' && user.role === 'Admin',
    update: ({ req: { user }, id }) => {
      if (
        user?.collection === 'guest-groups' &&
        user?.guests?.docs?.some((i) => typeof i === 'object' && i.id === id)
      )
        return true // guest can update self
      if (user?.collection === 'users' && user.role === 'Admin') return true // admin can update any guest
      return user?.id === id // user can update self
    },
    delete: ({ req: { user } }) => user?.collection === 'users' && user.role === 'Admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'guestGroup',
      type: 'relationship',
      relationTo: 'guest-groups',
      hasMany: false,
      required: true,
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
