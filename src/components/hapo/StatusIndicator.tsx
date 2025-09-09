import { cn } from "@/lib/utils";

export type Status = 'online' | 'offline' | 'maintenance';

type StatusIndicatorProps = {
  status: Status;
  className?: string;
};

const statusConfig: Record<Status, { color: string; text: string }> = {
  online: { color: 'bg-[#32CD32]', text: 'Online' },
  offline: { color: 'bg-[#FF4500]', text: 'Offline' },
  maintenance: { color: 'bg-[#FFD700]', text: 'Maintenance' },
};

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  const config = statusConfig[status] || statusConfig.offline;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("h-3 w-3 rounded-full", config.color, status === 'online' && 'animate-pulse')} />
      <span className="font-semibold text-sm uppercase tracking-wider">{config.text}</span>
    </div>
  );
}
