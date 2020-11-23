module.exports = {
	extends: ["stylelint-config-standard"],
	rules: {
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: [
					"tailwind",
					"apply",
					"variants",
					"responsive",
					"screen",
				],
			},
		],
		"declaration-block-trailing-semicolon": null,
		"no-descending-specificity": null,
		indentation: "tab",
		"at-rule-empty-line-before": [
			"always",
			{
				except: "after-same-name",
				ignoreAtRules: ["import", "apply"],
			},
		],
	},
};
