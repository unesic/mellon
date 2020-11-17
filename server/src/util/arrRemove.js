module.exports = Array.prototype.remove = function() {
	// Removes item from array by value
    var what, args = arguments, L = args.length, ax;
    while (L && this.length) {
        what = args[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};;
