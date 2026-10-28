
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Pause, Play } from "lucide-react";
import { renderToString } from "react-dom/server";
import { Button } from "@/components/ui/button";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
  showControl?: boolean;
}

interface TargetRotation {
  x: number;
  y: number;
  startX: number;
  startY: number;
  distance: number;
  startTime: number;
  duration: number;
}

const subscribeToReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;

  return window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
};

const getReducedMotionServerSnapshot = () => false;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function createSpherePositions(count: number): Icon[] {
  const positions: Icon[] = [];
  const numberOfIcons = Math.max(count, 1);
  const offset = 2 / numberOfIcons;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < numberOfIcons; i++) {
    const y = i * offset - 1 + offset / 2;
    const radius = Math.sqrt(1 - y * y);
    const phi = i * increment;

    positions.push({
      x: Math.cos(phi) * radius * 100,
      y: y * 100,
      z: Math.sin(phi) * radius * 100,
      scale: 1,
      opacity: 1,
      id: i,
    });
  }

  return positions;
}

export function IconCloud({
  icons,
  images,
  showControl = true,
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);

  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 200, y: 200 });
  const targetRotationRef = useRef<TargetRotation | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 200, y: 200 });
  const [targetRotation, setTargetRotation] =
    useState<TargetRotation | null>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  // System preference and user control determine whether auto-rotation runs.
  const shouldPause = isPaused || prefersReducedMotion;

  const iconPositions = useMemo(() => {
    const itemCount = icons?.length ?? images?.length ?? 0;
    return createSpherePositions(itemCount || 20);
  }, [icons, images]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    targetRotationRef.current = targetRotation;
  }, [targetRotation]);

  // Prepare icon and image canvases.
  useEffect(() => {
    const items = icons ?? images ?? [];

    iconCanvasesRef.current = [];
    imagesLoadedRef.current = new Array(items.length).fill(false);

    if (items.length === 0) return;

    let cancelled = false;
    const objectUrls: string[] = [];

    const canvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 40;
      offscreen.height = 40;

      const context = offscreen.getContext("2d");
      if (!context) {
        imagesLoadedRef.current[index] = true;
        return offscreen;
      }

      const image = new Image();

      image.onload = () => {
        if (cancelled) return;

        context.clearRect(0, 0, 40, 40);

        if (images) {
          context.save();
          context.beginPath();
          context.arc(20, 20, 20, 0, Math.PI * 2);
          context.closePath();
          context.clip();
          context.drawImage(image, 0, 0, 40, 40);
          context.restore();
        } else {
          context.drawImage(image, 0, 0, 40, 40);
        }

        imagesLoadedRef.current[index] = true;
      };

      image.onerror = () => {
        imagesLoadedRef.current[index] = true;
      };

      if (images) {
        image.crossOrigin = "anonymous";
        image.src = item as string;
      } else {
        const svgString = renderToString(
          item as React.ReactElement,
        );

        const svgBlob = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8",
        });

        const objectUrl = URL.createObjectURL(svgBlob);
        objectUrls.push(objectUrl);

        image.onload = () => {
          if (cancelled) return;

          context.clearRect(0, 0, 40, 40);
          context.drawImage(image, 0, 0, 40, 40);
          imagesLoadedRef.current[index] = true;
          URL.revokeObjectURL(objectUrl);
        };

        image.onerror = () => {
          imagesLoadedRef.current[index] = true;
          URL.revokeObjectURL(objectUrl);
        };

        image.src = objectUrl;
      }

      return offscreen;
    });

    iconCanvasesRef.current = canvases;

    return () => {
      cancelled = true;
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [icons, images]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

      const rotationX = rotationRef.current.x;
      const rotationY = rotationRef.current.y;
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      for (const icon of iconPositions) {
        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const screenX = canvas.width / 2 + rotatedX;
        const screenY = canvas.height / 2 + rotatedY;
        const scale = (rotatedZ + 200) / 300;
        const radius = 20 * scale;

        const dx = x - screenX;
        const dy = y - screenY;

        if (dx * dx + dy * dy < radius * radius) {
          const targetX = -Math.atan2(
            icon.y,
            Math.sqrt(icon.x * icon.x + icon.z * icon.z),
          );

          const targetY = Math.atan2(icon.x, icon.z);
          const currentX = rotationRef.current.x;
          const currentY = rotationRef.current.y;

          const distance = Math.sqrt(
            (targetX - currentX) ** 2 +
              (targetY - currentY) ** 2,
          );

          const duration = Math.min(
            1400,
            Math.max(500, distance * 700),
          );

          const nextTarget: TargetRotation = {
            x: targetX,
            y: targetY,
            startX: currentX,
            startY: currentY,
            distance,
            startTime: performance.now(),
            duration,
          };

          targetRotationRef.current = nextTarget;
          setTargetRotation(nextTarget);
          break;
        }
      }

      isDraggingRef.current = true;
      setIsDragging(true);

      lastMousePosRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    },
    [iconPositions],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

      mousePosRef.current = { x, y };
      setMousePos({ x, y });

      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - lastMousePosRef.current.x;
      const deltaY = event.clientY - lastMousePosRef.current.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.0025,
        y: rotationRef.current.y + deltaX * 0.0025,
      };

      lastMousePosRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    },
    [],
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  // Draw and animate the icon cloud.
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    let frameId = 0;
    let lastFrameTime = 0;

    const render = (timestamp: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const currentMouse = mousePosRef.current;

      const dx = currentMouse.x - centerX;
      const dy = currentMouse.y - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(
        centerX * centerX + centerY * centerY,
      );

      // Increased rotation speed.
      const speed =
        0.012 +
        (distance / Math.max(maxDistance, 1)) * 0.025;

      const deltaTime =
        lastFrameTime === 0
          ? 1
          : Math.min((timestamp - lastFrameTime) / 16.67, 2);

      lastFrameTime = timestamp;

      const activeTarget = targetRotationRef.current;

      if (activeTarget) {
        const elapsed = performance.now() - activeTarget.startTime;
        const progress = Math.min(1, elapsed / activeTarget.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x:
            activeTarget.startX +
            (activeTarget.x - activeTarget.startX) * easedProgress,
          y:
            activeTarget.startY +
            (activeTarget.y - activeTarget.startY) * easedProgress,
        };

        if (progress >= 1) {
          targetRotationRef.current = null;
          setTargetRotation(null);
        }
      } else if (!isDraggingRef.current && !shouldPause) {
        rotationRef.current = {
          x:
            rotationRef.current.x +
            (dy / canvas.height) * speed * deltaTime,
          y:
            rotationRef.current.y +
            (dx / canvas.width) * speed * deltaTime,
        };
      }

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      iconPositions.forEach((icon, index) => {
        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const scale = Math.max(0.15, (rotatedZ + 200) / 300);
        const opacity = Math.max(
          0.2,
          Math.min(1, (rotatedZ + 150) / 200),
        );

        context.save();
        context.translate(centerX + rotatedX, centerY + rotatedY);
        context.scale(scale, scale);
        context.globalAlpha = opacity;

        if (icons || images) {
          const iconCanvas = iconCanvasesRef.current[index];

          if (iconCanvas && imagesLoadedRef.current[index]) {
            context.drawImage(iconCanvas, -20, -20, 40, 40);
          }
        } else {
          context.beginPath();
          context.arc(0, 0, 20, 0, Math.PI * 2);
          context.fillStyle = "#4444ff";
          context.fill();

          context.fillStyle = "#ffffff";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.font = "600 16px Inter, Arial, sans-serif";
          context.fillText(String(icon.id + 1), 0, 0);
        }

        context.restore();
      });

      const hasPendingAssets =
        Boolean(icons || images) &&
        !imagesLoadedRef.current.every(Boolean);

      // Stop scheduling frames when paused and nothing else needs animation.
      if (
        shouldPause &&
        !isDraggingRef.current &&
        !activeTarget &&
        !hasPendingAssets
      ) {
        animationFrameRef.current = null;
        return;
      }

      frameId = requestAnimationFrame(render);
      animationFrameRef.current = frameId;
    };

    frameId = requestAnimationFrame(render);
    animationFrameRef.current = frameId;

    return () => {
      cancelAnimationFrame(frameId);
      animationFrameRef.current = null;
    };
  }, [
    icons,
    images,
    iconPositions,
    shouldPause,
  ]);

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="max-w-full touch-pan-y rounded-lg"
        aria-label="Interactive 3D Icon Cloud"
        role="img"
      />

      {showControl && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPaused((previous) => !previous)}
          aria-label={shouldPause ? "Play Animation" : "Pause Animation"}
          title={shouldPause ? "Play animation" : "Pause animation"}
          className="absolute right-2 top-2"
        >
          {shouldPause ? <Play size={16} /> : <Pause size={16} />}
        </Button>
      )}
    </div>
  );
}
