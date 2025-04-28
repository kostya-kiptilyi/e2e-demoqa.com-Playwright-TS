import { expect, type Locator, type Page } from '@playwright/test';
import path from 'path';

export class RegistrationPage {
  constructor(private readonly page: Page) {}

  // Locators
  private get inputFirstName() { return this.page.locator('//input[@id="firstName"]'); }
  private get inputLastName() { return this.page.locator('//input[@id="lastName"]'); }
  private get inputUserEmail() { return this.page.locator('//input[@id="userEmail"]'); }
  private get inputMobileNumber() { return this.page.locator('//input[@id="userNumber"]'); }
  private get inputDateOfBirth() { return this.page.locator('#dateOfBirthInput'); }
  private get datepickerMonthSelect() { return this.page.locator('(//*[@id="dateOfBirth"]//select)[1]'); }
  private get datepickerYearSelect() { return this.page.locator('(//*[@id="dateOfBirth"]//select)[2]'); }
  private get datepickerFirstDayOfMonth() { return this.page.locator('.react-datepicker__day'); }
  private get inputSubject() { return this.page.locator('#subjectsInput'); }
  private get subjectContainer() { return this.page.locator('//*[@id="subjectsContainer"]/div/div[1]/div[1]/div[1]'); }
  private get inputCurrentAddress() { return this.page.locator('#currentAddress'); }
  private get containerState() { return this.page.locator('#state'); }
  private get containerCity() { return this.page.locator('#city'); }
  private get uploadInput() { return this.page.locator('#uploadPicture'); }
  private get submitBtn() { return this.page.locator('#submit'); }
  private get modalHeader() { return this.page.locator('.modal-header'); }
  private get closeModalBtn() { return this.page.locator('#closeLargeModal'); }

  private get stateSelected() { return this.page.locator('.css-1uccc91-singleValue'); }
  private get citySelected() { return this.page.locator('.css-1uccc91-singleValue').nth(1); }

  private get studentName() { return this.page.locator('//table/tbody/tr[1]/td[2]'); }
  private get studentEmail() { return this.page.locator('//table/tbody/tr[2]/td[2]'); }
  private get gender() { return this.page.locator('table tbody tr:nth-child(3) td:nth-child(2)'); }
  private get mobileNumber() { return this.page.locator('//table/tbody/tr[4]/td[2]'); }
  private get dateOfBirth() { return this.page.locator('#dateOfBirthInput'); }
  private get subject() { return this.page.locator('//table/tbody/tr[6]/td[2]'); }
  private get hobby() { return this.page.locator('//table/tbody/tr[7]/td[2]'); }
  private get picture() { return this.page.locator('//table/tbody/tr[8]/td[2]'); }
  private get address() { return this.page.locator('//table/tbody/tr[9]/td[2]'); }
  private get stateAndCity() { return this.page.locator('//table/tbody/tr[10]/td[2]'); }

  // Dynamic Locators
  private genderRadioBtn(number: string): Locator {
    return this.page.locator(`//input[@id='gender-radio-${number}']`);
  }

  private hobbyCheckbox(number: string) {
    return this.page.locator(`#hobbies-checkbox-${number}`);
  }

  // Actions: Fill
  async fillFirstName(name: string) {
    await this.inputFirstName.fill(name);
  }

  async fillLastName(name: string) {
    await this.inputLastName.fill(name);
  }

  async fillUserEmail(email: string) {
    await this.inputUserEmail.fill(email);
  }

  async fillMobileNumber(number: string) {
    await this.inputMobileNumber.fill(number, { timeout: 5000 });
  }

  async fillDateOfBirth(month: string, year: string) {
    await this.inputDateOfBirth.click();
    await this.datepickerMonthSelect.selectOption(month);
    await this.datepickerYearSelect.selectOption(year);
    await this.datepickerFirstDayOfMonth.first().click();
  }

  async fillCurrentAddress(address: string) {
    await this.inputCurrentAddress.fill(address);
  }

