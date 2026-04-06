"use client";

import { useEffect, useRef, useState } from "react";
import ghanaBoundary from "@/data/ghana-country.geo.json";

const SECTION_BG_GRADIENT =
  "radial-gradient(circle at 24% 54%, rgba(10, 55, 27, 0.72) 0%, rgba(14,35,22,0.55) 22%, rgba(7,15,10,0) 44%), radial-gradient(circle at 72% 18%, rgba(18,34,52,0.22) 0%, rgba(6,12,10,0) 34%), linear-gradient(180deg, #08110c 0%, #050c08 48%, #030705 100%)";
const EDGE_FADE_MASK =
  "radial-gradient(ellipse 70% 90% at 50% 50%, black 50%, transparent 100%)";
const TOP_BLEND_GRADIENT =
  "linear-gradient(180deg, rgb(1, 16, 8) 0%, rgba(8,19,13,0.96) 12%, rgba(10,22,16,0.78) 24%, rgba(9,18,13,0.42) 42%, rgba(8,17,12,0) 72%)";
const BOTTOM_BLEND_GRADIENT =
  "linear-gradient(0deg, rgba(8,19,13,1) 0%, rgba(8,19,13,0.96) 10%, rgba(8,19,13,0.72) 22%, rgba(8,19,13,0.28) 38%, rgba(8,19,13,0) 66%)";
const STARFIELD_PATTERN =
  "radial-gradient(circle, rgba(255,255,255,0.9) 0 1px, transparent 1.7px), radial-gradient(circle, rgba(136, 137, 138, 0.78) 0 1.1px, transparent 1.8px), radial-gradient(circle, rgba(232,184,75,0.55) 0 0.9px, transparent 1.7px)";
const STAR_GLOW_PATTERN =
  "radial-gradient(circle at 14% 24%, rgba(255,255,255,0.16) 0%, transparent 9%), radial-gradient(circle at 28% 66%, rgba(178,214,255,0.14) 0%, transparent 8%), radial-gradient(circle at 52% 18%, rgba(255,255,255,0.16) 0%, transparent 7%), radial-gradient(circle at 74% 34%, rgba(232,184,75,0.1) 0%, transparent 8%), radial-gradient(circle at 88% 72%, rgba(255,255,255,0.14) 0%, transparent 10%)";
const GHANA_FOREST = "#1a4a2e";
const ACTIVE_REGION_GREEN = "#15583d";
const GOLD = "#e8b84b";
const SURFACE_EARTH_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const TOPOLOGY_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-topology.png";
const CITY_LIGHTS_TEXTURE =
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

const routeArcs: RouteArc[] = servedRegionMarkers.map((region) => ({
  startLat: kumasiMarker.lat,
  startLng: kumasiMarker.lng,
  endLat: region.lat,
  endLng: region.lng,
  name: `${region.name} route`,
}));

const ghanaPointOfView = { lat: 7.9465, lng: -1.0232, altitude: 1.5 };

export function GhanaServiceMap() {
  const globeContainerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const pulseFrameRef = useRef<number | null>(null);
  const markersRef = useRef<Marker[]>(initialMarkers.map((marker) => ({ ...marker })));
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const syncDimensions = () => {
      const container = globeContainerRef.current;
      const globe = globeRef.current;

      if (!container || !globe) {
        return;
      }

      globe.width(container.clientWidth);
      globe.height(container.clientHeight);
      globe.globeOffset?.([
        container.clientWidth >= 1280
          ? -Math.round(container.clientWidth * 0.18)
          : container.clientWidth >= 768
            ? -Math.round(container.clientWidth * 0.1)
            : -Math.round(container.clientWidth * 0.05),
        container.clientWidth >= 1024 ? 28 : 18,
      ]);
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
      const THREE = await import("three");

      if (!isMounted || !globeContainerRef.current) {
        return;
      }

      container.innerHTML = "";

      const ghanaFeature = ghanaBoundary.features[0];
      const globe = new Globe(container, {
        animateIn: false,
        waitForGlobeReady: true,
      })
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl(SURFACE_EARTH_TEXTURE)
        .bumpImageUrl(TOPOLOGY_TEXTURE)
        .showAtmosphere(true)
        .atmosphereColor("#4db86a")
        .atmosphereAltitude(0.15)
        .polygonsData([ghanaFeature])
        .polygonCapColor(() => `${GHANA_FOREST}b3`)
        .polygonSideColor(() => `${GHANA_FOREST}40`)
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
        .pointLabel((markerObj: object) => (markerObj as Marker).name)
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
        .arcAltitude(0.3)
        .arcColor(() => [GOLD, GOLD])
        .arcStroke(0.8)
        .arcDashLength(0.36)
        .arcDashGap(1)
        .arcDashAnimateTime(2000)
        .arcLabel((arcObj: object) => (arcObj as RouteArc).name)
        .onGlobeReady(() => {
          const currentMaterial = globe.globeMaterial() as any;
          if (currentMaterial.map) {
            currentMaterial.map.colorSpace = THREE.SRGBColorSpace;
            currentMaterial.map.needsUpdate = true;
          }

          globe.pointOfView(ghanaPointOfView, 0);
          syncDimensions();
          setIsReady(true);
        });

      const globeMaterial = globe.globeMaterial() as any;
      const cityLightsMap = new THREE.TextureLoader().load(CITY_LIGHTS_TEXTURE);

      cityLightsMap.colorSpace = THREE.SRGBColorSpace;

      globeMaterial.color = new THREE.Color("#f6fff9");
      globeMaterial.emissive = new THREE.Color(GOLD);
      globeMaterial.emissiveMap = cityLightsMap;
      globeMaterial.emissiveIntensity = 0.6;
      globeMaterial.bumpScale = 10;
      globeMaterial.shininess = 18;
      globeMaterial.specular = new THREE.Color("#6fd1c0");
      globeMaterial.needsUpdate = true;

      globe.lights([
        new THREE.AmbientLight("#ffffff", 2.5),
        (() => {
          const directionalLight = new THREE.DirectionalLight("#ffffff", 1.8);
          directionalLight.position.set(-1.6, 1.2, 1.8);
          return directionalLight;
        })(),
      ]);

      const renderer = globe.renderer?.();
      if (renderer) {
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }

      const controls = globe.controls?.();
      if (controls) {
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.enableRotate = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
        controls.minDistance = 110;
        controls.maxDistance = 480;
        controls.rotateSpeed = 0.75;
        controls.zoomSpeed = 0;
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

      resizeObserverRef.current?.disconnect();
      globeRef.current?.pauseAnimation?.();
      globeRef.current = null;
    };
  }, []);

  return (
    <section
      className="relative isolate -mb-px -mt-px overflow-hidden"
      style={{ background: SECTION_BG_GRADIENT }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-56"
        style={{ background: TOP_BLEND_GRADIENT }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48"
        style={{ background: BOTTOM_BLEND_GRADIENT }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: STARFIELD_PATTERN,
          backgroundPosition: "0 0, 42px 86px, 120px 34px",
          backgroundSize: "180px 180px, 260px 260px, 320px 320px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ backgroundImage: STAR_GLOW_PATTERN }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(77,184,106,0.12),transparent_22%),radial-gradient(circle_at_42%_18%,rgba(255,255,255,0.06),transparent_18%),radial-gradient(circle_at_84%_60%,rgba(10,26,16,0.52),transparent_28%)]"
      />

      <div className="relative pt-10 lg:pt-14">
        <div
          className="relative overflow-hidden"
          style={{
            WebkitMaskImage: EDGE_FADE_MASK,
            maskImage: EDGE_FADE_MASK,
          }}
        >
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
