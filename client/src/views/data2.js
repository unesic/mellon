function getRandomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export default [
	{
		day: "Monday",
		data: [
			{
				type: "First type",
				typeId: "type-id-1",
				subtype: "Subtype 1",
				subtypeId: "subtype-id-1",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "First type",
				typeId: "type-id-1",
				subtype: "Subtype 2",
				subtypeId: "subtype-id-2",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "First type",
				typeId: "type-id-1",
				subtype: "Subtype 3",
				subtypeId: "subtype-id-3",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Second type",
				typeId: "type-id-2",
				subtype: "Subtype 4",
				subtypeId: "subtype-id-4",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Second type",
				typeId: "type-id-2",
				subtype: "Subtype 5",
				subtypeId: "subtype-id-5",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Second type",
				typeId: "type-id-2",
				subtype: "Subtype 6",
				subtypeId: "subtype-id-6",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Third type",
				typeId: "type-id-3",
				subtype: "Subtype 7",
				subtypeId: "subtype-id-7",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Third type",
				typeId: "type-id-3",
				subtype: "Subtype 8",
				subtypeId: "subtype-id-8",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Third type",
				typeId: "type-id-3",
				subtype: "Subtype 9",
				subtypeId: "subtype-id-9",
				color: getRandomColor(),
				value: Math.random(),
			},
		],
	},
	{
		day: "Tuesday",
		data: [
			{
				type: "First type",
				typeId: "type-id-1",
				subtype: "Subtype 1",
				subtypeId: "subtype-id-1",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "First type",
				typeId: "type-id-1",
				subtype: "Subtype 2",
				subtypeId: "subtype-id-2",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "First type",
				typeId: "type-id-1",
				subtype: "Subtype 3",
				subtypeId: "subtype-id-3",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Second type",
				typeId: "type-id-2",
				subtype: "Subtype 4",
				subtypeId: "subtype-id-4",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Second type",
				typeId: "type-id-2",
				subtype: "Subtype 5",
				subtypeId: "subtype-id-5",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Second type",
				typeId: "type-id-2",
				subtype: "Subtype 6",
				subtypeId: "subtype-id-6",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Third type",
				typeId: "type-id-3",
				subtype: "Subtype 7",
				subtypeId: "subtype-id-7",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Third type",
				typeId: "type-id-3",
				subtype: "Subtype 8",
				subtypeId: "subtype-id-8",
				color: getRandomColor(),
				value: Math.random(),
			},
			{
				type: "Third type",
				typeId: "type-id-3",
				subtype: "Subtype 9",
				subtypeId: "subtype-id-9",
				color: getRandomColor(),
				value: Math.random(),
			},
		],
	},
];
