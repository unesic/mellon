const Classes = {};

Classes.Container = ["max-w-sm", "mx-auto"].join(" ");

Classes.ContainerInner = ["w-full"].join(" ");

Classes.Form = [
	"w-full",
	"border",
	"border-solid",
	"border-gray-400",
	"rounded",
	"bg-gray-100",
	"px-3",
	"py-5",
].join(" ");

Classes.Fieldset = ["flex", "flex-col", "px-3", "mb-3"].join(" ");

Classes.Label = ["pl-1", "text-gray-700"].join(" ");

Classes.Input = [
	"rounded",
	"py-1",
	"px-2",
	"border",
	"border-solid",
	"border-gray-300",
	"focus",
].join(" ");

Classes.InputHasErrors = ["border-red-600"].join(" ");

Classes.ErrorMsg = ["mt-1", "pl-2", "text-orange-600"].join(" ");

Classes.Button = [
	"block",
	"rounded",
	"px-3",
	"py-2",
	"mx-auto",
	"mt-5",
	"bg-teal-500",
	"text-gray-200",
].join(" ");

Classes.AdditionalText = ["mt-4", "text-center", "text-gray-600"].join(" ");

Classes.AdditionalTextLink = [
	"text-teal-400",
	"font-semibold",
	"hover:text-teal-500",
].join(" ");

export default Classes;
