export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-center m-12">{children}</div>;
}
