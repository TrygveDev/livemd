import { Button } from "@/components/ui/button";
import { Copy, Download, HelpCircle, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { MarkdownEditorAlertDialog } from "./MarkdownEditorAlertDialog";
import { copyMarkdown, downloadMarkdown } from "./utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface HeaderProps {
	markdown: string;
	syncScroll: boolean;
	setSyncScroll: (value: boolean) => void;
	setMarkdown: (value: string) => void;
	setPanelSize: (value: number) => void;
	autoSave: boolean;
	setAutoSave: (value: boolean) => void;
}

export function MarkdownEditorHeader({
	markdown,
	syncScroll,
	setSyncScroll,
	setMarkdown,
	setPanelSize,
	autoSave,
	setAutoSave,
}: HeaderProps) {
	return (
		<div className="flex items-center gap-4 justify-between">
			<div className="flex items-center gap-4">
				<Button size={"sm"} onClick={() => downloadMarkdown(markdown)}>
					<Download />
					Download MD
				</Button>
				<Button size={"sm"} onClick={() => copyMarkdown(markdown)}>
					<Copy />
					Copy MD
				</Button>
			</div>

			<div className="flex items-center gap-4">
				<Link href="https://www.markdownguide.org/" target="_blank">
					<Button size={"sm"}>
						<HelpCircle />
						Markdown Guide
					</Button>
				</Link>
				<Popover>
					<PopoverTrigger asChild>
						<Button size={"sm"}>
							<Settings />
							Settings
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-48 p-4 space-y-3">
						<TooltipProvider delayDuration={0}>
							<div className="flex items-center gap-2">
								<Checkbox
									id="sync-scroll"
									checked={syncScroll}
									onCheckedChange={(checked) =>
										setSyncScroll(checked as boolean)
									}
								/>
								<label
									htmlFor="sync-scroll"
									className="text-sm font-medium leading-none"
								>
									Sync scrolling{" "}
								</label>
								<Tooltip>
									<TooltipTrigger>
										<HelpCircle className="w-4 h-4" />
									</TooltipTrigger>
									<TooltipContent>
										Sync scrolling between the editor and
										the preview
									</TooltipContent>
								</Tooltip>
							</div>
							<div className="flex items-center gap-2">
								<Checkbox
									id="auto-save"
									checked={autoSave}
									onCheckedChange={(checked) =>
										setAutoSave(checked as boolean)
									}
								/>
								<label
									htmlFor="auto-save"
									className="text-sm font-medium leading-none"
								>
									Auto-save
								</label>
								<Tooltip>
									<TooltipTrigger>
										<HelpCircle className="w-4 h-4" />
									</TooltipTrigger>
									<TooltipContent>
										Auto-save the markdown to local storage
									</TooltipContent>
								</Tooltip>
							</div>
						</TooltipProvider>
					</PopoverContent>
				</Popover>

				<MarkdownEditorAlertDialog
					setMarkdown={setMarkdown}
					setSyncScroll={setSyncScroll}
					setPanelSize={setPanelSize}
					setAutoSave={setAutoSave}
				/>
			</div>
		</div>
	);
}
