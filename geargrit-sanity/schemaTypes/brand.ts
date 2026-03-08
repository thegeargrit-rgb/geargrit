import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brand',
  type: 'document',
  title: 'Brand',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Brand Name',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {hotspot: true},
    }),
    defineField({
      name: 'website',
      type: 'url',
      title: 'Official Website',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 4,
      validation: (Rule) => Rule.required().min(80),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
