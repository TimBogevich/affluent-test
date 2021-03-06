import { Table, Column, Model, DataType} from 'sequelize-typescript'

@Table
export default class User extends Model {

  @Column({type: DataType.INTEGER, primaryKey: true})
  id!: number

  @Column(DataType.STRING)
  email!: string
  
  @Column(DataType.STRING)
  first_name!: string
  
  @Column(DataType.STRING)
  last_name!: string
  
  @Column(DataType.STRING)
  avatar!: string
  
}