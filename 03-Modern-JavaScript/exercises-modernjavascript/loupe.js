/*

http://latentflip.com/loupe/

Loupe is NOT compatiable with ES6

*/
const fetchOverNetwork = function() {
    setTimeout(function callback() {
        console.log('3. fetch done');
    }, 3000);
};

console.log('1. Start fetching...');
fetchOverNetwork();
console.log('2. Doing something else while fetching...');
