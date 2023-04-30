import { Selector, t } from "testcafe"

export default class HomePage {
  constructor () {
    this.subtitleHeader = Selector('h2').withText('Welcome to our store')
    this.registerLink = Selector('a').withText('Register')
    this.loginLink = Selector('a').withText('Log in')
    this.logoutLink = Selector('a').withText('Log out')
    this.shoppingCartLink = Selector('a').withText('Shopping Cart')
    this.myAccountLink = Selector('a').withText('My account')
    this.currencyList = Selector('select#customerCurrency')
  }

  get productSearch() {
    return Selector('input#small-searchterms')
  }

  async search(product) {
    await t
      .typeText(this.productSearch, product)
      .wait(3000)
      .pressKey('enter')
  }

  async changeCurrency(currency) {
    await t
      .click(this.currencyList)
      .click(Selector('option', {text: currency}))
  }
}
