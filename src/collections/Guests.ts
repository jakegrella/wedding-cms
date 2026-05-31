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
    {
      name: 'welcomePartyRsvpStatus',
      label: 'Welcome Party RSVP Status',
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
      name: 'coffeeMeetupRsvpStatus',
      label: 'Coffee Meetup RSVP Status',
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
      name: 'hikeRsvpStatus',
      label: 'Hike RSVP Status',
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
      name: 'clubRsvpStatus',
      label: 'Club RSVP Status',
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
      name: 'beachDayRsvpStatus',
      label: 'Beach Day RSVP Status',
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
      name: 'preFireworksShowRsvpStatus',
      label: 'Pre-Fireworks Show RSVP Status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Declined', value: 'declined' },
      ],
    },
  ],
}
