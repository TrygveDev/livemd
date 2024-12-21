"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import Markdown from "marked-react";
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "@/components/ui/resizable";
import { MarkdownEditorHeader } from "./MarkdownEditorHeader";
import { renderer } from "./renderer";
import { handleScroll } from "./scrollHandler";
import { LoadingSpinner } from "./LoadingSpinner";

export function MarkdownEditor() {
	const [markdown, setMarkdown] = useState<string>(
		"# Live Markdown Editor\n\n## Made by [Trygve](https://www.trygve.dev/)\n\n### Happy markdown editing!🎉"
	);
	const [syncScroll, setSyncScroll] = useState(false);
	const [loading, setLoading] = useState(true);
	const [panelSize, setPanelSize] = useState<number>(50);
	const [autoSave, setAutoSave] = useState(true);

	const editorRef = useRef<HTMLTextAreaElement | null>(null);
	const previewRef = useRef<HTMLDivElement | null>(null);
	const isScrolling = useRef(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedMarkdown = localStorage.getItem("markdown");
			if (storedMarkdown) {
				setMarkdown(storedMarkdown);
			}
			const storedSyncScroll = localStorage.getItem("syncScroll");
			if (storedSyncScroll) {
				setSyncScroll(JSON.parse(storedSyncScroll));
			}
			const storedAutoSave = localStorage.getItem("autoSave");
			if (storedAutoSave) {
				setAutoSave(JSON.parse(storedAutoSave));
			}
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (!autoSave) return;
		localStorage.setItem("markdown", markdown);
	}, [markdown, autoSave]);

	useEffect(() => {
		if (!autoSave) return;
		localStorage.setItem("syncScroll", JSON.stringify(syncScroll));
	}, [syncScroll, autoSave]);

	useEffect(() => {
		localStorage.setItem("autoSave", JSON.stringify(autoSave));
	}, [autoSave]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="h-[calc(100vh-2rem)] m-4 flex flex-col gap-2">
			<MarkdownEditorHeader
				markdown={markdown}
				syncScroll={syncScroll}
				setSyncScroll={setSyncScroll}
				setMarkdown={setMarkdown}
				setPanelSize={setPanelSize}
				autoSave={autoSave}
				setAutoSave={setAutoSave}
			/>
			<ResizablePanelGroup
				direction="horizontal"
				className="rounded-lg border"
			>
				<ResizablePanel
					defaultSize={panelSize}
					onResize={(size) => setPanelSize(size)}
				>
					<Textarea
						ref={editorRef}
						className="h-full resize-none p-4 border-0 focus-visible:ring-0 overflow-auto"
						placeholder="Type your markdown here..."
						value={markdown}
						onChange={(e) => setMarkdown(e.target.value)}
						onScroll={(e) =>
							handleScroll(
								"editor",
								e,
								syncScroll,
								isScrolling,
								editorRef as React.RefObject<HTMLTextAreaElement>,
								previewRef as React.RefObject<HTMLDivElement>
							)
						}
					/>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={100 - panelSize}>
					<div
						ref={previewRef}
						className="h-full bg-card p-4 overflow-auto prose prose-slate dark:prose-invert max-w-none prose-headings:font-normal prose-p:text-base"
						onScroll={(e) =>
							handleScroll(
								"preview",
								e,
								syncScroll,
								isScrolling,
								editorRef as React.RefObject<HTMLTextAreaElement>,
								previewRef as React.RefObject<HTMLDivElement>
							)
						}
					>
						<Markdown gfm openLinksInNewTab renderer={renderer}>
							{markdown}
						</Markdown>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
