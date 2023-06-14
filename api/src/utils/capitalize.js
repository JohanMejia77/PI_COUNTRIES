const capitalize = (str) => {
    return str.split(' ').map(word => {
        return word.length <= 3 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
};
module.exports = capitalize;