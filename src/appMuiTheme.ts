import { createMuiTheme } from '@material-ui/core';
import { orange, teal } from '@material-ui/core/colors';

export const appMuiTheme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: orange,
		type: 'dark',
	},
	props: {
		MuiTextField: {
			fullWidth: true,
			variant: 'outlined',
			size: 'small',
		},
	},
});
