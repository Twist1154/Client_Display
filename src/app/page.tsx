"use client";

import { useState, useEffect } from "react";
import RegistrationScreen from "@/components/hapo/RegistrationScreen";
import ContentScreen from "@/components/hapo/ContentScreen";
import EmergencyOverlay from "@/components/hapo/EmergencyOverlay";
import { useHapoSocket } from "@/hooks/use-hapo-socket";
import { HapoLogo } from "@/components/hapo/HapoLogo";
import { Loader2 } from "lucide-react";

const checkIsRegistered = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  return Promise.resolve(localStorage.getItem("hapo-token") === "true");
};

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [emergency, setEmergency] = useState<string | null>(null);

  const { messages } = useHapoSocket({ isRegistered });

  useEffect(() => {
    checkIsRegistered().then((registered) => {
      setIsRegistered(registered);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const emergencyMessage = messages.find((msg) => msg.type === "emergency");
    if (emergencyMessage && emergencyMessage.payload.content) {
      setEmergency(emergencyMessage.payload.content);
    }
  }, [messages]);

  const handleRegistrationSuccess = () => {
    localStorage.setItem("hapo-token", "true");
    setIsRegistered(true);
  };

  const handleClearEmergency = () => {
    setEmergency(null);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background gap-4">
        <HapoLogo className="w-20 h-20" />
        <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin" />
            <span className="text-xl font-bold">Initializing...</span>
        </div>
      </main>
    );
  }

  return (
    <>
      {isRegistered ? (
        <ContentScreen messages={messages} />
      ) : (
        <RegistrationScreen onRegistered={handleRegistrationSuccess} />
      )}
      {emergency && (
        <EmergencyOverlay
          message={emergency}
          onClose={handleClearEmergency}
        />
      )}
    </>
  );
}
