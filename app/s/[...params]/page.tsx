import { Navbar } from "@/components/navbar";
import { SecretViewer } from "@/components/secret-viewer";

export default async function SecretPage({
  params,
}: {
  params: Promise<{ params: string[] }>;
}) {
  const { params: segments } = await params;

  // /s/:token/:id → one-click (key in URL)
  // /s/:id        → short link (need to ask for key)
  const hasToken = segments.length >= 2;
  const token = hasToken ? segments[0] : null;
  const id = hasToken ? segments[1] : segments[0];

  return (
    <div className="min-h-screen bg-gradient-animated">
      <Navbar />
      <SecretViewer id={id} token={token} />
    </div>
  );
}
