/** Data generation */ 

/** Create random array of objects */ 
export const getRandomArray = (numItems) => {
    let data = [];
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < numItems; i++) {
        data.push({
            label: names[i],
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

/** Create random array of objects (with date) */
export const getRandomDateArray = (numItems) => {
    let data = [];
    let baseTime = new Date('2020-01-01T12:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for (var i = 0; i < numItems; i++) {
        data.push({
            time: new Date(baseTime + i * dayMs),
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

/** Push random data into array */
export const getData = () => {
    let data = [];

    data.push({
        title: 'Czasy dostępu',
        data: getRandomDateArray(150)
    });

    data.push({
        title: 'Inne czasy',
        data: getRandomArray(20)
    });

    data.push({
        title: 'Jeszcze inne czasy',
        data: getRandomArray(10)
    });

    data.push({
        title: 'Może średnie czasy',
        data: getRandomArray(6)
    });

    return data;
}

