import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => (
	<div className="flex justify-center items-center h-screen w-screen overflow-hidden">
		<Loader2 className="animate-spin" />
	</div>
);
