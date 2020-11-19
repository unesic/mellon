const Classes = {};

Classes.container = [
	"relative",
	"p-2",
	"border",
	"border-solid",
	"border-gray-300",
	"rounded",
	"flex",
	"justify-center",
	"items-center",
].join(" ");

Classes.base = [
	"rounded-full",
	"border-solid",
	"border-gray-600",
	"bg-teal-200",
	"object-cover",
	"object-center",
].join(" ");

Classes.sm = ["w-16", "border-2"].join(" ");

Classes.md = ["w-32", "border-4"].join(" ");

Classes.lg = ["w-56", "border-8"].join(" ");

export default Classes;
