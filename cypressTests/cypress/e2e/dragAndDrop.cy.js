describe('drag and drop test', () => {
    it('visits the desired page', () => {
        cy.visit('http://the-internet.herokuapp.com/drag_and_drop')
    })
    it('can drag and drop', () => {
        // get inital location of column-b
        let initialPositionA
        let initialPositionB
        cy.get('div[id="column-a"]').contains('A').then(
            ($textA) => {
                initialPositionA = $textA.position();
            });
        
        cy.get('div[id="column-b"]').contains('B').then(
            ($textB) => {
                initialPositionB = $textB.position();
            });
                
        const dataTransfer = new DataTransfer();
        // drag the column-a
        cy.get('div[id="column-a"]').trigger('dragstart', {
            dataTransfer
        });
        // drop at column-b
        cy.get('div[id="column-b"]').trigger('drop', {
            dataTransfer
        });

        // check to make sure that the new location of column-a
        // is where the old location of column-b and vice versa
        cy.get('div[id="column-b"]').contains('A').then(
            ($textA) => {
                expect($textA.position()).deep.equal(initialPositionB)
        });

        cy.get('div[id="column-a"]').contains('B').then(
            ($textB) => {
                expect($textB.position()).deep.equal(initialPositionA)
        });
    })
})

