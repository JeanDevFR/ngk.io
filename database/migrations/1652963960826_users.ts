import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserRoles } from 'App/Enums/UserRoles'
import { UserStatus } from 'App/Enums/UserStatus'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('username', 50).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.integer('role').unsigned().notNullable().defaultTo(UserRoles.User)
      table.integer('status').unsigned().notNullable().defaultTo(UserStatus.Inactive)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
