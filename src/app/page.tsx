
"use client";

import { useState, useEffect } from "react";
import RegistrationScreen from "@/components/hapo/RegistrationScreen";
import ContentScreen from "@/components/hapo/ContentScreen";
import EmergencyOverlay from "@/components/hapo/EmergencyOverlay";
import { useRealHapoSocket } from "@/hooks/use-real-hapo-socket";
import { HapoLogo } from "@/components/hapo/HapoLogo";
import { Loader2 } from "lucide-react";
import SideMenu from "@/components/hapo/SideMenu";

const checkIsRegistered = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  return Promise.resolve(localStorage.getItem("hapo-token") === "true");
};

const getSocketUrl = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem("hapo-ws-url") || process.env.NEXT_PUBLIC_WEBSOCKET_URL || null;
}

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [emergency, setEmergency] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [socketUrl, setSocketUrl] = useState<string | null>(null);

  useEffect(() => {
    checkIsRegistered().then((registered) => {
      setIsRegistered(registered);
      setSocketUrl(getSocketUrl());
      setIsLoading(false);
    });
  }, []);

  const { messages } = useRealHapoSocket({ isRegistered, socketUrl });

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
  
  const handleReregister = () => {
    localStorage.removeItem("hapo-token");
    localStorage.removeItem("hapo-ws-url");
    setIsRegistered(false);
    setSocketUrl(null);
    setIsMenuOpen(false);
  };

  const handleClearEmergency = () => {
    setEmergency(null);
  };

  const handleUrlSave = (newUrl: string) => {
    localStorage.setItem("hapo-ws-url", newUrl);
    setSocketUrl(newUrl);
    setIsMenuOpen(false);
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
       <SideMenu 
        isOpen={isMenuOpen} 
        onOpenChange={setIsMenuOpen} 
        isRegistered={isRegistered}
        messages={messages}
        onReregister={handleReregister}
        socketUrl={socketUrl}
        onUrlSave={handleUrlSave}
      />
      {isRegistered ? (
        <ContentScreen messages={messages} onOpenMenu={() => setIsMenuOpen(true)} />
      ) : (
        <RegistrationScreen onRegistered={handleRegistrationSuccess} onOpenMenu={() => setIsMenuOpen(true)} />
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
