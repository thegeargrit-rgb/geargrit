import {defineField, defineType} from 'sanity'

const guideTypeOptions = [
  {title: 'Buying Guide', value: 'buying-guide'},
  {title: 'Comparison', value: 'comparison'},
  {title: 'How-to', value: 'how-to'},
]

export default defineType({
  name: 'guide',
  type: 'document',
  title: 'Guide',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required().min(5),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guideType',
      type: 'string',
      title: 'Guide Type',
      options: {list: guideTypeOptions},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      rows: 3,
      validation: (Rule) => Rule.required().min(80),
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Content',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: 'author'}],
      title: 'Author',
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
      name: 'productsMentioned',
      type: 'array',
      title: 'Products Mentioned',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{type: 'faqItem'}],
    }),
    defineField({
      name: 'affiliateDisclosure',
      title: 'Affiliate Disclosure',
      type: 'affiliateDisclosure',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated Date',
    }),
  ],
})
