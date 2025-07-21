import { heroui } from "@heroui/react";

export default heroui({
	defaultTheme: "dark",
	themes: {
		light: {
			colors: {
				primary: "#F5A524",
				background: "hsl(210 40% 98%)",
				foreground: "hsl(222.2 84% 4.9%)",
			},
		},
		dark: {
			colors: {
				background: "hsl(222.2 84% 4.9%)",
				foreground: "hsl(210 40% 98%)",
			},
		},
	},
});
