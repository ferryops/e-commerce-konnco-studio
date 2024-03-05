import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const userString = localStorage.getItem("user");
  const user = userString ? (JSON.parse(userString) as { username: string }) : null;
  return (
    <div className="border w-full flex justify-end gap-2 p-2 items-center border-b-0">
      <p className="text-xs">{user ? user.username : "Belum Login"}</p>
      {user ? (
        <button
          className="text-xs p-2 border"
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/");
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className="text-xs p-2 border"
          onClick={() => {
            router.push("/");
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}
