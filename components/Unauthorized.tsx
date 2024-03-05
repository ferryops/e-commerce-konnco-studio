import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();
  return (
    <div className="text-center">
      <h1 className="text-xl font-bold ">Hanya admin yang dapat mengakses halaman ini! 🫨</h1>
      <button onClick={() => router.push("/")} className="text-xs border p-1">
        Home
      </button>
    </div>
  );
}
