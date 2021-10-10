import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import PluginsIcon from "@material-ui/icons/Extension";
import SmartContractsIcon from "@material-ui/icons/Code";

const AppBarList = {
	top: [
		{
			name: "dashboard",
			link: "dashboard",
			title: "Dashboard",
			icon: DashboardIcon,
		},
		{
			name: "smartContracts",
			link: "smart-contracts",
			title: "Smart Contracts",
			icon: SmartContractsIcon,
			submenu: [
				{
					name: "simpleStorage",
					link: "simple-storage",
					title: "Simple Storage",
					icon: SmartContractsIcon,
				},
			],
		},
		{
			name: "plugins",
			link: "plugins",
			title: "Plugins",
			icon: PluginsIcon,
		},
	],
	bottom: [
		{
			name: "settings",
			link: "settings",
			title: "Settings",
			icon: SettingsIcon,
		},
	],
};

export default AppBarList;
