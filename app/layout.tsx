import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
	title: {
		default: "Live Markdown Editor",
		template: "%s - Live Markdown Editor",
	},
	description: "A powerful markdown editor with live preview capabilities.",
	keywords:
		"markdown editor, live preview, text editor, markdown, writing tool",
	authors: [
		{
			name: "TrygveDev",
			url: "https://trygve.dev",
		},
	],
	creator: "TrygveDev",
	publisher: "TrygveDev",
	category: "Text Editor",
	openGraph: {
		title: "Live Markdown Editor",
		description:
			"A powerful markdown editor with live preview capabilities.",
		url: "https://livemd.trygve.dev",
		siteName: "Live Markdown Editor",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "https://livemd.trygve.dev/og-image.png",
				width: 1200,
				height: 630,
				alt: "Live Markdown Editor",
				type: "image/png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Live Markdown Editor",
		description:
			"A powerful markdown editor with live preview capabilities.",
		creator: "@TrygveDev",
		site: "@TrygveDev",
		images: {
			url: "https://livemd.trygve.dev/og-image.png",
			alt: "Live Markdown Editor",
		},
	},
	alternates: {
		canonical: "https://livemd.trygve.dev",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	manifest: "/site.webmanifest",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/logo/logo.png", type: "image/png" },
		],
		apple: [{ url: "/apple-touch-icon.png" }],
	},
	other: {
		"msapplication-TileColor": "#ffffff",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<PlausibleProvider domain="livemd.trygve.dev">
					{children}
					<Toaster closeButton richColors />
				</PlausibleProvider>
			</body>
		</html>
	);
}
