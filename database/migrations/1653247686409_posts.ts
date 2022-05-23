import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 150).notNullable()
      table.string('slug', 255).notNullable()
      table.text('body').notNullable()
      table.boolean('draft').notNullable().defaultTo(true)

      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
