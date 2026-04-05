"use client";

import { useEffect, useRef, useState } from "react";
import ghanaBoundary from "@/data/ghana-country.geo.json";

const SECTION_BG = "#173626";
const GHANA_FOREST = "#1a4a2e";
const ACTIVE_REGION_GREEN = "#2f6b53";
const GOLD = "#e8b84b";
const NIGHT_EARTH_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-night.jpg";

type Marker = {
  name: string;
  lat: number;
  lng: number;
  kind: "hq" | "served";
  altitude: number;
  size: number;
};

type RouteArc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  altitude: number;
  name: string;
};

const kumasiMarker: Marker = {
  name: "Kumasi — Our HQ",
  lat: 6.6885,
  lng: -1.6233,
  kind: "hq",
  altitude: 0.03,
  size: 0.8,
};

const servedRegionMarkers: Marker[] = [
  {
    name: "Ashanti",
    lat: 6.9,
    lng: -1.5,
    kind: "served",
    altitude: 0.015,
    size: 0.3,
  },
  {
    name: "Ahafo",
    lat: 7.1,
    lng: -2.45,
    kind: "served",
    altitude: 0.015,
    size: 0.3,
  },
  {
    name: "Bono East",
    lat: 7.75,
    lng: -1.1,
    kind: "served",
    altitude: 0.015,
    size: 0.3,
  },
  {
    name: "Central",
    lat: 5.5,
    lng: -1.05,
    kind: "served",
    altitude: 0.015,
    size: 0.3,
  },
  {
    name: "Eastern",
    lat: 6.45,
    lng: -0.55,
    kind: "served",
    altitude: 0.015,
    size: 0.3,
  },
  {
    name: "Western North",
    lat: 6.85,
    lng: -2.5,
    kind: "served",
    altitude: 0.015,
    size: 0.3,
  },
];

const initialMarkers = [kumasiMarker, ...servedRegionMarkers];

const routeArcs: RouteArc[] = servedRegionMarkers.map((region, index) => ({
  startLat: kumasiMarker.lat,
  startLng: kumasiMarker.lng,
  endLat: region.lat,
  endLng: region.lng,
  altitude: 0.18 + index * 0.015,
  name: `${region.name} route`,
}));

const africaPointOfView = { lat: 2.5, lng: 18, altitude: 2.8 };
const ghanaPointOfView = { lat: 7.9465, lng: -1.0232, altitude: 1.5 };
const kumasiPointOfView = { lat: kumasiMarker.lat, lng: kumasiMarker.lng, altitude: 0.4 };

