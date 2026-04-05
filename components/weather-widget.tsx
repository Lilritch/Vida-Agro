"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Loader2,
  MoonStar,
  Sun,
} from "lucide-react";

type WeatherState =
  | { status: "loading" }
  | {
      status: "ready";
      temperature: number;
      weatherCode: number;
      isDay: boolean;
      observedAt: string;
    }
  | { status: "error" };

type WeatherPresentation = {
  label: string;
  Icon: LucideIcon;
};

const kumasiCoordinates = {
  latitude: "6.6885",
  longitude: "-1.6244",
};

function getWeatherPresentation(
  weatherCode: number,
  isDay: boolean,
): WeatherPresentation {
  if (weatherCode === 0) {
    return { label: isDay ? "Clear skies" : "Clear night", Icon: isDay ? Sun : MoonStar };
  }

  if (weatherCode === 1 || weatherCode === 2) {
    return {
      label: weatherCode === 1 ? "Mostly clear" : "Partly cloudy",
      Icon: isDay ? CloudSun : CloudMoon,
    };
  }

  if (weatherCode === 3) {
    return { label: "Overcast", Icon: Cloud };
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return { label: "Foggy", Icon: CloudFog };
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return { label: "Light drizzle", Icon: CloudDrizzle };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return { label: "Rainy", Icon: CloudRain };
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return { label: "Snow showers", Icon: CloudSnow };
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return { label: "Thunderstorm", Icon: CloudLightning };
  }

  return { label: "Cloudy", Icon: Cloud };
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    const loadWeather = async () => {
      try {
        const params = new URLSearchParams({
          latitude: kumasiCoordinates.latitude,
          longitude: kumasiCoordinates.longitude,
          current: "temperature_2m,weather_code,is_day",
          timezone: "Africa/Accra",
          forecast_days: "1",
        });

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const payload = (await response.json()) as {
          current?: {
            temperature_2m?: number;
            weather_code?: number;
            is_day?: number;
            time?: string;
          };
        };

        if (
          typeof payload.current?.temperature_2m !== "number" ||
          typeof payload.current.weather_code !== "number" ||
          typeof payload.current.is_day !== "number" ||
          typeof payload.current.time !== "string"
        ) {
          throw new Error("Unexpected weather payload");
        }

        setWeather({
          status: "ready",
          temperature: payload.current.temperature_2m,
          weatherCode: payload.current.weather_code,
          isDay: payload.current.is_day === 1,
          observedAt: payload.current.time,
        });
      } catch {
        if (!controller.signal.aborted) {
          setWeather({ status: "error" });
        }
      }
    };

    loadWeather();

    return () => controller.abort();
  }, []);

  let temperatureLabel = "--";
  let conditionLabel = "Loading conditions";
  let metaLabel = "Updating on page load";
  let Icon: LucideIcon = Loader2;

  if (weather.status === "ready") {
    const presentation = getWeatherPresentation(weather.weatherCode, weather.isDay);
    const timeLabel = weather.observedAt.split("T")[1]?.slice(0, 5) ?? "now";

    temperatureLabel = `${Math.round(weather.temperature)}${String.fromCharCode(176)}C`;
    conditionLabel = presentation.label;
    metaLabel = `Observed ${timeLabel} GMT`;
    Icon = presentation.Icon;
  }

  if (weather.status === "error") {
    conditionLabel = "Weather unavailable";
    metaLabel = "Open-Meteo could not be reached";
    Icon = AlertCircle;
  }

  return (
    <div className="w-full max-w-[17.5rem] rounded-[24px] border border-white/18 bg-white/12 p-4 text-cream shadow-[0_18px_42px_rgba(13,31,20,0.2)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/70">
            Kumasi Weather
          </div>
          <div className="mt-2 text-2xl font-black tracking-tight sm:text-[1.9rem]">
            {temperatureLabel}
          </div>
          <p className="mt-1 text-xs text-cream/85 sm:text-sm">{conditionLabel}</p>
        </div>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cream/12 text-gold">
          <Icon
            className={`h-5 w-5 ${weather.status === "loading" ? "animate-spin" : ""}`}
          />
        </div>
      </div>

      <div className="mt-4 space-y-1 border-t border-white/12 pt-3 text-[11px] text-cream/70">
        <div>Current in Kumasi, Ghana</div>
        <div>{metaLabel}</div>
      </div>
    </div>
  );
}
