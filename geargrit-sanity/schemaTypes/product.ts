import {defineField, defineType} from 'sanity'

const priceRangeOptions = [
  {title: 'Budget', value: 'budget'},
  {title: 'Mid-range', value: 'mid'},
  {title: 'Premium', value: 'premium'},
]

const skillLevelOptions = [
  {title: 'Beginner', value: 'beginner'},
  {title: 'Intermediate', value: 'intermediate'},
  {title: 'Advanced', value: 'advanced'},
]

export default defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      type: 'reference',
      title: 'Brand',
      to: [{type: 'brand'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      rows: 4,
      validation: (Rule) => Rule.required().min(100),
    }),
    defineField({
      name: 'skillLevel',
      title: 'Skill Level',
      type: 'string',
      options: {list: skillLevelOptions},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {list: priceRangeOptions},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specs',
      title: 'Specs',
      type: 'array',
      of: [{type: 'productSpec'}],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Primary Image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'affiliateSlug',
      type: 'string',
      title: 'Affiliate Slug',
      description: 'Used for /go/[slug] redirects.',
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
