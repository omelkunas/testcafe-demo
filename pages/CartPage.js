import { Selector, t } from "testcafe"

export default class CartPage {
  constructor() {
    this.termsCheckbox = Selector('input#termsofservice')
    this.cartTotal = Selector('td.cart-total-right')
    this.checkoutBtn = Selector('button#checkout')
  }
}
