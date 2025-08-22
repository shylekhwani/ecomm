import { type SchemaTypeDefinition } from 'sanity';
import { categotySchema } from './categorySchema';
import { addressSchema } from './addressSchema';
import { brandSchema } from './brandSchema';
import { orderSchema } from './orderSchema';
import { productSchema } from './productSchema';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categotySchema, 
    addressSchema,
    brandSchema,
    orderSchema,
    productSchema
  ],
};
