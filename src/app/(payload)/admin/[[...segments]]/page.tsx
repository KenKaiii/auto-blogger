import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import type { Metadata } from "next";

import { importMap } from "../importMap";

type AdminPageProps = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: AdminPageProps): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

export default function AdminPage({ params, searchParams }: AdminPageProps) {
  return RootPage({ config, params, searchParams, importMap });
}
