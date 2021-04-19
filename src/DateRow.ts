import { Table, Column, Model, UpdatedAt, Index, DataType} from 'sequelize-typescript'

@Table
export default class DateRow extends Model {

  @Column({type: DataType.DATE, primaryKey: true})
  dt!: Date

  @Column(DataType.DECIMAL(18,5))
  commission!: number
  
  @Column(DataType.INTEGER)
  sales!: number
  
  @Column(DataType.INTEGER)
  leads!: number
  
  @Column(DataType.INTEGER)
  clicks!: number
  
  @Column(DataType.DECIMAL(18,5))
  epc!: number
  
  @Column(DataType.INTEGER)
  impressions!: number
  
  @Column(DataType.DECIMAL(5,3))
  cr!: number
  
}