import { meta as ketoyCliMeta, default as KetoyCliBody } from '../content/platform/ketoy-cli.mdx';
import { meta as ketoy034Meta, default as Ketoy034Body } from '../content/platform/ketoy-0-3-4-alpha.mdx';
import { meta as customFontsMeta, default as CustomFontsBody } from '../content/sdk/custom-fonts.mdx';
import { meta as imageSupportMeta, default as ImageSupportBody } from '../content/sdk/image-support.mdx';

// JSX elements (not functions) so they can be passed from Server to Client Components.
export const updates = [
  { ...ketoyCliMeta, body: <KetoyCliBody /> },
  { ...ketoy034Meta, body: <Ketoy034Body /> },
  { ...customFontsMeta, body: <CustomFontsBody /> },
  { ...imageSupportMeta, body: <ImageSupportBody /> },
];

export function getUpdatesBySection(section) {
  return updates.filter((u) => u.section === section);
}

export function getUpdateById(id) {
  return updates.find((u) => u.id === id);
}
