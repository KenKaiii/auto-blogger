import config from "@payload-config";
import { NotFoundPage } from "@payloadcms/next/views";

import { importMap } from "../importMap";

const params = Promise.resolve({ segments: [] });
const searchParams = Promise.resolve({});

export default function NotFound() {
  return NotFoundPage({ config, importMap, params, searchParams });
}
