import { Navbar } from "@/components/navbar";
import { SecretViewer } from "@/components/SecretViewer/secret-viewer";
import { revealSecret } from "./actions";

export default async function SecretPage({
  params,
}: {
  params: Promise<{ params: string[] }>;
}) {
  const { params: segments } = await params;
  console.log("[SecretPage] segments:", segments, "length:", segments.length);

  const invalidUrl = segments.length < 2 || segments.length > 3;

  if (invalidUrl) {
    console.log("[SecretPage] invalid URL, segments:", segments.length);
    return <div>Invalid URL</div>;
  }

  const id = segments[0];
  const iv = segments[1];
  const cryptoKey = segments.length == 3 ? segments[2] : null;
  console.log("[SecretPage] id:", id, "iv:", iv, "cryptoKey:", cryptoKey);

  return (
    <div className="min-h-screen bg-gradient-animated">
      <Navbar />
      <SecretViewer id={id} iv={iv} cryptoKey={cryptoKey} onReveal={revealSecret} />
    </div>
  );
}