  // Actions: Select
  async selectGender(genderNumber: string) {
    await this.submitBtn.scrollIntoViewIfNeeded();
    await this.genderRadioBtn(genderNumber).check({force: true});
  }  

  async selectSubject(subject: string) {
    await this.inputSubject.fill(subject);
    await this.inputSubject.press('Enter');
  }

  async selectHobby(hobbyNumber: string) {
    await this.hobbyCheckbox(hobbyNumber).check({ force: true });
  }

  async selectState(stateName: string) {
    await this.containerState.click();
    await this.page.locator(`div[class*="option"]`, { hasText: stateName }).click();
  }

  async selectCity(cityName: string) {
    await this.containerCity.click();
    await this.page.locator(`div[class*="option"]`, { hasText: cityName }).click();
  }

  async uploadFile(patchPicture: string) {
    // await registrationPage.uploadFile(page);
    const filePath = path.resolve(`${patchPicture}`);
    // Upload file
     await this.uploadInput.setInputFiles(filePath);
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }

  async clickCloseModal() {
    await this.closeModalBtn.click();
  }

  // Verifications
  async verifyFirstName(name: string) {
    await expect(this.inputFirstName).toHaveValue(name);
  }

  async verifyLastName(name: string) {
    await expect(this.inputLastName).toHaveValue(name);
  }

  async verifyUserEmail(email: string) {
    await expect(this.inputUserEmail).toHaveValue(email);
  }

  async verifyMobileNumber(number: string) {
    await expect(this.inputMobileNumber).toHaveValue(number);
  }

  async verifyGenderSelected(genderNumber: string) {
    await expect(this.genderRadioBtn(genderNumber)).toBeChecked();
  }

  async verifySubject(subjectName: string) {
    await expect(this.subjectContainer).toHaveText(subjectName);
  }

  async verifyHobbySelected(hobbyNumber: string) {
    await expect(this.hobbyCheckbox(hobbyNumber)).toBeChecked();
  }

  async verifyCurrentAddress(addressText: string) {
    await expect(this.inputCurrentAddress).toHaveValue(addressText);
  }

  async verifyState(stateName: string) {
    await expect(this.stateSelected).toHaveText(stateName);
  }

  async verifyCity(cityName: string) {
    await expect(this.citySelected).toHaveText(cityName);
  }

  async verifyModalHeaderText(text: string) {
    await expect(this.modalHeader).toHaveText(text);
  }

  async verifyStudentName(name: string) {
    await expect(this.studentName).toHaveText(name);
  }

  async verifyStudentEmail(email: string) {
    await expect(this.studentEmail).toHaveText(email);
  }

  async verifyGenderText(genderText: string) {
    await expect(this.gender).toHaveText(genderText);
  }

  async verifyMobileNumberInTable(number: string) {
    await expect(this.mobileNumber).toHaveText(number);
  }

  async verifyDateOfBirthInTable(dob: string){
    await expect(this.dateOfBirth).toHaveValue(dob)
  }

  async verifyDateOfBirthIsVisibleAndIsNotEmptyInTable() {
    await expect(this.dateOfBirth).not.toHaveText('-');
    await expect(this.dateOfBirth).not.toBeEmpty();
  }

   async verifyCloseBtnInTable() {
    await expect(this.closeModalBtn).toBeVisible();
   }
  
  async verifySubjectInTable(subjectText: string) {
    await expect(this.subject).toHaveText(subjectText);
  }

  async verifyHobbyInTable(hobbyText: string) {
    await expect(this.hobby).toHaveText(hobbyText);
  }

  async verifyPictureInTable(pictureName: string) {
    await expect(this.picture).toHaveText(pictureName);
  }

  async verifyAddressInTable(addressText: string) {
    await expect(this.address).toHaveText(addressText);
  }

  async verifyStateAndCityInTable(stateCity: string) {
    await expect(this.stateAndCity).toHaveText(stateCity);
  }
};