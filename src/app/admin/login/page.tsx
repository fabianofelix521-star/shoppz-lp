"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Credenciais inválidas");
      }
    } catch {
      setError("Erro de conexão");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-deep px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Shoppz.<span className="text-gold">DIGITAL</span>
          </h1>
          <p className="mt-2 text-sm text-white/40">Painel Administrativo</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gold/15 bg-white/[0.03] p-8 backdrop-blur-xl shadow-card"
        >
          <h2 className="mb-6 text-xl font-semibold text-white">Entrar</h2>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-white/70">
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Seu usuário"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-gold focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-white/70">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder-white/30 transition-colors focus:border-gold focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
