import { ClientFunction } from 'testcafe'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SearchResultsPage from './pages/SearchResultsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import MyOrdersPage from './pages/MyOrdersPage'

const URL = 'https://demo.nopcommerce.com/'
const getURL = ClientFunction(() => window.location.href)
const userEmail = `test+${Date.now()}@test.com`

const homePage = new HomePage()
const loginPage = new LoginPage()
const registerPage = new RegisterPage()
const searchResultsPage = new SearchResultsPage()
const productDetailsPage = new ProductDetailsPage()
const cartPage = new CartPage()
const chackoutPage = new CheckoutPage()
const myOrdersPage = new MyOrdersPage()

fixture `E2E Fixture`
  .page(URL)

  test('Assert home page', async t => {
    await t
    .expect(getURL()).eql(URL)
    .expect(homePage.subtitleHeader.exists).ok()
})

test("Place Order E2E Tests", async (t) => {
    await t
    .maximizeWindow()
    .click(homePage.registerLink)
    .expect(getURL()).contains('register')
    .click(registerPage.genderOptionMale)
    .typeText(registerPage.firstName, 'John')
    .typeText(registerPage.lastName, 'Doe')
    .typeText(registerPage.email, userEmail)
    .typeText(registerPage.password, '123456')
    .typeText(registerPage.confirmPassword, '123456')
    .click(registerPage.registerButton)
    .expect(registerPage.successfulMessage.exists).ok()
    // login
    .click(homePage.loginLink)
    .expect(getURL()).contains('login')
    .expect(loginPage.accountHeader.exists).ok()
    .typeText(loginPage.email, userEmail)
    .typeText(loginPage.password, '123456')
    .click(loginPage.submitBtn)
    // adding to cart
    await homePage.search('Apple MacBook Pro 13-inch')
    await t
    .click(searchResultsPage.productTitle)
    .expect(getURL()).contains('apple-macbook-pro-13-inch')
    .expect(productDetailsPage.productPrice.exists).ok()
    .selectText(productDetailsPage.productQuantity).pressKey("delete")
    .typeText(productDetailsPage.productQuantity, '3')
    .click(productDetailsPage.addToCart)
    .expect(productDetailsPage.successMessage.exists).ok()
    // .wait(3000)
    .click(homePage.shoppingCartLink)
    .click(cartPage.termsCheckbox)
    .click(cartPage.checkoutBtn)
    .expect(getURL()).contains('checkout')
    // await chackoutPage.selectCountry('Germany')
    // await t
    //     .typeText(chackoutPage.cityTxt, 'test')
    //     .typeText(chackoutPage.addressTxt, '123 test')
    //     .typeText(chackoutPage.zipTxt, '123456')
    //     .typeText(chackoutPage.phoneTxt, '332434345')
    //     .click(chackoutPage.continueBtn)
    //     .click(chackoutPage.nextDayOption)
    //     .click(chackoutPage.nextShippingBtn)
    //     .click(chackoutPage.nextPaymentBtn)
    //     .click(chackoutPage.nextConfirmBtn)
    //     .click(chackoutPage.confirmOrderBtn)
    //     .expect(chackoutPage.orderConfirmationMessage.exists).ok()
    //     .click(chackoutPage.viewOrderDetailsLink)
    //     .click(homePage.myAccountLink)
    //     .click(myOrdersPage.orders)
});

test("Change Currency Test", async (t) => {
    await homePage.changeCurrency('Euro')
});
 