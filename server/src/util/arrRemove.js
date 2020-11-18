module.exports = Array.prototype.remove = () => {
	// Removes item from array by value
	let what,
		args = arguments,
		L = args.length,
		ax;
	while (L && this.length) {
		what = args[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};
