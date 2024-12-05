import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name of Product',
      validation: (rule) => rule.required().error('Product must have a title'),
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Product Images',
      validation: (rule) => rule.required().error('Product must have a preview image'),
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description of product',
      validation: (rule) => rule.required().error('Product must have a description'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      initialValue: 4,
      validation: (rule) => rule.required().error('Price must exist'),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [
        {
          type: 'category',
        },
      ],
      validation: (rule) => rule.required().error('Must belong to a category for proper sorting'),
    }),
  ],
})
