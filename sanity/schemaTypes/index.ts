import { type SchemaTypeDefinition } from 'sanity'
import { categotySchema } from './categorySchema'
import { addressSchema } from './addressSchema'
import { authorSchema } from './authorSchema'
import { blockContentSchema } from './blockContentSchema'
import { blogCategorySchema } from './blogCategorySchema'
import { blogSchema } from './blogSchema'
import { brandSchema } from './brandSchema'
import { orderSchema } from './orderSchema'
import { productSchema } from './productSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categotySchema, 
    addressSchema,
    authorSchema,
    blockContentSchema,
    blogCategorySchema,
    blogSchema,
    brandSchema,
    orderSchema,
    productSchema
  ],
}
