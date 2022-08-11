describe('drag and drop test', () => {
    it('visits the desired page', () => {
        cy.visit('http://the-internet.herokuapp.com/drag_and_drop')
    })
    it('can drag and drop', () => {
        // get inital location of column-b
        let initialPositionB
        cy.get('div[id="column-a"]').then(
            ($columnB) => {
                initialPositionB = $columnB.position();
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
        // is where the old location of column-b
        cy.get('div[id="column-a"]').then(
            ($columnA) => {
                expect($columnA.position()).deep.equal(initialPositionB)
            });
    })
})

