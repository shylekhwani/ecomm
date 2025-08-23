import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(name asc) `);

const GETAll_PRODUCTS = defineQuery(
  `*[_type == "product"]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      name,
      slug,
      description,
      price,
      discount,
      stock,
      status,
      variant,
      isFeatured,
      "categories": categories[]->{
        _id,
        title,
        slug
      },
      "brand": brand->{
        _id,
        title
      },
      images[]{
        _key,
        _type,
        crop,
        hotspot,
        "url": asset->url
      }
    }`
);

const DEAL_PRODUCTS = defineQuery(
  `
  *[_type == "product" && status == "hot"] | order(name asc) {
    ...,
    categories[]->{
      _id,
      title,
      slug,
      description,
      range,
      featured,
      image
    }
  }
`);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
);

const BRAND_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`);

const MY_ORDERS_QUERY =
  defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
...,products[]{
  ...,product->
}
}`);


export {
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  GETAll_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  MY_ORDERS_QUERY,
};