"use client";

import { useEffect, useRef, useState } from "react";
import ghanaBoundary from "@/data/ghana-country.geo.json";

const COUNTRY_TOPOLOGY_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const SECTION_BG_GRADIENT =
  "radial-gradient(circle at 18% 42%, rgba(0, 255, 136, 0.12) 0%, rgba(0, 255, 136, 0.04) 16%, rgba(0, 0, 0, 0) 34%), radial-gradient(circle at 84% 24%, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.02) 18%, rgba(0, 0, 0, 0) 38%), linear-gradient(180deg, #07140a 0%, #0a1f0f 34%, #08130d 76%, #06100b 100%)";
const EDGE_FADE_MASK =
  "radial-gradient(ellipse 70% 90% at 50% 50%, black 54%, transparent 100%)";
const TOP_BLEND_GRADIENT =
  "linear-gradient(180deg, rgba(4,11,6,1) 0%, rgba(4,11,6,0.94) 18%, rgba(4,11,6,0.62) 42%, rgba(4,11,6,0) 100%)";
const BOTTOM_BLEND_GRADIENT =
  "linear-gradient(0deg, rgba(6,16,11,1) 0%, rgba(6,16,11,0.98) 18%, rgba(6,16,11,0.74) 42%, rgba(6,16,11,0) 100%)";
const STAR_GLOW_PATTERN =
  "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.08) 0%, transparent 8%), radial-gradient(circle at 76% 26%, rgba(0,255,136,0.08) 0%, transparent 10%), radial-gradient(circle at 62% 72%, rgba(255,215,0,0.06) 0%, transparent 9%), radial-gradient(circle at 88% 58%, rgba(255,255,255,0.05) 0%, transparent 8%)";

const SURFACE_EARTH_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const TOPOLOGY_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-topology.png";
const CITY_LIGHTS_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-night.jpg";

const GLOBE_RADIUS = 100;
const GHANA_TARGET = { lat: 7.9, lng: -1.0, altitude: 1.7 };
const INITIAL_POINT_OF_VIEW = { lat: 18, lng: 20, altitude: 2.2 };
const HOVER_COLOR = "#00ff88";
const GHANA_COLOR = "#ffd700";
const DEFAULT_COUNTRY_STROKE = "rgba(0, 255, 136, 0.15)";
const GHANA_STROKE = "rgba(255, 215, 0, 0.9)";
const HOVER_STROKE = "rgba(0, 255, 136, 0.96)";
const RAYCAST_INTERVAL_MS = 16;
const GHANA_FOCUS_DELAY_MS = 2000;
const GHANA_FOCUS_DURATION_MS = 2200;
const GHANA_PULSE_DURATION_MS = 2000;

type LngLat = [number, number];

type CountryTooltip = {
  name: string;
  x: number;
  y: number;
};

type TopologyTransform = {
  scale: [number, number];
  translate: [number, number];
};

type TopologyPolygonGeometry = {
  type: "Polygon";
  id?: string;
  properties?: { name?: string };
  arcs: number[][];
};

type TopologyMultiPolygonGeometry = {
  type: "MultiPolygon";
  id?: string;
  properties?: { name?: string };
  arcs: number[][][];
};

type CountryTopology = {
  type: "Topology";
  transform: TopologyTransform;
  arcs: [number, number][][];
  objects: {
    countries: {
      type: "GeometryCollection";
      geometries: Array<TopologyPolygonGeometry | TopologyMultiPolygonGeometry>;
    };
  };
};

type CountryGeometry =
  | {
      type: "Polygon";
      coordinates: LngLat[][];
    }
  | {
      type: "MultiPolygon";
      coordinates: LngLat[][][];
    };

type CountryFeature = {
  type: "Feature";
  id?: string;
  properties: {
    name: string;
  };
  geometry: CountryGeometry;
};

type PreparedPolygon = {
  rings: LngLat[][];
  minLat: number;
  maxLat: number;
};

type PreparedCountry = {
  id: string;
  name: string;
  feature: CountryFeature;
  polygons: PreparedPolygon[];
  minLat: number;
  maxLat: number;
  isGhana: boolean;
};

type CountryMaterials = {
  defaultCap: any;
  defaultSide: any;
  hoverCap: any;
  hoverSide: any;
  ghanaCap: any;
  ghanaSide: any;
};

type PointerState = {
  active: boolean;
  clientX: number;
  clientY: number;
};

