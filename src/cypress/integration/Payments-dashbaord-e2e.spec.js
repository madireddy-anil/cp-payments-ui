/// <reference types="cypress" />

import LoginPage from "../ui-pages/Login";
import Payments from "../ui-pages/Payments";
import Beneficiary from "../ui-pages/Beneficiaries";
const lp = new LoginPage();
const payment = new Payments();
const beneficiary = new Beneficiary();

describe("Payments dashboard e2e test", () => {
  //// Client login page ///////---
  it("Visit to login page", () => {
    cy.visit(Cypress.env("baseUrl") + "/login");
    lp.redirectLoginPage("cms");
  });

  //// Login ///////---
  it("Enter username and password", () => {
    lp.enterEmail(Cypress.env("username"));
    lp.enterPassword(Cypress.env("password"));
  });

  it("Confirm Login and select an entity", () => {
    lp.clickLoginButton();
  });

  it("Upon user authorization, visit to payment dashboard", () => {
    lp.isUserAuthorized();
  });

  //// Payments ///////---

  it("Click the first payment in the list of payments to view full details", () => {
    payment.onClickPayment();
  });

  it("Download the payment details", () => {
    payment.downloadPayment();
  });

  it("Go back to the payments history page", () => {
    payment.goBackToPayments();
  });

  it("Click the advance payments filter button", () => {
    payment.showAdvanceFilter();
  });

  // it("Select date range", () => {
  //   payment.selectDateRange();
  // });

  it("Select the filters options like currency, payment type, and payment status", () => {
    payment.selectFilters();
  });

  it("Apply the payments filter", () => {
    cy.wait(500);
    payment.applyFilters();
  });

  it("Clear the payments filter", () => {
    payment.clearFilters();
  });

  // it("Validate date range from advance filters", () => {
  //   payment.showAdvanceFilter();
  //   payment.selectDateRange();
  //   payment.applyFilters();

  //   // wait for 500ms and clear the filters again
  //   cy.wait(500);
  //   payment.showAdvanceFilter();
  //   payment.clearFilters();
  // });

  it("Search payment by transaction reference and clear after 2000ms", () => {
    payment.searchTransactionRef();
  });

  //// Beneficiaries ///////---

  it("Visit to beneficiaries page", () => {
    cy.wait(2000);
    cy.get("#rc-tabs-1-tab-beneficiaries").click();
  });

  it("Click the first beneficiary in the list of beneficiaries to view full details", () => {
    beneficiary.onClickBeneficiary();
  });

  it("Go back to the beneficiaries page", () => {
    beneficiary.goBackToBeneficiary();
  });

  it("Click the advance beneficiaries filter button", () => {
    beneficiary.showAdvanceFilter();
  });

  it("Select the filters options like currency and status", () => {
    beneficiary.selectFilters();
  });

  it("Apply the beneficiaries filter", () => {
    beneficiary.applyFilters();
  });

  it("Clear the beneficiaries filter", () => {
    beneficiary.clearFilters();
  });

  it("Search payment by beneficiary name and clear after 2000ms", () => {
    beneficiary.searchTransactionRef();
  });

  it("Validate the delete beneficiary popup", () => {
    beneficiary.onClickBeneficiary();
    beneficiary.deleteBenePopup();
  });
});
