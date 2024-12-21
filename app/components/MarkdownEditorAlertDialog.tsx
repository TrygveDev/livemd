import { useState } from "react";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { resetEditor } from "./utils";

interface AlertDialogProps {
	setMarkdown: (value: string) => void;
	setSyncScroll: (value: boolean) => void;
	setPanelSize: (value: number) => void;
	setAutoSave: (value: boolean) => void;
}

export function MarkdownEditorAlertDialog({
	setMarkdown,
	setSyncScroll,
	setPanelSize,
	setAutoSave,
}: AlertDialogProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<AlertDialogTrigger asChild>
				<Button size={"sm"}>
					<RefreshCcw />
					Reset Editor
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Confirm Reset</AlertDialogTitle>
				<AlertDialogDescription>
					Are you sure you want to reset the editor? This action
					cannot be undone.
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button variant="ghost">Cancel</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							onClick={() =>
								resetEditor(
									setMarkdown,
									setSyncScroll,
									setPanelSize,
									setAutoSave
								)
							}
						>
							Confirm
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
