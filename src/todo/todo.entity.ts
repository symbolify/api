import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column
  content: string;

  @Column
  status: boolean;
}