const fallbackGhanaFeature: CountryFeature = {
  type: "Feature",
  id: "Ghana",
  properties: {
    name: "Ghana",
  },
  geometry:
    ghanaBoundary.features[0].geometry.type === "Polygon"
      ? {
          type: "Polygon",
          coordinates: ghanaBoundary.features[0].geometry.coordinates as LngLat[][],
        }
      : {
          type: "MultiPolygon",
          coordinates: ghanaBoundary.features[0].geometry.coordinates as unknown as LngLat[][][],
        },
};

function decodeArc(
  arc: [number, number][],
  transform: TopologyTransform,
): LngLat[] {
  let x = 0;
  let y = 0;

  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;

    return [
      transform.translate[0] + x * transform.scale[0],
      transform.translate[1] + y * transform.scale[1],
    ];
  });
}

function getArcPoints(arcIndex: number, decodedArcs: LngLat[][]): LngLat[] {
  const index = arcIndex >= 0 ? arcIndex : ~arcIndex;
  const arc = decodedArcs[index] ?? [];
  return arcIndex >= 0 ? arc : [...arc].reverse();
}

function closeRing(points: LngLat[]): LngLat[] {
  if (points.length === 0) {
    return points;
  }

  const [firstLng, firstLat] = points[0];
  const [lastLng, lastLat] = points[points.length - 1];

  if (firstLng === lastLng && firstLat === lastLat) {
    return points;
  }

  return [...points, points[0]];
}

function stitchRing(arcIndices: number[], decodedArcs: LngLat[][]): LngLat[] {
  const points = arcIndices.reduce<LngLat[]>((allPoints, arcIndex, index) => {
    const arcPoints = getArcPoints(arcIndex, decodedArcs);

    if (arcPoints.length === 0) {
      return allPoints;
    }

    if (index === 0) {
      return [...arcPoints];
    }

    return allPoints.concat(arcPoints.slice(1));
  }, []);

  return closeRing(points);
}

function topologyToCountries(topology: CountryTopology): CountryFeature[] {
  const decodedArcs = topology.arcs.map((arc) => decodeArc(arc, topology.transform));

  return topology.objects.countries.geometries.map((geometry) => {
    const name = geometry.properties?.name ?? geometry.id ?? "Unknown";

    if (geometry.type === "Polygon") {
      return {
        type: "Feature",
        id: geometry.id,
        properties: { name },
        geometry: {
          type: "Polygon",
          coordinates: geometry.arcs.map((ring) => stitchRing(ring, decodedArcs)),
        },
      };
    }

    return {
      type: "Feature",
      id: geometry.id,
      properties: { name },
      geometry: {
        type: "MultiPolygon",
        coordinates: geometry.arcs.map((polygon) =>
          polygon.map((ring) => stitchRing(ring, decodedArcs)),
        ),
      },
    };
  });
}

function prepareCountry(feature: CountryFeature): PreparedCountry {
  const polygons =
    feature.geometry.type === "Polygon"
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates;

  let minLat = Infinity;
  let maxLat = -Infinity;

  const preparedPolygons = polygons.map((rings) => {
    let polygonMinLat = Infinity;
    let polygonMaxLat = -Infinity;

    rings.forEach((ring) => {
      ring.forEach(([, lat]) => {
        polygonMinLat = Math.min(polygonMinLat, lat);
        polygonMaxLat = Math.max(polygonMaxLat, lat);
      });
    });

    minLat = Math.min(minLat, polygonMinLat);
    maxLat = Math.max(maxLat, polygonMaxLat);

    return {
      rings,
      minLat: polygonMinLat,
      maxLat: polygonMaxLat,
    };
  });

  return {
    id: String(feature.id ?? feature.properties.name),
    name: feature.properties.name,
    feature,
    polygons: preparedPolygons,
    minLat,
    maxLat,
    isGhana: feature.properties.name === "Ghana",
  };
}

function normalizeLongitudeAround(referenceLng: number, lng: number): number {
  let normalizedLng = lng;

  while (normalizedLng - referenceLng > 180) {
    normalizedLng -= 360;
  }

  while (normalizedLng - referenceLng < -180) {
    normalizedLng += 360;
  }

  return normalizedLng;
}

function isPointOnSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): boolean {
  const epsilon = 1e-7;
  const crossProduct = (px - ax) * (by - ay) - (py - ay) * (bx - ax);

  if (Math.abs(crossProduct) > epsilon) {
    return false;
  }

  const dotProduct = (px - ax) * (bx - ax) + (py - ay) * (by - ay);

  if (dotProduct < -epsilon) {
    return false;
  }

  const segmentLengthSquared = (bx - ax) ** 2 + (by - ay) ** 2;

  return dotProduct - segmentLengthSquared <= epsilon;
}

function isPointInRing(lng: number, lat: number, ring: LngLat[]): boolean {
  let inside = false;

  for (let index = 0, previousIndex = ring.length - 1; index < ring.length; previousIndex = index++) {
    const [rawX1, y1] = ring[index];
    const [rawX2, y2] = ring[previousIndex];
    const x1 = normalizeLongitudeAround(lng, rawX1);
    const x2 = normalizeLongitudeAround(lng, rawX2);

    if (isPointOnSegment(lng, lat, x1, y1, x2, y2)) {
      return true;
    }

    const crossesLatitude = y1 > lat !== y2 > lat;

    if (!crossesLatitude) {
      continue;
    }

    const intersectionX = x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1);

    if (lng < intersectionX) {
      inside = !inside;
    }
  }

  return inside;
}

function isPointInPreparedPolygon(
  countryPolygon: PreparedPolygon,
  lat: number,
  lng: number,
): boolean {
  if (lat < countryPolygon.minLat || lat > countryPolygon.maxLat) {
    return false;
  }

  const [outerRing, ...holes] = countryPolygon.rings;

  if (!outerRing || !isPointInRing(lng, lat, outerRing)) {
    return false;
  }

  return !holes.some((hole) => isPointInRing(lng, lat, hole));
}

function findCountryAtLatLng(
  countries: PreparedCountry[],
  lat: number,
  lng: number,
): PreparedCountry | null {
  for (const country of countries) {
    if (lat < country.minLat || lat > country.maxLat) {
      continue;
    }

    if (country.polygons.some((polygon) => isPointInPreparedPolygon(polygon, lat, lng))) {
      return country;
    }
  }

  return null;
}

