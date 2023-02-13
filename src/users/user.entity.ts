import { Book } from 'src/books/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
