import { Navbar } from "@/components/navbar";
import { EncryptForm } from "@/components/encrypt-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-animated">
      <Navbar />
      <EncryptForm />
    </div>
  );
}
