import { Selector, t} from 'testcafe'

export default class RegisterPage {
  constructor () {
    this.genderOptionMale = Selector('input#gender-male')
    // this.genderOptionMale = Selector('input[id="gender-male"]')
    this.firstName = Selector('input#FirstName')
    this.lastName = Selector('input#LastName')
    this.dobDayList = Selector('select[name="DateOfBirthDay"]')
    this.dobMonthList = Selector('select[name="DateOfBirthMonth"]')
    this.dobYearList = Selector('select[name="DateOfBirthYear"]')
    this.email = Selector('input#Email')
    this.password = Selector('input#Password')
    this.confirmPassword = Selector('input#ConfirmPassword')
    this.registerButton = Selector('button#register-button')
    this.successfulMessage = Selector('div.result').withText('Your registration completed')
  }

  async selectDOB(day, month, year) {
    const dayOption = this.dobDayList.find('option')
    const monthOption = this.dobMonthList.find('option')
    const yearOption = this.dobYearList.find('option')

    await t
      .click(this.dobDayList)
      .click(dayOption.withText(day))
      .click(this.dobMonthList)
      .click(monthOption.withText(month))
      .click(this.dobYearList)
      .click(yearOption.withText(year))
  }
}
