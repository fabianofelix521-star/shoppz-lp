"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      const { data: adminUser } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!adminUser) {
        router.push("/admin/login");
        return;
      }

      setChecking(false);
    };

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-deep">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-deep">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col lg:ml-[280px]">
        <AdminHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
