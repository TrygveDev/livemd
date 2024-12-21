import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const renderer = {
	code: (code: string, lang?: string) => (
		<SyntaxHighlighter
			key={code}
			language={lang || "text"}
			style={oneDark}
			customStyle={{
				margin: 0,
				borderRadius: "0.375rem",
			}}
		>
			{code}
		</SyntaxHighlighter>
	),
	codespan: (text: string) => {
		const cleanText = text.replace(/^`+|`+$/g, "");
		return (
			<code
				key={cleanText}
				className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm"
			>
				{cleanText}
			</code>
		);
	},
};
