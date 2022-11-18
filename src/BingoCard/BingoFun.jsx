
const createEmptyCard = () => {
    return Array (5)
        .fill(null)
        .map((row) =>
            Array (5)
                .fill(null)
                .map((col) => ({
                    number: 0,
                    checked: false
                }))
        );
};

export const createCardData = () => {
    const card = createEmptyCard();
    let base = 1;

    for (let col = 0; col < 5; col++) {
        const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      //  const range = [0, 1, 2, 3, 4];

        for (let row = 0; row < 5; row++) {

            const idx = parseInt((Math.random() * range.length).toString(), 10);
            card[row][col].number = range[idx] + base;
            if (row == 2 && col == 2) {
                card[row][col].checked = true
            }
            range.splice(idx, 1);

           

        }
        base += 15;
    }

    card[2][2].number = 0;

    return card;


}