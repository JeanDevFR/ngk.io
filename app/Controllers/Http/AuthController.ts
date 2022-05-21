import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import Route from '@ioc:Adonis/Core/Route'
import EmailConfirmation from 'App/Mailers/EmailConfirmation'
import Env from '@ioc:Adonis/Core/Env'
import { UserStatus } from 'App/Enums/UserStatus'

export default class AuthController {
  public showLogin({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    await auth.attempt(email, password)
    return response.redirect('/')
  }

  public showRegistration({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.create(payload)

    const url = Route.makeSignedUrl(
      'AuthController.confirmEmail',
      {
        id: user.id,
      },
      {
        expiresIn: '30m',
      }
    )

    new EmailConfirmation(user, `${Env.get('APP_URL')}${url}`).sendLater()

    // await auth.login(user)

    return response.redirect('/')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }

  public async confirmEmail({ request, response, auth, params, session }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      session.flash('error', "Ce lien n'est pas valide")
      return response.redirect().toPath('/')
    }

    const id = params.id
    const user = await User.findOrFail(id)
    user.status = UserStatus.Active
    await user.save()
    await auth.login(user)
    return response.redirect().toPath('/')
  }
}
