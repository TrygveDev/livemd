import { toast } from "sonner";

export const downloadMarkdown = (markdown: string) => {
	const blob = new Blob([markdown], { type: "text/markdown" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "document.md";
	a.click();
	URL.revokeObjectURL(url);
	toast.success("Markdown downloaded!");
};

export const copyMarkdown = (markdown: string) => {
	navigator.clipboard.writeText(markdown).then(
		() => toast.success("Markdown copied to clipboard!"),
		(err) => toast.error("Failed to copy markdown: " + err)
	);
};

export const resetEditor = (
	setMarkdown: (value: string) => void,
	setSyncScroll: (value: boolean) => void,
	setPanelSize: (value: number) => void,
	setAutoSave: (value: boolean) => void
) => {
	setMarkdown(
		"# Live Markdown Editor\n\n## Made by [Trygve](https://www.trygve.dev/)\n\n### Happy markdown editing!🎉"
	);
	setSyncScroll(false);
	setPanelSize(50);
	setAutoSave(true);
	localStorage.removeItem("markdown");
	localStorage.removeItem("syncScroll");
	localStorage.removeItem("panelSize");
	localStorage.removeItem("autoSave");
	toast.success("Editor reset!");
};
