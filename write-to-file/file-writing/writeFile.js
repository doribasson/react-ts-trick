const fs = require('fs');

// // Data to be written into the file
// const data = 'Hello, this is some data to be written into the file!';

// // File path where you want to create/write the file
// const filePath = 'example.txt';

// // Write data to the file
// fs.writeFile(filePath, data, (err) => {
//     if (err) {
//         console.error('Error writing file:', err);
//     } else {
//         console.log('Data has been written to the file successfully!');
//     }
// });



function readFileToObj(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const lines = data.split('\n');
            const obj = {};

            lines.forEach((line,i) => {
                const keyValue = line.trim().split('=');
                const key = keyValue[0];
                const value = keyValue[1];
                obj[key] = i;
            });

            resolve(obj);
        });
    });
}

// Example usage:
const filePath = 'example.txt'; // Path to your text file
readFileToObj(filePath)
    .then(obj => {
        console.log('Object created from file:', obj);
    })
    .catch(err => {
        console.error('Error reading file:', err);
    });

