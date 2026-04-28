import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      type: 'image',
    }),
  ],
});
