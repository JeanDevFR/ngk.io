import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserRoles } from 'App/Enums/UserRoles'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      username: 'johndoe',
      email: 'johndoe@email.io',
      password: 'secret',
      role: UserRoles.Administrator,
    })
    await UserFactory.createMany(100)
  }
}
