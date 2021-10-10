import React from "react";
import PropTypes, { InferProps } from "prop-types";
import TextField from "@material-ui/core/TextField";

export default function CustomTextField(
	props: InferProps<typeof CustomTextField.propTypes>,
): JSX.Element {
	const { name, onChange, ...rest } = props;
	return <TextField name={name} onChange={onChange} {...rest} />;
}

CustomTextField.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
};
CustomTextField.defaultProps = {
	name: "",
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChange: () => {},
};
