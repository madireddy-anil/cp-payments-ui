import mockData from "../fixtures/mock.json";
const { beneName, beneCurrency, beneStatus } = mockData;
class Beneficiary {
  onClickBeneficiary() {
    cy.wait(7000).get(".ant-table-tbody tr").eq(1).find("td").eq(0).click();
  }

  goBackToBeneficiary() {
    cy.wait(2000).get("#leftArrow").click();
  }

  showAdvanceFilter() {
    const filterButton = cy.xpath("//button[contains(text(), 'Filters')]");
    filterButton.should("be.visible").click();
  }

  selectFilters() {
    /* Select Currency */
    cy.get("#currency").click();
    cy.get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
      .find(".ant-select-item-option-content")
      .each((el) => {
        if (el.text() === beneCurrency) {
          cy.wrap(el).click();
        }
      });

    // const closeDropdown = cy.xpath("//span[contains(text(), 'Filter')]");
    // closeDropdown.should("be.visible").click();

    /* Select Beneficiary Status */
    cy.wait(500).get("#status").click();
    cy.get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
      .find(".ant-select-item-option-content")
      .each((el) => {
        if (el.text() === beneStatus) {
          cy.wrap(el).click();
        }
      });
  }

  applyFilters() {
    const onHandleSubmitFilters = cy
      .wait(500)
      .xpath("//button[contains(text(), 'Apply')]");
    onHandleSubmitFilters.should("be.visible").click();
  }

  clearFilters() {
    const filterButton = cy
      .wait(2000)
      .xpath("//button[contains(text(), 'Filters')]");
    filterButton.should("be.visible").click();

    const onHandleClearFilters = cy
      .wait(500)
      .xpath("//button[contains(text(), 'Clear all')]");
    onHandleClearFilters.should("be.visible").click();

    const onHandleCancelFilters = cy
      .wait(500)
      .xpath("//button[contains(text(), 'Cancel')]");
    onHandleCancelFilters.should("be.visible").click();
  }

  searchTransactionRef() {
    const txnRef = cy.get("input[name='beneficiaries']");
    txnRef.focus().type(beneName, { log: false }).blur();

    cy.wait(4000).get("#close").click();
  }

  deleteBenePopup() {
    const deleteBeneButton = cy.xpath(
      "//button[contains(text(), 'Delete beneficiary')]"
    );
    deleteBeneButton.should("be.visible").click();

    const cancleDeleteBenePopup = cy
      .wait(2000)
      .xpath("//button[contains(text(), 'Cancel')]");
    cancleDeleteBenePopup.should("be.visible").click();
    cy.wait(1000);
  }
}

export default Beneficiary;