export function GhanaServiceMap() {
  const globeContainerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const pulseFrameRef = useRef<number | null>(null);
  const zoomTimerRef = useRef<number | null>(null);
  const markersRef = useRef<Marker[]>(initialMarkers.map((marker) => ({ ...marker })));
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const zoomToKumasi = () => {
      globeRef.current?.pointOfView(kumasiPointOfView, 1400);
    };

    const syncDimensions = () => {
      const container = globeContainerRef.current;
      const globe = globeRef.current;

      if (!container || !globe) {
        return;
      }

      globe.width(container.clientWidth);
      globe.height(container.clientHeight);
    };

    const animatePulse = () => {
      const globe = globeRef.current;

      if (!globe || !isMounted) {
        return;
      }

      const wave = (Math.sin(performance.now() / 350) + 1) / 2;
      const hqAltitude = 0.01 + wave * 0.04;

      markersRef.current = markersRef.current.map((marker) =>
        marker.kind === "hq" ? { ...marker, altitude: hqAltitude } : marker,
      );

      globe.pointsData([...markersRef.current]);
      pulseFrameRef.current = window.requestAnimationFrame(animatePulse);
    };

    const initGlobe = async () => {
      const container = globeContainerRef.current;

      if (!container) {
        return;
      }

      const Globe = (await import("globe.gl")).default;

      if (!isMounted || !globeContainerRef.current) {
        return;
      }

      container.innerHTML = "";

      const ghanaFeature = ghanaBoundary.features[0];
      const globe = new Globe(container, {
        animateIn: false,
        waitForGlobeReady: true,
      })
        .backgroundColor(SECTION_BG)
        .globeImageUrl(NIGHT_EARTH_TEXTURE)
        .showAtmosphere(true)
        .atmosphereColor("#4b7d64")
        .atmosphereAltitude(0.15)
        .polygonsData([ghanaFeature])
        .polygonCapColor(() => "rgba(26,74,46,0.7)")
        .polygonSideColor(() => "rgba(26,74,46,0.25)")
        .polygonStrokeColor(() => GOLD)
        .polygonAltitude(0.055)
        .polygonsTransitionDuration(800)
        .pointsData([...markersRef.current])
        .pointLat("lat")
        .pointLng("lng")
        .pointAltitude((markerObj: object) => (markerObj as Marker).altitude)
        .pointRadius((markerObj: object) => (markerObj as Marker).size)
        .pointColor((markerObj: object) => {
          const marker = markerObj as Marker;
          return marker.kind === "hq" ? GOLD : ACTIVE_REGION_GREEN;
        })
        .pointLabel((markerObj: object) => {
          const marker = markerObj as Marker;
          return marker.kind === "hq" ? marker.name : marker.name;
        })
        .ringsData([kumasiMarker])
        .ringLat("lat")
        .ringLng("lng")
        .ringColor(() => [GOLD, "rgba(232,184,75,0)"])
        .ringAltitude(0.002)
        .ringMaxRadius(3.5)
        .ringPropagationSpeed(1.1)
        .ringRepeatPeriod(1200)
        .arcsData(routeArcs)
        .arcStartLat("startLat")
        .arcStartLng("startLng")
        .arcEndLat("endLat")
        .arcEndLng("endLng")
        .arcAltitude("altitude")
        .arcColor(() => [GOLD, GOLD])
        .arcStroke(() => 0.5)
        .arcDashLength(0.36)
        .arcDashGap(1)
        .arcDashAnimateTime(2000)
        .arcLabel((arcObj: object) => (arcObj as RouteArc).name)
        .onPolygonClick(() => {
          zoomToKumasi();
        })
        .onPointClick((markerObj: object) => {
          const marker = markerObj as Marker;

          if (marker.kind === "hq") {
            zoomToKumasi();
          }
        })
        .onGlobeReady(() => {
          globe.pointOfView(africaPointOfView, 0);
          syncDimensions();
          setIsReady(true);

          zoomTimerRef.current = window.setTimeout(() => {
            globe.pointOfView(ghanaPointOfView, 3000);
          }, 220);
        });

      const controls = globe.controls?.();
      if (controls) {
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
        controls.minDistance = 110;
        controls.maxDistance = 480;
        controls.rotateSpeed = 0.75;
        controls.zoomSpeed = 0.9;
      }

      globeRef.current = globe;
      syncDimensions();

      resizeObserverRef.current = new ResizeObserver(() => {
        syncDimensions();
      });
      resizeObserverRef.current.observe(container);

      pulseFrameRef.current = window.requestAnimationFrame(animatePulse);
    };

    initGlobe();

    return () => {
      isMounted = false;

      if (pulseFrameRef.current) {
        window.cancelAnimationFrame(pulseFrameRef.current);
      }

      if (zoomTimerRef.current) {
        window.clearTimeout(zoomTimerRef.current);
      }

      resizeObserverRef.current?.disconnect();
      globeRef.current?.pauseAnimation?.();
      globeRef.current = null;
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#173626]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/55 to-[#173626]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_50%_14%,rgba(232,184,75,0.14),transparent_30%),radial-gradient(circle_at_88%_55%,rgba(21,51,36,0.28),transparent_26%)]"
      />

      <div className="relative pt-10 lg:pt-14">
        <div className="relative">
          <div
            ref={globeContainerRef}
            className="h-[400px] w-full cursor-grab touch-pan-y active:cursor-grabbing md:h-[520px] lg:h-[640px]"
            aria-label="Interactive globe showing Ghana, Kumasi headquarters, and regional service routes"
          />

          {!isReady ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cream/65">
                Loading Interactive Globe
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