function createGlowSpriteTexture(THREE: any) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 215, 0, 1)");
  gradient.addColorStop(0.38, "rgba(255, 215, 0, 0.65)");
  gradient.addColorStop(0.72, "rgba(255, 215, 0, 0.18)");
  gradient.addColorStop(1, "rgba(255, 215, 0, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

function createCountryMaterials(THREE: any): CountryMaterials {
  return {
    defaultCap: new THREE.MeshPhongMaterial({
      color: "#0b2012",
      emissive: "#082814",
      emissiveIntensity: 0.12,
      transparent: true,
      opacity: 0.045,
      shininess: 10,
      depthWrite: false,
    }),
    defaultSide: new THREE.MeshPhongMaterial({
      color: "#06160d",
      emissive: "#041b0d",
      emissiveIntensity: 0.08,
      transparent: true,
      opacity: 0.03,
      shininess: 4,
      depthWrite: false,
    }),
    hoverCap: new THREE.MeshPhongMaterial({
      color: HOVER_COLOR,
      emissive: HOVER_COLOR,
      emissiveIntensity: 1.8,
      transparent: true,
      opacity: 0.6,
      shininess: 120,
      depthWrite: false,
    }),
    hoverSide: new THREE.MeshPhongMaterial({
      color: HOVER_COLOR,
      emissive: HOVER_COLOR,
      emissiveIntensity: 1.25,
      transparent: true,
      opacity: 0.22,
      shininess: 80,
      depthWrite: false,
    }),
    ghanaCap: new THREE.MeshPhongMaterial({
      color: GHANA_COLOR,
      emissive: GHANA_COLOR,
      emissiveIntensity: 0.95,
      transparent: true,
      opacity: 0.28,
      shininess: 70,
      depthWrite: false,
    }),
    ghanaSide: new THREE.MeshPhongMaterial({
      color: GHANA_COLOR,
      emissive: GHANA_COLOR,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.12,
      shininess: 40,
      depthWrite: false,
    }),
  };
}

function sphereUvToLocalPoint(THREE: any, radius: number, uv: { x: number; y: number }) {
  const phi = uv.x * Math.PI * 2;
  const theta = uv.y * Math.PI;

  return new THREE.Vector3(
    -Math.cos(phi) * Math.sin(theta) * radius,
    Math.cos(theta) * radius,
    Math.sin(phi) * Math.sin(theta) * radius,
  );
}

function disposeMaterial(material: any) {
  if (!material) {
    return;
  }

  if (Array.isArray(material)) {
    material.forEach((entry) => disposeMaterial(entry));
    return;
  }

  Object.values(material).forEach((value) => {
    if (
      value &&
      typeof value === "object" &&
      "dispose" in value &&
      typeof (value as { dispose?: unknown }).dispose === "function"
    ) {
      try {
        (value as { dispose: () => void }).dispose();
      } catch {
        // Ignore disposal errors for non-texture object values.
      }
    }
  });

  material.dispose?.();
}

function disposeObject3D(object: any) {
  if (!object) {
    return;
  }

  object.traverse?.((child: any) => {
    child.geometry?.dispose?.();
    disposeMaterial(child.material);
  });
}

async function loadCountries(): Promise<PreparedCountry[]> {
  try {
    const response = await fetch(COUNTRY_TOPOLOGY_URL);

    if (!response.ok) {
      throw new Error(`Failed to load countries: ${response.status}`);
    }

    const topology = (await response.json()) as CountryTopology;
    return topologyToCountries(topology).map(prepareCountry);
  } catch (error) {
    console.error("Falling back to local Ghana boundary after country fetch failed.", error);
    return [prepareCountry(fallbackGhanaFeature)];
  }
}

export function GhanaServiceMap() {
  const globeContainerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const focusTimerRef = useRef<number | null>(null);
  const resumeRotateTimerRef = useRef<number | null>(null);
  const interactionSphereRef = useRef<any>(null);
  const pinCoreRef = useRef<any>(null);
  const pinHaloRef = useRef<any>(null);
  const starMaterialRef = useRef<any>(null);
  const pointerRef = useRef<PointerState>({
    active: false,
    clientX: 0,
    clientY: 0,
  });
  const lastRaycastRef = useRef(0);
  const hoverCountryRef = useRef<PreparedCountry | null>(null);
  const countriesRef = useRef<PreparedCountry[]>([]);
  const countryMaterialsRef = useRef<CountryMaterials | null>(null);
  const cleanupObjectsRef = useRef<any[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [tooltip, setTooltip] = useState<CountryTooltip | null>(null);

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
          ? -Math.round(container.clientWidth * 0.2)
          : container.clientWidth >= 1024
            ? -Math.round(container.clientWidth * 0.15)
            : container.clientWidth >= 768
              ? -Math.round(container.clientWidth * 0.06)
              : -Math.round(container.clientWidth * 0.12),
        container.clientWidth >= 1024 ? 10 : 6,
      ]);
    };

    const setTooltipState = (nextTooltip: CountryTooltip | null) => {
      if (!isMounted) {
        return;
      }

      setTooltip((currentTooltip) => {
        if (!currentTooltip && !nextTooltip) {
          return currentTooltip;
        }

        if (
          currentTooltip &&
          nextTooltip &&
          currentTooltip.name === nextTooltip.name &&
          Math.abs(currentTooltip.x - nextTooltip.x) < 0.5 &&
          Math.abs(currentTooltip.y - nextTooltip.y) < 0.5
        ) {
          return currentTooltip;
        }

        return nextTooltip;
      });
    };

    const applyCountryLayer = () => {
      const globe = globeRef.current;
      const countryMaterials = countryMaterialsRef.current;

      if (!globe || !countryMaterials || countriesRef.current.length === 0) {
        return;
      }

      const hoveredCountry = hoverCountryRef.current;

      globe
        .polygonsData(countriesRef.current.map((country) => country.feature))
        .polygonCapMaterial((feature: CountryFeature) => {
          if (feature === hoveredCountry?.feature) {
            return countryMaterials.hoverCap;
          }

          if (feature.properties.name === "Ghana") {
            return countryMaterials.ghanaCap;
          }

          return countryMaterials.defaultCap;
        })
        .polygonSideMaterial((feature: CountryFeature) => {
          if (feature === hoveredCountry?.feature) {
            return countryMaterials.hoverSide;
          }

          if (feature.properties.name === "Ghana") {
            return countryMaterials.ghanaSide;
          }

          return countryMaterials.defaultSide;
        })
        .polygonStrokeColor((feature: CountryFeature) => {
          if (feature === hoveredCountry?.feature) {
            return HOVER_STROKE;
          }

          if (feature.properties.name === "Ghana") {
            return GHANA_STROKE;
          }

          return DEFAULT_COUNTRY_STROKE;
        })
        .polygonAltitude((feature: CountryFeature) => {
          if (feature === hoveredCountry?.feature) {
            return 0.02;
          }

          if (feature.properties.name === "Ghana") {
            return 0.01;
          }

          return 0.0024;
        })
        .polygonsTransitionDuration(260);
    };

    const clearHover = () => {
      hoverCountryRef.current = null;
      setTooltipState(null);
      applyCountryLayer();
    };

    const updateHoveredCountry = (
      nextCountry: PreparedCountry | null,
      x: number,
      y: number,
    ) => {
      const previousCountry = hoverCountryRef.current;

      if (previousCountry?.id !== nextCountry?.id) {
        hoverCountryRef.current = nextCountry;
        applyCountryLayer();
      }

      if (!nextCountry) {
        setTooltipState(null);
        return;
      }

      setTooltipState({
        name: nextCountry.name,
        x,
        y,
      });
    };

    const scheduleGhanaFocus = () => {
      const globe = globeRef.current;
      const controls = globe?.controls?.();

      if (!globe || !controls) {
        return;
      }

      focusTimerRef.current = window.setTimeout(() => {
        if (!isMounted || !globeRef.current) {
          return;
        }

        controls.autoRotate = false;
        globe.pointOfView(GHANA_TARGET, GHANA_FOCUS_DURATION_MS);

        resumeRotateTimerRef.current = window.setTimeout(() => {
          if (!isMounted) {
            return;
          }

          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.16;
        }, GHANA_FOCUS_DURATION_MS + 120);
      }, GHANA_FOCUS_DELAY_MS);
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

      const localRaycaster = new THREE.Raycaster();
      const pointerVector = new THREE.Vector2();
      const goldGlowTexture = createGlowSpriteTexture(THREE);
      const tempPoint = new THREE.Vector3();

      const applyHoverRaycast = () => {
        const globe = globeRef.current;
        const interactionSphere = interactionSphereRef.current;
        const pointer = pointerRef.current;

        if (!globe || !interactionSphere || !pointer.active) {
          return;
        }

        const renderer = globe.renderer?.();
        const camera = globe.camera?.();
        const canvas = renderer?.domElement;

        if (!canvas || !camera) {
          return;
        }

        const bounds = canvas.getBoundingClientRect();
        const x = ((pointer.clientX - bounds.left) / bounds.width) * 2 - 1;
        const y = -((pointer.clientY - bounds.top) / bounds.height) * 2 + 1;

        pointerVector.set(x, y);
        localRaycaster.setFromCamera(pointerVector, camera);

        const [hit] = localRaycaster.intersectObject(interactionSphere, false);

        if (!hit?.uv) {
          clearHover();
          return;
        }

        tempPoint.copy(sphereUvToLocalPoint(THREE, GLOBE_RADIUS, hit.uv));
        interactionSphere.localToWorld(tempPoint);

        const geoPoint = globe.toGeoCoords({
          x: tempPoint.x,
          y: tempPoint.y,
          z: tempPoint.z,
        });

        if (!geoPoint) {
          clearHover();
          return;
        }

        const hoveredCountry = findCountryAtLatLng(
          countriesRef.current,
          geoPoint.lat,
          geoPoint.lng,
        );

        updateHoveredCountry(
          hoveredCountry,
          pointer.clientX - bounds.left,
          pointer.clientY - bounds.top,
        );
      };

      container.innerHTML = "";

      const globe = new Globe(container, {
        animateIn: false,
        waitForGlobeReady: true,
      })
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl(SURFACE_EARTH_TEXTURE)
        .bumpImageUrl(TOPOLOGY_TEXTURE)
        .showAtmosphere(false)
        .polygonCapCurvatureResolution(2.4)
        .polygonsTransitionDuration(260)
        .enablePointerInteraction(false)
        .showPointerCursor(false)
        .onGlobeReady(() => {
          const currentMaterial = globe.globeMaterial() as any;

          if (currentMaterial.map) {
            currentMaterial.map.colorSpace = THREE.SRGBColorSpace;
            currentMaterial.map.needsUpdate = true;
          }

          globe.pointOfView(INITIAL_POINT_OF_VIEW, 0);
          syncDimensions();
          scheduleGhanaFocus();
          setIsReady(true);
        });

      const globeMaterial = globe.globeMaterial() as any;
      const cityLightsMap = new THREE.TextureLoader().load(CITY_LIGHTS_TEXTURE);
      cityLightsMap.colorSpace = THREE.SRGBColorSpace;

      globeMaterial.color = new THREE.Color("#f6fff7");
      globeMaterial.emissive = new THREE.Color("#56c773");
      globeMaterial.emissiveMap = cityLightsMap;
      globeMaterial.emissiveIntensity = 0.38;
      globeMaterial.bumpScale = 9;
      globeMaterial.shininess = 18;
      globeMaterial.specular = new THREE.Color("#7af0b6");
      globeMaterial.needsUpdate = true;

      globe.lights([
        new THREE.AmbientLight("#d8ffe8", 1.95),
        (() => {
          const directionalLight = new THREE.DirectionalLight("#dfffe9", 1.55);
          directionalLight.position.set(-1.6, 1.15, 1.85);
          return directionalLight;
        })(),
        (() => {
          const goldAccent = new THREE.DirectionalLight("#ffd84d", 0.72);
          goldAccent.position.set(1.15, -0.3, 1.9);
          return goldAccent;
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
        controls.autoRotateSpeed = 0.34;
        controls.rotateSpeed = 0.75;
        controls.minDistance = 160;
        controls.maxDistance = 260;
        controls.zoomSpeed = 0;
      }

      countryMaterialsRef.current = createCountryMaterials(THREE);

      const scene = globe.scene?.();

      if (scene) {
        const interactionSphere = new THREE.Mesh(
          new THREE.SphereGeometry(GLOBE_RADIUS, 72, 72),
          new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            depthWrite: false,
          }),
        );
        interactionSphere.rotation.y = -Math.PI / 2;
        interactionSphere.renderOrder = -1;
        interactionSphereRef.current = interactionSphere;
        cleanupObjectsRef.current.push(interactionSphere);
        scene.add(interactionSphere);

        const gridMaterial = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uColor: { value: new THREE.Color(HOVER_COLOR) },
            uMinorOpacity: { value: 0.028 },
            uMajorOpacity: { value: 0.08 },
          },
          vertexShader: `
            varying vec3 vWorldPosition;

            void main() {
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vWorldPosition = worldPosition.xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vWorldPosition;

            uniform vec3 uColor;
            uniform float uMinorOpacity;
            uniform float uMajorOpacity;

            float lineMask(float value) {
              float grid = abs(fract(value - 0.5) - 0.5) / fwidth(value);
              return 1.0 - min(grid, 1.0);
            }

            void main() {
              vec3 normal = normalize(vWorldPosition);
              float latitude = asin(normal.y);
              float longitude = atan(normal.z, normal.x);
              float longitudeValue = (longitude + 3.141592653589793) / 6.283185307179586;
              float latitudeValue = (latitude + 1.5707963267948966) / 3.141592653589793;

              float minorGrid = max(
                lineMask(longitudeValue * 36.0),
                lineMask(latitudeValue * 18.0)
              );

              float majorGrid = max(
                lineMask(longitudeValue * 12.0),
                lineMask(latitudeValue * 6.0)
              );

              float alpha = minorGrid * uMinorOpacity + majorGrid * uMajorOpacity;
              gl_FragColor = vec4(uColor, alpha);
            }
          `,
        });

        const gridSphere = new THREE.Mesh(
          new THREE.SphereGeometry(GLOBE_RADIUS * 1.0025, 96, 96),
          gridMaterial,
        );
        gridSphere.rotation.y = -Math.PI / 2;
        cleanupObjectsRef.current.push(gridSphere);
        scene.add(gridSphere);

        const atmosphereMaterial = new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.BackSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uColor: { value: new THREE.Color(HOVER_COLOR) },
          },
          vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewDirection;

            void main() {
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
              vNormal = worldNormal;
              vViewDirection = normalize(cameraPosition - worldPosition.xyz);
              gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            varying vec3 vViewDirection;

            uniform vec3 uColor;

            void main() {
              float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDirection))), 3.8);
              float alpha = smoothstep(0.14, 0.78, fresnel) * 0.33;
              gl_FragColor = vec4(uColor, alpha);
            }
          `,
        });

        const atmosphereGlow = new THREE.Mesh(
          new THREE.SphereGeometry(GLOBE_RADIUS * 1.065, 96, 96),
          atmosphereMaterial,
        );
        atmosphereGlow.rotation.y = -Math.PI / 2;
        cleanupObjectsRef.current.push(atmosphereGlow);
        scene.add(atmosphereGlow);

        const starCount = 420;
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        const phases = new Float32Array(starCount);
        const speeds = new Float32Array(starCount);
        const strengths = new Float32Array(starCount);

        for (let index = 0; index < starCount; index += 1) {
          const radius = 430 + Math.random() * 420;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const sinPhi = Math.sin(phi);
          const offset = index * 3;

          positions[offset] = radius * sinPhi * Math.cos(theta);
          positions[offset + 1] = radius * Math.cos(phi);
          positions[offset + 2] = radius * sinPhi * Math.sin(theta);
          sizes[index] = 0.9 + Math.random() * 2.2;
          phases[index] = Math.random() * Math.PI * 2;
          speeds[index] = 0.55 + Math.random() * 1.4;
          strengths[index] = 0.3 + Math.random() * 0.65;
        }

        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3),
        );
        starGeometry.setAttribute(
          "aSize",
          new THREE.Float32BufferAttribute(sizes, 1),
        );
        starGeometry.setAttribute(
          "aPhase",
          new THREE.Float32BufferAttribute(phases, 1),
        );
        starGeometry.setAttribute(
          "aSpeed",
          new THREE.Float32BufferAttribute(speeds, 1),
        );
        starGeometry.setAttribute(
          "aStrength",
          new THREE.Float32BufferAttribute(strengths, 1),
        );

        const starMaterial = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
          },
          vertexShader: `
            attribute float aSize;
            attribute float aPhase;
            attribute float aSpeed;
            attribute float aStrength;

            uniform float uTime;

            varying float vStrength;

            void main() {
              vStrength = aStrength * (0.55 + 0.45 * sin(uTime * aSpeed + aPhase));
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = aSize * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying float vStrength;

            void main() {
              float distanceToCenter = length(gl_PointCoord - vec2(0.5));
              float alpha = smoothstep(0.48, 0.0, distanceToCenter) * vStrength;
              vec3 color = mix(vec3(0.72, 1.0, 0.85), vec3(1.0, 0.95, 0.72), 0.24);
              gl_FragColor = vec4(color, alpha);
            }
          `,
        });

        const starPoints = new THREE.Points(starGeometry, starMaterial);
        starMaterialRef.current = starMaterial;
        cleanupObjectsRef.current.push(starPoints);
        scene.add(starPoints);

        const ghanaPinGroup = new THREE.Group();
        const pinPosition = globe.getCoords(GHANA_TARGET.lat, GHANA_TARGET.lng, 0.022);
        ghanaPinGroup.position.set(pinPosition.x, pinPosition.y, pinPosition.z);

        const pinCore = new THREE.Mesh(
          new THREE.SphereGeometry(1.8, 18, 18),
          new THREE.MeshBasicMaterial({
            color: GHANA_COLOR,
            transparent: true,
            opacity: 1,
          }),
        );

        const haloMaterial = new THREE.SpriteMaterial({
          map: goldGlowTexture,
          color: GHANA_COLOR,
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
          depthTest: false,
        });

        const pinHalo = new THREE.Sprite(haloMaterial);
        pinHalo.scale.set(14, 14, 1);

        ghanaPinGroup.add(pinHalo);
        ghanaPinGroup.add(pinCore);

        pinCoreRef.current = pinCore;
        pinHaloRef.current = pinHalo;
        cleanupObjectsRef.current.push(ghanaPinGroup);
        scene.add(ghanaPinGroup);
      }

      globeRef.current = globe;

      syncDimensions();

      resizeObserverRef.current = new ResizeObserver(() => {
        syncDimensions();
      });
      resizeObserverRef.current.observe(container);

      const handlePointerMove = (event: PointerEvent) => {
        pointerRef.current = {
          active: true,
          clientX: event.clientX,
          clientY: event.clientY,
        };
      };

      const handlePointerLeave = () => {
        pointerRef.current.active = false;
        clearHover();
      };

      container.addEventListener("pointermove", handlePointerMove, { passive: true });
      container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

      const animate = () => {
        if (!isMounted) {
          return;
        }

        const now = performance.now();

        if (starMaterialRef.current?.uniforms?.uTime) {
          starMaterialRef.current.uniforms.uTime.value = now * 0.0012;
        }

        const pulseProgress =
          (Math.sin((now / GHANA_PULSE_DURATION_MS) * Math.PI * 2 - Math.PI / 2) + 1) / 2;

        if (pinCoreRef.current) {
          const coreScale = 1 + pulseProgress * 0.12;
          pinCoreRef.current.scale.setScalar(coreScale);
        }

        if (pinHaloRef.current) {
          const haloScale = 13 + pulseProgress * 8;
          pinHaloRef.current.scale.set(haloScale, haloScale, 1);
          pinHaloRef.current.material.opacity = 0.18 + (1 - pulseProgress) * 0.28;
        }

        if (
          pointerRef.current.active &&
          now - lastRaycastRef.current >= RAYCAST_INTERVAL_MS
        ) {
          applyHoverRaycast();
          lastRaycastRef.current = now;
        }

        animationFrameRef.current = window.requestAnimationFrame(animate);
      };

      animationFrameRef.current = window.requestAnimationFrame(animate);

      void loadCountries().then((countries) => {
        if (!isMounted) {
          return;
        }

        countriesRef.current = countries;
        applyCountryLayer();
      });

      return () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    };

    let removePointerListeners: (() => void) | undefined;

    void initGlobe().then((cleanup) => {
      removePointerListeners = cleanup;
    });

    return () => {
      isMounted = false;

      removePointerListeners?.();

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (focusTimerRef.current) {
        window.clearTimeout(focusTimerRef.current);
      }

      if (resumeRotateTimerRef.current) {
        window.clearTimeout(resumeRotateTimerRef.current);
      }

      resizeObserverRef.current?.disconnect();
      setTooltip(null);

      cleanupObjectsRef.current.forEach((object) => {
        globeRef.current?.scene?.()?.remove?.(object);
        disposeObject3D(object);
      });
      cleanupObjectsRef.current = [];

      if (countryMaterialsRef.current) {
        Object.values(countryMaterialsRef.current).forEach((material) =>
          disposeMaterial(material),
        );
      }

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
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{ backgroundImage: STAR_GLOW_PATTERN }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_38%,rgba(0,255,136,0.1),transparent_22%),radial-gradient(circle_at_78%_22%,rgba(255,215,0,0.08),transparent_18%),radial-gradient(circle_at_82%_72%,rgba(10,31,15,0.78),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-24 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#06100b_100%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 sm:pb-8 lg:px-8 lg:pb-0 lg:pt-14">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.62fr)_minmax(320px,0.72fr)] lg:items-center">
          <div className="order-2 overflow-hidden lg:order-1 lg:-ml-20 xl:-ml-36">
            <div
              className="relative mx-auto w-full max-w-[28rem] overflow-hidden sm:max-w-[32rem] md:max-w-[40rem] lg:max-w-none"
              style={{
                WebkitMaskImage: EDGE_FADE_MASK,
                maskImage: EDGE_FADE_MASK,
              }}
            >
              <div
                ref={globeContainerRef}
                className="h-[360px] w-full cursor-grab touch-pan-y active:cursor-grabbing sm:h-[440px] md:h-[540px] lg:h-[700px]"
                aria-label="Interactive globe with world countries, hover highlights, and Ghana focus"
              />

              {tooltip ? (
                <div
                  className="pointer-events-none absolute z-30 rounded-2xl border border-emerald-300/20 bg-[#07140dcc] px-3 py-2 text-xs font-medium tracking-[0.12em] text-cream shadow-[0_16px_32px_rgba(0,0,0,0.28)] backdrop-blur-md"
                  style={{
                    left: tooltip.x,
                    top: tooltip.y,
                    transform: "translate(16px, -50%)",
                  }}
                >
                  {tooltip.name}
                </div>
              ) : null}

              {!isReady ? (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cream/65">
                    Loading Interactive Globe
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="order-1 relative z-10 flex items-center lg:order-2 lg:min-h-[700px] lg:pb-24">
            <div className="relative mx-auto w-full max-w-[30rem] px-2 sm:px-4 lg:max-w-[28rem] lg:px-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,255,136,0.16)_0%,rgba(0,255,136,0.04)_42%,transparent_72%)] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.16)_0%,rgba(255,215,0,0.03)_55%,transparent_78%)] blur-2xl"
              />
              <h2
                className="relative text-[2.15rem] leading-[0.94] text-cream sm:text-[2.8rem] lg:text-[3.6rem]"
                style={{
                  fontFamily:
                    '"Zapfino","Snell Roundhand","Apple Chancery","URW Chancery L","Lucida Calligraphy",cursive',
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  textShadow: "0 10px 30px rgba(0,0,0,0.18)",
                }}
              >
                Rooted in Ghana,
                <span className="mt-2 block text-gold/92">in conversation with the world.</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
