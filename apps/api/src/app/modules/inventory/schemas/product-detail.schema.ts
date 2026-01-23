import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDetailDocument = HydratedDocument<ProductDetail>;

@Schema({ collection: 'product_details_mongo' })
export class ProductDetail {
  @Prop({ required: true, type: String }) // Storing uuid as string
  product_id: string;

  @Prop()
  brand: string;

  @Prop({ type: Object })
  attributes: any;

  @Prop([String])
  images: string[];

  @Prop()
  description_html: string;

  @Prop({ type: Object })
  seo_tags: any;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
