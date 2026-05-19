import CodeWindow from '@/components/CodeWindow';
import { Chip, ChipRow } from '@/components/mdx/Chip';
import { InfoCard } from '@/components/mdx/InfoCard';

export function useMDXComponents(components) {
  return {
    CodeWindow,
    Chip,
    ChipRow,
    InfoCard,
    ...components,
  };
}
