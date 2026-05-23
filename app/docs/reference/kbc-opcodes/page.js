import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/kbc-opcodes.mdx';

export const metadata = {
  title: 'KBC Opcodes · Ketoy Docs',
  description: 'KBC is a register-based bytecode. The interpreter dispatches **112 opcodes** via a `while`/`when` loop. Each opcode is one byte; operands follow.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"KBC Opcodes"} lede={"KBC is a register-based bytecode. The interpreter dispatches **112 opcodes** via a `while`/`when` loop. Each opcode is one byte; operands follow."}>
      <Content />
    </DocPage>
  );
}
