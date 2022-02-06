import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm'


@Entity('wishlist')
export class Wishlist {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column({ name: 'product_id'})
  productId: string;

  @Column({ type: 'integer', name: 'customer_id' })
  customerId: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'review_score'})
  reviewScore: number;
}