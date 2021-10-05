import React from "react";
import PropTypes, { InferProps } from "prop-types";
import TextField from "@material-ui/core/TextField";

export default function CustomTextField(
	// eslint-disable-next-line
	props: InferProps<typeof CustomTextField.propTypes>,
): JSX.Element {
	// const { variant, placeholder, type, value, name, onChange, ...rest } = props;
	return (
		<TextField
		// variant={variant}
		// placeholder={placeholder}
		// type={type}
		// value={value}
		// name={name}
		// onChange={onChange}
		// {...rest}
		/>
	);
}

CustomTextField.propTypes = {
	variant: PropTypes.oneOf(["outlined", "filled", "standard"]).isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.any,
	name: PropTypes.string,
	onChange: PropTypes.func,
};
CustomTextField.defaultProps = {
	type: "text",
};
