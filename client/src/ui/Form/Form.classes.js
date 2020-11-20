const Classes = {};

Classes.Container = ["max-w-md", "mx-auto"].join(" ");

Classes.ContainerInner = ["w-full"].join(" ");

Classes.Title = [
	"text-center",
	"font-semibold",
	"text-3xl",
	"mb-5",
	"pt-6",
].join(" ");

Classes.Form = [
	"flex",
	"flex-wrap",
	"w-full",
	"border",
	"border-solid",
	"border-gray-400",
	"rounded",
	"bg-gray-100",
	"px-3",
	"py-5",
].join(" ");

Classes.FormGeneralError = [
	"w-full",
	"border",
	"border-solid",
	"border-red-600",
	"rounded",
	"bg-gray-100",
	"px-3",
	"py-5",
].join(" ");

Classes.fieldsetGroup = ["flex"].join(" ");

Classes.Fieldset = ["flex", "flex-grow", "flex-col", "px-3", "mb-3"].join(" ");

Classes.Label = ["flex", "items-center", "pl-1", "text-gray-700"].join(" ");

Classes.CheckboxIcon = ["pr-2", "text-gray-400"].join(" ");

Classes.CheckboxIconChecked = ["text-teal-600"].join(" ");

Classes.Input = [
	"rounded",
	"py-1",
	"px-2",
	"bg-white",
	"border",
	"border-solid",
	"border-gray-300",
	"focus",
].join(" ");

Classes.InputHasErrors = ["border-red-600"].join(" ");

Classes.ErrorMsg = ["mt-1", "pl-2", "text-orange-600"].join(" ");

Classes.ErrorMsgGeneral = [
	"block",
	"mb-2",
	"text-base",
	"text-orange-600",
	"text-center",
].join(" ");

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

Classes.ButtonDisabled = [
	"block",
	"rounded",
	"px-3",
	"py-2",
	"mx-auto",
	"mt-5",
	"bg-gray-500",
	"text-gray-200",
	"cursor-not-allowed",
].join(" ");

Classes.AdditionalText = ["mt-4", "text-center", "text-gray-600"].join(" ");

Classes.AdditionalTextLink = [
	"text-teal-400",
	"font-semibold",
	"hover:text-teal-500",
].join(" ");

export default Classes;
