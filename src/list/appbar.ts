import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import PluginsIcon from "@material-ui/icons/Extension";
import SmartContractsIcon from "@material-ui/icons/Code";

const AppBarList = {
	top: [
		{
			name: "dashboard",
			title: "Dashboard",
			icon: DashboardIcon,
		},
		{
			name: "smart-contracts",
			title: "Smart Contracts",
			icon: SmartContractsIcon,
		},
		{
			name: "plugins",
			title: "Plugins",
			icon: PluginsIcon,
		},
	],
	bottom: [
		{
			name: "settings",
			title: "Settings",
			icon: SettingsIcon,
		},
	],
};

export default AppBarList;
