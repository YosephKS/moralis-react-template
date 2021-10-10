import React from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PropTypes, { InferProps } from "prop-types";

export default function SubmenuArrow(
	props: InferProps<typeof SubmenuArrow.propTypes>,
): JSX.Element {
	const { open } = props;
	return open ? <ExpandLess /> : <ExpandMore />;
}

SubmenuArrow.propTypes = {
	open: PropTypes.bool,
};

SubmenuArrow.defaultProps = {
	open: false,
};
