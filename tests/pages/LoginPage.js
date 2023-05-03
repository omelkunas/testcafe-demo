import { Selector, t} from 'testcafe'

export default class LoginPage {
  constructor () {
    this.email = Selector('input#Email')
    this.password = Selector('input#Password')
    this.submitBtn = Selector('button.login-button')
    this.accountHeader = Selector('strong').withText('Returning Customer')
  }
}
