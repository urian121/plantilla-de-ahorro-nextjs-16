import AhorroForm from "@/app/components/AhorroForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <AhorroForm />
      </div>
    </div>
  );
}