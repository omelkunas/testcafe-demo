import { Selector, t} from 'testcafe'

export default class CustomerPage {
  constructor() {
    this.orderList = Selector('a').withText('Orders')
    this.noOrdersLabel = Selector('div.no-data').withText('No orders')
  }
}
