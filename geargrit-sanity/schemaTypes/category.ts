import {defineField, defineType} from 'sanity'

const nicheOptions = [
  {title: 'Badminton', value: 'badminton'},
  {title: 'Trekking', value: 'trekking'},
]

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'niche',
      title: 'Niche',
      type: 'string',
      options: {list: nicheOptions, layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      weak: true,
      description: 'Optional for nested taxonomy.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(80),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'niche',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? subtitle.toUpperCase() : 'UNCATEGORIZED NICHE',
      }
    },
  },
})
