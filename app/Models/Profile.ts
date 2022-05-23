import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string

  @column()
  public xboxLiveGamertag?: string

  @column()
  public playstationOnlineId?: string

  @column()
  public nintendoOnlineId?: string

  @column()
  public youtubeUrl?: string

  @column()
  public twitchUrl?: string

  @column()
  public instagramUrl?: string

  @column()
  public twitterUrl?: string

  @column()
  public websiteUrl?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
