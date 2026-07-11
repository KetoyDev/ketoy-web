import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/kbc-opcodes.mdx';

export const metadata = {
  alternates: { canonical: '/docs/reference/kbc-opcodes' },
  title: 'KBC Opcodes',
  description: 'KBC is a register-based bytecode. The interpreter dispatches **112 opcodes** via a `while`/`when` loop. Each opcode is one byte; operands follow.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"KBC Opcodes"} lede={"KBC is a register-based bytecode. The interpreter dispatches **112 opcodes** via a `while`/`when` loop. Each opcode is one byte; operands follow."}>
      <Content />
    </DocPage>
  );
}
