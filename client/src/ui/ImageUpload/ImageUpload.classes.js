const Classes = {};

Classes.container = [
	"relative",
	"p-2",
	"bg-white",
	"border",
	"border-solid",
	"border-gray-300",
	"rounded",
	"flex",
	"justify-center",
	"items-center",
].join(" ");

Classes.overlay = [
	"flex",
	"justify-center",
	"items-center",
	"absolute",
	"z-0",
	"inset-0",
	"rounded",
	"bg-gray-800",
	"bg-opacity-0",
	"transition-all",
	"ease-in-out",
	"duration-200",
].join(" ");

Classes.overlayActive = ["bg-opacity-50", "z-10"].join(" ");

Classes.text = ["mt-1", "pl-2", "text-sm", "text-gray-600"].join(" ");

Classes.overlayText = [
	"text-sm",
	"text-gray-300",
	"relative",
	"opacity-0",
	"transition-all",
	"ease-in-out",
	"duration-200",
].join(" ");

Classes.overlayTextActive = ["opacity-100"].join(" ");

export default Classes;
