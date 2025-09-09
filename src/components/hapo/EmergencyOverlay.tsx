"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { summarizeEmergencyMessage } from "@/ai/flows/emergency-message-summarization";
import { Button } from "@/components/ui/button";

type EmergencyOverlayProps = {
  message: string;
  onClose: () => void;
};

export default function EmergencyOverlay({ message, onClose }: EmergencyOverlayProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSummary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Assuming a screen ID and broadcast group for the demo
        const result = await summarizeEmergencyMessage({
          message,
          screenId: "D-102A",
          broadcastGroup: "Lobby Screens",
        });
        setSummary(result.summary);
      } catch (e) {
        console.error("Failed to summarize emergency message:", e);
        setError("Could not process emergency alert. Displaying full message.");
        setSummary(message); // Fallback to full message
      } finally {
        setIsLoading(false);
      }
    };

    getSummary();
  }, [message]);

  return (
    <div style={{backgroundColor: '#FF0000', color: '#FFFFFF'}} className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-95 animate-in fade-in-0">
      <div className="w-full max-w-4xl p-8 text-center">
        <div className="flex justify-center items-center gap-4 mb-8">
            <AlertTriangle className="h-20 w-20 animate-pulse" />
            <h1 className="text-7xl font-bold font-headline uppercase tracking-wider">
            Emergency
            </h1>
        </div>
        
        <div className="bg-white/10 p-8 rounded-lg min-h-[200px] flex items-center justify-center">
            {isLoading ? (
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin" />
                    <p className="text-xl">Processing Alert...</p>
                </div>
            ) : (
                <p className="text-4xl font-medium leading-tight">
                    {summary}
                </p>
            )}
        </div>

        {error && <p className="mt-4 text-yellow-300">{error}</p>}
        
        <Button onClick={onClose} variant="outline" className="mt-8 bg-transparent text-white border-white hover:bg-white focus:ring-white" style={{color: 'white', borderColor: 'white'}}>
            Acknowledge & Close
        </Button>
      </div>
    </div>
  );
}
