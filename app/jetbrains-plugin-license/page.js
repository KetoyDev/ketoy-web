import fs from 'node:fs';
import path from 'node:path';

export const metadata = {
  title: 'JetBrains Plugin License · Ketoy',
  description: 'End-user license agreement for the Ketoy JetBrains plugin.',
};

const LICENSE_PATH = path.join(process.cwd(), 'LICENSE-JETBRAINS-PLUGIN.txt');
const licenseText = fs.readFileSync(LICENSE_PATH, 'utf8');

export default function JetbrainsPluginLicensePage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>JetBrains Plugin License</h1>
          <p className="lede">
            End-user license agreement for the Ketoy JetBrains plugin.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <pre className="license-text">{licenseText}</pre>
        </div>
      </section>
    </>
  );
}
