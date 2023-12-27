import mockData from "../fixtures/mock.json";
const { paymentReference, paymentCurrency, paymentType, paymentStatus } =
  mockData;
class Payments {
  //// Visit to payment details page upon click payment ////////////////
  onClickPayment() {
    cy.wait(7000).get(".ant-table-tbody tr").eq(1).find("td").eq(0).click();
  }

  //// Download payment ////////////////
  downloadPayment() {
    const downloadBtn = cy.xpath(
      "//button[contains(text(), 'Download confirmation')]"
    );
    downloadBtn.should("be.visible").click();
  }

  //// Go back to payments page through next prev button ////////////////
  goBackToPayments() {
    cy.wait(3000).get("#leftArrow").click();
  }

  //// Click on payments advance filter button ////////////////
  showAdvanceFilter() {
    const filterButton = cy.xpath("//button[contains(text(), 'Filters')]");
    filterButton.should("be.visible").click();
  }

  //// Select From and To date with current date in date range ////////////////
  selectDateRange() {
    // Find the Date RangePicker component
    cy.get(".ant-picker-range").click();
    // Select the start date
    cy.get(".ant-picker-cell-today").click();
    // Select the end date
    cy.get(".ant-picker-cell-today").click();
    cy.wait(200);
  }

  //// Apply filters currency, payment type and payment status ////////////////
  selectFilters() {
    /* Select Currency */
    cy.get("#currencies").click();
    cy.get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
      .find(".ant-select-item-option")
      .each((el) => {
        if (el.text() === paymentCurrency) {
          cy.wrap(el).click();
        }
      });

    /* Select Payment Type */
    const searchType = cy.wait(1000).get("#type");
    searchType.focus().type(paymentType, { log: true }).blur();

    cy.get("#type").click();
    cy.get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
      .find(".ant-select-item-option")
      .each((el) => {
        if (el.text() === paymentType) {
          cy.wrap(el).click();
        }
      });

    /* Select Payment Status */
    const searchStatus = cy.wait(1000).get("#status");
    searchStatus.focus().type(paymentStatus, { log: true }).blur();

    cy.get("#status").click();
    cy.get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
      .find(".ant-select-item-option")
      .each((el) => {
        if (el.text() === paymentStatus) {
          cy.wrap(el).click();
        }
      });
  }

  //// Apply filters upon add filter form ////////////////
  applyFilters() {
    const onHandleSubmitFilters = cy.xpath(
      "//button[contains(text(), 'Apply')]"
    );
    onHandleSubmitFilters.should("be.visible").click();
  }

  //// Clear payments filters ////////////////
  clearFilters() {
    const filterButton = cy
      .wait(2000)
      .xpath("//button[contains(text(), 'Filters')]");
    filterButton.should("be.visible").click();

    const onHandleClearFilters = cy
      .wait(1000)
      .xpath("//button[contains(text(), 'Clear all')]");
    onHandleClearFilters.should("be.visible").click();

    const onHandleCancelFilters = cy.xpath(
      "//button[contains(text(), 'Cancel')]"
    );
    onHandleCancelFilters.should("be.visible").click();

    return false;
  }

  //// Search transaction by Id ////////////////
  searchTransactionRef() {
    const txnRef = cy.get("input[name='payments']");
    txnRef.focus().type(paymentReference, { log: true }).blur();

    cy.wait(4000).get("#close").click();
  }
}

export default Payments;
