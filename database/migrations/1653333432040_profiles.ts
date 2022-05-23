import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('xbox_live_gamertag')
      table.string('playstation_online_id')
      table.string('nintendo_network_id')
      table.string('youtube_url')
      table.string('twitch_url')
      table.string('instagram_url')
      table.string('twitter_url')
      table.string('website_url')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
