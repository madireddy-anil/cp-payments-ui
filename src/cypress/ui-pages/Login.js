import mockData from "../fixtures/mock.json";
const { entityName, loginBtn } = mockData;
class LoginPage {
  redirectLoginPage(portal) {
    const buttonName = portal === "cms" ? "Login to CMS" : "Login to BMS";
    const loginButton = cy.xpath(`//button[contains(text(), '${buttonName}')]`);
    loginButton.should("be.visible").click();
  }

  enterEmail(username) {
    const emailField = cy.get("input[name='username']");
    emailField.focus().type(username, { log: false }).blur();
  }

  enterPassword(password) {
    const passwordField = cy.get("input[name='password']");
    passwordField.focus().type(password, { log: false }).blur();
  }

  clickLoginButton() {
    cy.intercept(
      "GET",
      Cypress.env("organizationsUrl") +
        "/users/13801a38-ea1e-48de-b39b-e5f3f9b65632/organisations"
    ).as("GetOrganizations");

    cy.xpath(`//button[contains(text(), '${loginBtn}')]`)
      .should("be.visible")
      .eq(1)
      .click();

    describe("Check is the new payment get success", () => {
      cy.wait("@GetOrganizations")
        .its("response.body.status")
        .should((status) => {
          console.log(status, "Get Organizations List Status");
          expect(status).to.contain("success");
        })
        .then(() => {
          cy.xpath(`//button[contains(text(), '${entityName}')]`).click({
            force: true
          });
        });
    });
  }

  isUserAuthorized() {
    cy.xpath("//a[contains(text(), 'PRIVATE: Payments')]").click();
  }

  enterOneTimePassword(secretKey) {
    cy.task("generateOTP", secretKey, { log: false }).then((token) => {
      cy.get("input[name='code']").type(token, { log: false }).blur();
    });
  }

  clickOTPLoginButton() {
    const loginButton = cy.get("button[type='submit']");
    loginButton.should("be.visible").click();
  }
}

export default LoginPage;
