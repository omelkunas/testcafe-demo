import { Selector, t } from "testcafe"

export default class ProductDetailsPage {
  constructor() {
    this.productPrice = Selector('span#price-value-4')
    this.productQuantity = Selector('input#product_enteredQuantity_4')
    this.addToCart = Selector('button#add-to-cart-button-4')
    this.successMessage = Selector('div.bar-notification.success')
  }
}
