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
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      description: 'Add up to 5 highlights of the product.',
      of: [
        {
          type: 'string',
        },
      ],
      validation: (rule) =>
        rule
          .max(5)
          .error('You can only add up to 5 strings')
          .required()
          .error('You must add at least one string'),
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
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      description:
        'Add one or more ingredients. Each ingredient should be entered as a separate input.',
      of: [
        {
          type: 'string',
          title: 'Ingredient',
        },
      ],
      hidden: ({parent}) => parent?.type !== 'tea', // Hidden unless the product type is 'tea'
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error('At least one ingredient must exist')
          .custom((fields: string[] | undefined) => {
            if (!fields || fields.some((ingredient) => !ingredient.trim())) {
              return 'Ensure all ingredients are properly formatted and not empty.'
            }
            return true
          }),
    }),

    /*
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'string',
      description: 'Enter one or more ingredients, separated by comma (rose, caramel, camphor)',
      validation: (rule) => rule.required().error('At least one ingredient must exist'),
    }),
    */

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

    // ! instructions
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Product Type',
          type: 'string',
          options: {
            list: [
              {title: 'Tea', value: 'tea'},
              {title: 'Accessory', value: 'accessory'},
            ],
          },
          validation: (rule) => rule.required().error('Product type is required'),
        },
        // Conditional fields for tea
        {
          name: 'teaInstructions',
          title: 'Tea Instructions',
          type: 'object',
          hidden: ({parent}) => parent?.type !== 'tea',
          fields: [
            {name: 'teaspoon', title: 'Teaspoon', type: 'number'},
            {name: 'weight', title: 'Weight (g)', type: 'number'},
            {name: 'water', title: 'Water (ml)', type: 'number'},
            {name: 'tempC', title: 'Temperature (°C)', type: 'number'},
            {
              name: 'brewtime',
              title: 'Brew Time',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule) => rule.max(5).error('You can add up to 5 brew times'),
            },
          ],
        },
        // Placeholder or specific fields for accessories
        {
          name: 'accessoryInstructions',
          title: 'Accessory Instructions',
          type: 'text',
          hidden: ({parent}) => parent?.type !== 'accessory',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name', // Product name
      subtitle: 'instructions.type', // Product type (tea, accessory)
      media: 'images.0', // Use the first image as the media preview
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `Type: ${subtitle}` : 'Type: Not specified',
        media,
      }
    },
  },
})
