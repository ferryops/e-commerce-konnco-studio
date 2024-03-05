export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <section>
        <form className="flex flex-col gap-4 border p-4" action="#">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" id="email" placeholder="akun@gmail.com" className="p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className="p-2 border" />
          </div>
          <button type="submit" className="p-1 bg-gray-100 text-sm">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
