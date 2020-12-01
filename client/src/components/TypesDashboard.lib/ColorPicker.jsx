import React from "react";
import { ChromePicker } from "react-color";
import useVisible from "lib/hooks/useVisible";

import { Input } from "ui/Form";

const ColorPicker = React.memo(({ name, value, onChange }) => {
	const { ref, isVisible, setIsVisible } = useVisible(false);

	const onPickerChange = ({ r, g, b, a }) => {
		const base = {
			r: r.toString(16),
			g: g.toString(16),
			b: b.toString(16),
			a: a < 1 ? Math.round(a * 255).toString(16) : "",
		};

		const final = {
			r: (base.r.length < 2 ? "0" : "") + base.r,
			g: (base.g.length < 2 ? "0" : "") + base.g,
			b: (base.b.length < 2 ? "0" : "") + base.b,
			a: base.a,
		};

		const newColor = `#${final.r}${final.g}${final.b}${final.a}`.toUpperCase();

		onChange(newColor);
	};

	return (
		<div className="relative" ref={ref} onClick={() => setIsVisible(true)}>
			<Input
				type="text"
				name={name}
				onChange={(e) => onChange(e.target.value)}
				value={value}
				placeholder="#4fd1c5"
				withLabel={false}
				styles="DailyTracking__TextInput WithTransition ExtraWide"
				style={{ backgroundColor: value ? value : "" }}
			/>
			{isVisible ? (
				<ChromePicker
					color={value}
					onChangeComplete={(c) => onPickerChange(c.rgb)}
					className="absolute transform translate-x-2 translate-y-2"
				/>
			) : null}
		</div>
	);
});

export default ColorPicker;
