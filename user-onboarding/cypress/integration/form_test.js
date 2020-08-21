// LECTURE NOTES

// describe("This is our first test", () => {
//     it("Should return true", () => {
//         expect(true).to.equal(true);
//     });
// });


describe("Testing our form input", () => {
    beforeEach(function() {
        // runs before each test in this block
        cy.visit("http://localhost:3000/")
    });

    it("Input Name into the Name input", () => {

        // CHECKING FOR NAME INPUT

        // Arrange - Get the element
        cy.get('[for="name"] > input')
            // Act - Mimic User Interaction
            .type("Maycie Morris")
            // Assert - Test/ Verify
            .should("have.value", "Maycie Morris")
            .clear()
        cy.contains("Name is a required field")

        // CHECKING FOR EMAIL INPUT

        cy.get('[for="email"] > input')
          .type("email@email.com")
          .should("have.value", "email@email.com")

        // CHECKING FOR PASSWORD INPUT

        cy.get('[for="password"] > input')
          .type("12345")
          .should("have.value", "12345")

        // CHECKING FOR CHECKBOX

        cy.get('input[type="checkbox')
            .check()
            .should("be.checked")

        // CHECKING IF USER CAN SUBMIT

        cy.get('form').submit()
    });
});





