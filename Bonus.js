/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const roman = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let sum = 0;

    for (let i = 0; i < s.length - 1; i++) {
        if (roman[s[i + 1]] > roman[s[i]]) {
            sum -= roman[s[i]];
        } else {
            sum += roman[s[i]];
        }
    }

    sum += roman[s[s.length - 1]];

    return sum;
};