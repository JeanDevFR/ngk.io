import Factory from '@ioc:Adonis/Lucid/Factory'
import { UserRoles } from 'App/Enums/UserRoles'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'secret',
}))
  .state('admin', (user) => (user.role = UserRoles.Administrator))
  .relation('posts', () => PostFactory)
  .build()

export const PostFactory = Factory.define(Post, ({ faker }) => ({
  title: faker.lorem.sentence(),
  body: faker.lorem.sentences(),
})).build()
