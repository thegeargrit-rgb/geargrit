import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'affiliateDisclosure',
  title: 'Affiliate Disclosure',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show Disclosure',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'text',
      title: 'Disclosure Text',
      type: 'text',
      rows: 3,
      initialValue:
        'GearGrit may earn a commission when you buy through links on this page. This does not affect our editorial verdict.',
      validation: (Rule) => Rule.required().min(30),
    }),
  ],
})
