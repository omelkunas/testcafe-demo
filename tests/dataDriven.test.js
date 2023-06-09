import { ClientFunction } from "testcafe"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CustomerPage from "./pages/CustomerPage" 

const dataSet = require('./data/data.json')
const URL = 'https://demo.nopcommerce.com/'

const homePage = new HomePage()
const registerPage = new RegisterPage()
const loginPage = new LoginPage()
const customerPage = new CustomerPage()

const getURL = ClientFunction(() => window.location.href)

fixture('Registration Fixture')
  .page(URL)

test('User should open home page', async t => {
  await t
    .maximizeWindow()
    .expect(getURL()).eql(URL)
    .expect(homePage.subtitleHeader.exists).ok()
})

dataSet.forEach(data => {
  test('User should register', async t => {
    const userEmail = `${data.email}+${Date.now()}@test.com`
    await t
      .maximizeWindow()
      .click(homePage.registerLink)
      .expect(getURL()).contains('register')
      .click(registerPage.genderOptionMale)
      .typeText(registerPage.firstName, data.firstname)
      .typeText(registerPage.lastName, data.lastname)
    await registerPage.selectDOB(data.dobDay, data.dobMonth, data.dobYear)
    await t
      .typeText(registerPage.email, userEmail)
      .typeText(registerPage.password, data.password)
      .typeText(registerPage.confirmPassword, data.password)
      .click(registerPage.registerButton)
      .expect(registerPage.successfulMessage.exists).ok()
      // login with registered account
      .click(homePage.loginLink)
      .expect(loginPage.accountHeader.exists).ok()
      .typeText(loginPage.email, userEmail)
      .typeText(loginPage.password, data.password)
      .click(loginPage.submitBtn)
      // Goto my Account
      .click(homePage.myAccountLink)
      // Check Orders
      .expect(customerPage.orderList.exists).ok()
      .click(customerPage.orderList)
      .expect(customerPage.noOrdersLabel.exists).ok()
      // logiout
      .click(homePage.logoutLink)
      .expect(homePage.loginLink.exists).ok()
  })
})


