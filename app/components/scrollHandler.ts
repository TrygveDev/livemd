import React, { RefObject } from "react";

export const handleScroll = (
	source: "editor" | "preview",
	event: React.UIEvent<HTMLTextAreaElement | HTMLDivElement>,
	syncScroll: boolean,
	isScrolling: RefObject<boolean>,
	editorRef: RefObject<HTMLTextAreaElement> | null,
	previewRef: RefObject<HTMLDivElement> | null
) => {
	if (!syncScroll || isScrolling.current || !editorRef || !previewRef) return;

	const target = event.target as HTMLElement;
	const percentage =
		target.scrollTop / (target.scrollHeight - target.clientHeight);

	isScrolling.current = true;

	if (source === "editor" && previewRef.current) {
		const previewElement = previewRef.current;
		previewElement.scrollTop =
			percentage *
			(previewElement.scrollHeight - previewElement.clientHeight);
	} else if (source === "preview" && editorRef.current) {
		const editorElement = editorRef.current;
		editorElement.scrollTop =
			percentage *
			(editorElement.scrollHeight - editorElement.clientHeight);
	}

	setTimeout(() => {
		isScrolling.current = false;
	}, 15);
};
