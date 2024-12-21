import type { NextConfig } from "next";

import { withPlausibleProxy } from "next-plausible";

const nextConfig: NextConfig = {
	/* config options here */
};

module.exports = withPlausibleProxy()(nextConfig);
