import {defineField, defineType} from 'sanity'

const merchantOptions = [
  {title: 'Amazon', value: 'amazon'},
  {title: 'Flipkart', value: 'flipkart'},
  {title: 'ShareASale', value: 'shareasale'},
  {title: 'CJ Affiliate', value: 'cj'},
  {title: 'Impact', value: 'impact'},
  {title: 'Other', value: 'other'},
]

export default defineType({
  name: 'affiliateLink',
  type: 'document',
  title: 'Affiliate Link',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      description: 'Used in /go/[slug]. Example: yonex-astrox-100zz',
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
    }),
    defineField({
      name: 'destinationUrl',
      title: 'Destination URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'merchant',
      title: 'Merchant',
      type: 'string',
      options: {list: merchantOptions},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'slug',
      subtitle: 'merchant',
      active: 'isActive',
    },
    prepare({title, subtitle, active}) {
      return {
        title,
        subtitle: `${subtitle ?? 'merchant'} � ${active ? 'active' : 'inactive'}`,
      }
    },
  },
})
