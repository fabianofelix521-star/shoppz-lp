interface AdminCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function AdminCard({
  title,
  description,
  children,
}: AdminCardProps) {
  return (
    <div className="rounded-2xl border border-gold/15 bg-white/[0.03] p-6 backdrop-blur-xl shadow-card">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-white/50">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
