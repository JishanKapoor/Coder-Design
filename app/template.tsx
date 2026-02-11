// app/template.tsx — re-renders on every navigation for smooth page transitions
export default function Template({ children }: { children: React.ReactNode }) {
  // Keep route transitions stable (no translate animations).
  return <>{children}</>;
}
