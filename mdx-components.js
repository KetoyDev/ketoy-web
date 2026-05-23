import CodeWindow from '@/components/CodeWindow';
import { Chip, ChipRow } from '@/components/mdx/Chip';
import { InfoCard } from '@/components/mdx/InfoCard';
import { H2, H3, H4 } from '@/components/mdx/Heading';
import { Pre } from '@/components/mdx/CodeBlock';
import { FaqItem, FaqList } from '@/components/mdx/FaqItem';
import Callout from '@/modules/features/components/Callout';

export function useMDXComponents(components) {
  return {
    CodeWindow,
    Chip,
    ChipRow,
    InfoCard,
    Callout,
    FaqItem,
    FaqList,
    h2: H2,
    h3: H3,
    h4: H4,
    pre: Pre,
    ...components,
  };
}
