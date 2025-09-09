
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HapoLogo } from "@/components/hapo/HapoLogo";
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw } from "lucide-react";

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
  // In a real application, this would make a network request to a server.
  // For this demo, we are simulating a successful registration.
  // We don't resolve this promise automatically anymore to let it time out.
  return new Promise(resolve => {
    // The real socket connection will handle registration.
    // We'll leave this to time out.
  });
};

type RegistrationScreenProps = {
  onRegistered: () => void;
  onOpenMenu: () => void;
};

export default function RegistrationScreen({ onRegistered, onOpenMenu }: RegistrationScreenProps) {
  const [code, setCode] = useState<string>("");
  const [isPolling, setIsPolling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    startRegistrationProcess();
  }, []);
  
  const startRegistrationProcess = () => {
    setTimedOut(false);
    setProgress(0);
    const newCode = generateCode();
    setCode(newCode);
    setIsPolling(true);
  };

  useEffect(() => {
    let pollInterval: NodeJS.Timeout | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    if (isPolling && code) {
      const checkRegistration = async () => {
        try {
            const isRegistered = await pollForRegistration(code);
            if (isRegistered) {
                setIsPolling(false);
                if(pollInterval) clearInterval(pollInterval);
                if(timeoutId) clearTimeout(timeoutId);
                onRegistered();
            }
        } catch(e) {
            console.log("Polling timed out, which is expected in this demo.");
        }
      }
      checkRegistration(); // check once immediately
      pollInterval = setInterval(checkRegistration, 10000); // Poll every 10 seconds

      // Set a timeout for 5 minutes (300,000 milliseconds)
      timeoutId = setTimeout(() => {
        setIsPolling(false);
        setTimedOut(true);
        if(pollInterval) clearInterval(pollInterval);
      }, 300000);
    }
    
    return () => {
      if(pollInterval) clearInterval(pollInterval);
      if(timeoutId) clearTimeout(timeoutId);
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
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8 bg-background">
       <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={onOpenMenu}>
          <Settings className="h-6 w-6" />
          <span className="sr-only">Open Settings</span>
        </Button>
      </div>
      <Card className="w-full max-w-2xl text-center shadow-2xl bg-card border-2">
        <CardHeader>
          <div className="mx-auto mb-6">
            <HapoLogo className="h-16 w-16" />
          </div>
          <CardTitle className="text-4xl font-bold font-headline">Register This Screen</CardTitle>
          <CardDescription className="text-xl pt-2 text-muted-foreground">
             {timedOut ? "Registration timed out." : "Use the code below in your admin panel to pair this screen."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
            {timedOut ? (
                <div className="flex flex-col items-center gap-4 p-6">
                    <p className="text-lg text-destructive">The registration code has expired.</p>
                    <Button onClick={startRegistrationProcess}>
                        <RefreshCw className="mr-2" />
                        Generate New Code
                    </Button>
                </div>
            ) : (
                <>
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
                </>
            )}
        </CardContent>
      </Card>
    </main>
  );
}
