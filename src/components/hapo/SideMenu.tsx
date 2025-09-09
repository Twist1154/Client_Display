
"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Status, StatusIndicator } from "./StatusIndicator";
import { HapoLogo } from "./HapoLogo";
import { Wifi, Monitor, Power, AlertTriangle, ListVideo, Clock, Server } from "lucide-react";

type Message = {
  type: 'content' | 'status' | 'emergency';
  payload: any;
  timestamp: number;
};

type ContentItem = {
  type: 'image' | 'video';
  url: string;
  duration: number;
};

type SideMenuProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isRegistered: boolean;
  messages: Message[];
  onReregister: () => void;
  socketUrl: string | null;
  onUrlSave: (url: string) => void;
};

export default function SideMenu({ isOpen, onOpenChange, isRegistered, messages, onReregister, socketUrl, onUrlSave }: SideMenuProps) {

  const [url, setUrl] = useState(socketUrl || "");

  useEffect(() => {
    setUrl(socketUrl || "");
  }, [socketUrl, isOpen]);

  const handleSave = () => {
    onUrlSave(url);
  };

  const statusMessage = messages.slice().reverse().find(m => m.type === 'status');
  const status: Status = statusMessage?.payload?.status as Status || 'offline';
  const contentMessage = messages.find(m => m.type === 'content');
  const playlist: ContentItem[] = contentMessage?.payload?.playlist || [];
  const emergencyMessage = messages.find(m => m.type === 'emergency');

  const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | React.ReactNode }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <span className="font-mono text-sm text-foreground break-all text-right">{value}</span>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-background text-foreground flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-3">
            <HapoLogo className="h-7 w-7" />
            <span className="text-2xl font-bold">Device Status</span>
          </SheetTitle>
          <SheetDescription>
            Detailed information and settings for this display.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-6 py-6">
            {!isRegistered && (
                 <div className="space-y-4 px-6">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Server size={20} /> Server Configuration</h3>
                    <div className="space-y-3 rounded-lg border p-4">
                        <Label htmlFor="ws-url">WebSocket URL</Label>
                        <Input id="ws-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="wss://your-server.com" />
                        <Button onClick={handleSave} className="w-full">Save URL</Button>
                    </div>
                    <p className="text-xs text-muted-foreground px-1">
                        Configure the server address for this display to connect to. This is required for registration.
                    </p>
                </div>
            )}
            
            <div className="space-y-4 px-6">
                 <h3 className="font-semibold text-lg">System Information</h3>
                <div className="space-y-3 rounded-lg border p-4">
                    <InfoRow icon={<Monitor size={18} />} label="Screen ID" value="D-102A" />
                    <InfoRow icon={<Wifi size={18} />} label="Connection" value={<StatusIndicator status={status} />} />
                    {isRegistered && socketUrl && <InfoRow icon={<Server size={18} />} label="Server URL" value={socketUrl} />}
                    {isRegistered && <InfoRow icon={<Clock size={18} />} label="Uptime" value="4h 12m" />}
                </div>
            </div>
            
            {isRegistered && (
                 <div className="space-y-4 px-6">
                    <h3 className="font-semibold text-lg">Content</h3>
                    <div className="space-y-3 rounded-lg border p-4">
                        <InfoRow icon={<ListVideo size={18} />} label="Playlist Items" value={playlist.length} />
                        {emergencyMessage && (
                            <InfoRow 
                                icon={<AlertTriangle size={18} className="text-destructive" />} 
                                label="Emergency Alert" 
                                value={<span className="font-bold text-destructive">ACTIVE</span>} 
                            />
                        )}
                    </div>
                </div>
            )}

            {!isRegistered && (
                 <div className="space-y-4 px-6">
                     <h3 className="font-semibold text-lg">Registration</h3>
                    <p className="text-sm text-muted-foreground">
                        This screen is not yet registered. Please use the code on the main screen to register this device in your admin panel.
                    </p>
                </div>
            )}
        </div>

        <SheetFooter className="border-t pt-6 px-6">
            <div className="flex w-full justify-between items-center">
                <span className="text-xs text-muted-foreground">Hapo Display v1.0.0</span>
                <Button variant="destructive" onClick={onReregister}>
                    <Power className="mr-2 h-4 w-4" /> Clear & Re-register
                </Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
