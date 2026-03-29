import logo from "@/assets/logo.png";

export function Logo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Logo"
      className={className}
    />
  );
}