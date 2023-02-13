import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
  
  @BeforeInsert()
  async beforeInsert() {
    console.log(this);
  }
}
