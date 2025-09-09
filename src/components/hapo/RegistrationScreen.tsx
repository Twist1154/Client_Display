"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HapoLogo } from "@/components/hapo/HapoLogo";

const generateCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 20; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result.match(/.{1,5}/g)?.join("-") || "";
};

const pollForRegistration = async (code: string): Promise<boolean> => {
  console.log(`Polling for registration with code: ${code}`);
  return new Promise(resolve => {
    setTimeout(() => {
        // Forcing success for demo purposes after 5 seconds
        console.log("Registration successful!");
        resolve(true);
    }, 5000);
  });
};

type RegistrationScreenProps = {
  onRegistered: () => void;
};

export default function RegistrationScreen({ onRegistered }: RegistrationScreenProps) {
  const [code, setCode] = useState<string>("");
  const [isPolling, setIsPolling] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCode(generateCode());
    setIsPolling(true);
  }, []);

  useEffect(() => {
    let pollInterval: NodeJS.Timeout | undefined;
    if (isPolling && code) {
      const checkRegistration = async () => {
        const isRegistered = await pollForRegistration(code);
        if (isRegistered) {
          setIsPolling(false);
          if(pollInterval) clearInterval(pollInterval);
          onRegistered();
        }
      }
      checkRegistration(); // check once immediately
      pollInterval = setInterval(checkRegistration, 10000);
    }
    return () => {
      if(pollInterval) clearInterval(pollInterval)
    };
  }, [isPolling, code, onRegistered]);

  useEffect(() => {
    if(!isPolling) return;
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(timer);
  }, [isPolling]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <Card className="w-full max-w-2xl text-center shadow-2xl bg-card border-2">
        <CardHeader>
          <div className="mx-auto mb-6">
            <HapoLogo className="h-16 w-16" />
          </div>
          <CardTitle className="text-4xl font-bold font-headline">Register This Screen</CardTitle>
          <CardDescription className="text-xl pt-2 text-muted-foreground">
            Use the code below in your admin panel to pair this screen.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <div className="p-6 bg-muted rounded-lg w-full">
            <p
              className="text-5xl font-bold text-primary font-code tracking-widest"
              aria-label={`Registration code: ${code.split('').join(' ')}`}
            >
              {code || "Generating..."}
            </p>
          </div>
          <div className="w-full space-y-2">
            <p className="text-muted-foreground">Waiting for connection...</p>
            <Progress value={progress} className="w-full h-2" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
