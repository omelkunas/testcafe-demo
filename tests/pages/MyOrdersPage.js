import { Selector } from "testcafe";

export default class MyOrderPage {
  constructor() {
    this.orders = Selector('a').withText('Orders')
  }
}
