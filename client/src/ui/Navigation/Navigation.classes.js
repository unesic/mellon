const Classes = {};

Classes.container = ["h-full", "p-3"].join(" ");

Classes.containerInner = [
	"p-2",
	"border",
	"border-solid",
	"border-gray-400",
	"rounded",
	"bg-gray-100",
].join(" ");

Classes.section = [
	"mt-4",
	"pt-2",
	"border-0",
	"border-t",
	"border-solid",
	"border-gray-400",
	"border-opacity-50",
].join(" ");

Classes.sectionFirst = [].join(" ");

Classes.header = [
	"flex",
	"items-center",
	"text-lg",
	"font-semibold",
	"text-gray-600",
	"px-2",
	"mt-1",
	"mb-2",
].join(" ");

Classes.headerIcon = ["mr-2", "text-teal-400"].join(" ");

Classes.links = ["px-2"].join(" ");

Classes.navLink = [
	"block",
	"p-2",
	"rounded",
	"text-gray-500",
	"hover:bg-gray-200",
	"transition-all",
	"duration-100",
	"ease-in-out",
].join(" ");

Classes.navLinkDone = ["border-l-2", "border-teal-400"].join(" ");

Classes.navLinkNotDone = ["border-r-2", "border-red-500"].join(" ");

Classes.navLinkActive = ["text-teal-400"].join(" ");

Classes.username = ["pl-2"].join(" ");

export default Classes;
