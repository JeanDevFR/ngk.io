import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'
import mjml from 'mjml'

export default class EmailConfirmation extends BaseMailer {
  constructor(private user: User, private url: string) {
    super()
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "EmailConfirmation.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public async prepare(message: MessageContract) {
    const html = mjml(
      await View.render('emails/registration', { user: this.user, url: this.url })
    ).html

    message
      .subject('[NGK] - Validation de votre compte')
      .from('no-reply@ngk.io')
      .to(this.user.email)
      .html(html)
  }
}
