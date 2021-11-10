describe("Admin can see a list of departments", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/departments**", {
      fixture: "departmentList.json",
      statusCode: 200,
    });
    cy.visit("/");
  });

  describe("Departments are displayed in the data table", () => {
    it("is expected that the fika table is visible", () => {
      cy.get("[data-cy=department-table]").should("be.visible");
    });
  });
});
