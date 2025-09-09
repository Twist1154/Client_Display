
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { StatusIndicator, type Status } from "@/components/hapo/StatusIndicator";
import { HapoLogo } from "./HapoLogo";
import { Wifi, WifiOff, Monitor, Settings } from "lucide-react";
import { Button } from "../ui/button";

type Message = {
  type: 'content' | 'status' | 'emergency';
  payload: any;
};

type ContentItem = {
  type: 'image' | 'video';
  url: string;
  duration: number;
  'data-ai-hint'?: string;
};

type ContentScreenProps = {
  messages: Message[];
  onOpenMenu: () => void;
};

export default function ContentScreen({ messages, onOpenMenu }: ContentScreenProps) {
  const [playlist, setPlaylist] = useState<ContentItem[]>([]);
  const [status, setStatus] = useState<Status>('online');
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  useEffect(() => {
    const contentMessage = messages.find(m => m.type === 'content');
    if (contentMessage?.payload?.playlist) {
      setPlaylist(contentMessage.payload.playlist);
    }

    const statusMessage = messages.slice().reverse().find(m => m.type === 'status');
    if (statusMessage?.payload?.status) {
      setStatus(statusMessage.payload.status as Status);
    }
  }, [messages]);
  
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect) };
  }, [api]);

  const currentItem = playlist[currentSlide];

  useEffect(() => {
    if (!api || !currentItem) return;

    if (currentItem.type === 'video') {
      autoplayPlugin.current.stop();
    } else {
      (autoplayPlugin.current.options as any).delay = currentItem.duration;
      autoplayPlugin.current.reset();
    }
  }, [api, currentItem, currentSlide]);


  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[autoplayPlugin.current]}
        className="h-full w-full"
      >
        <CarouselContent>
          {playlist.length > 0 ? (
            playlist.map((item, index) => (
              <CarouselItem key={index}>
                {item.type === "image" && item.url && (
                  <Image
                    src={item.url}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    data-ai-hint={item['data-ai-hint']}
                  />
                )}
                {item.type === "video" && item.url && (
                  <video
                    key={item.url} // Add key to re-mount video on src change
                    src={item.url}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    onEnded={() => api?.scrollNext()}
                  />
                )}
              </CarouselItem>
            ))
          ) : (
             <CarouselItem className="flex h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4 text-center">
                    <HapoLogo className="h-24 w-24"/>
                    <h1 className="text-3xl font-bold font-headline">Hapo Display</h1>
                    <p className="text-muted-foreground">Waiting for content...</p>
                </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      
      <footer className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <HapoLogo className="h-8 w-8" />
                <p className="text-xl font-bold font-headline">Hapo Display</p>
            </div>
            <div className="flex items-center gap-6">
                <button onClick={onOpenMenu} className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-white/10 transition-colors">
                  <StatusIndicator status={status} />
                  <div className="flex items-center gap-2">
                      {status !== 'offline' ? <Wifi size={20} /> : <WifiOff size={20} />}
                      <span className="text-sm font-medium">{status === 'offline' ? 'Offline' : 'Connected'}</span>
                  </div>
                </button>
                <div className="flex items-center gap-2">
                    <Monitor size={20} /> 
                    <span className="text-sm font-medium">Screen ID: D-102A</span>
                </div>
                <Button variant="ghost" size="icon" onClick={onOpenMenu} className="text-white hover:bg-white/10 hover:text-white">
                  <Settings />
                </Button>
            </div>
        </div>
      </footer>
    </div>
  );
}
