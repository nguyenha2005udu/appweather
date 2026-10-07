import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid, Platform } from "react-native";

import { Coordinates } from "../types/weather";

type LocatedCoordinates = Coordinates & {
  accuracy?: number | null;
};

export const FALLBACK_LOCATION: Coordinates = {
  latitude: 21.0278,
  longitude: 105.8342
};

export async function requestCurrentLocation(): Promise<{
  coordinates: Coordinates;
  locationName: string;
  usedFallback: boolean;
}> {
  const granted = await requestLocationPermission();

  if (!granted) {
    return {
      coordinates: FALLBACK_LOCATION,
      locationName: "Hà Nội, Việt Nam",
      usedFallback: true
    };
  }

  try {
    const coordinates = await getBestCurrentCoordinates();

    return {
      coordinates,
      locationName: await reverseGeocode(coordinates),
      usedFallback: false
    };
  } catch {
    return {
      coordinates: FALLBACK_LOCATION,
      locationName: "Hà Nội, Việt Nam",
      usedFallback: true
    };
  }
}

async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === "ios") {
    return new Promise((resolve) => {
      Geolocation.requestAuthorization(
        () => resolve(true),
        () => resolve(false)
      );
    });
  }

  if (Platform.OS === "android") {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Quyền truy cập vị trí",
        message: "WeatherNow cần vị trí hiện tại để lấy dự báo thời tiết chính xác.",
        buttonPositive: "Cho phép",
        buttonNegative: "Từ chối"
      }
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  return false;
}

function getBestCurrentCoordinates(): Promise<LocatedCoordinates> {
  return new Promise((resolve, reject) => {
    let best: LocatedCoordinates | null = null;
    let finished = false;
    let watchId: number | null = null;

    const finish = (coordinates?: LocatedCoordinates, error?: unknown) => {
      if (finished) {
        return;
      }

      finished = true;

      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }

      if (coordinates) {
        resolve(coordinates);
      } else {
        reject(error);
      }
    };

    const timeout = setTimeout(() => {
      finish(best ?? undefined, new Error("Không lấy được vị trí GPS chính xác."));
    }, 12000);

    watchId = Geolocation.watchPosition(
      (position) => {
        const next = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        if (!best || (next.accuracy ?? Number.MAX_SAFE_INTEGER) < (best.accuracy ?? Number.MAX_SAFE_INTEGER)) {
          best = next;
        }

        if ((next.accuracy ?? Number.MAX_SAFE_INTEGER) <= 100) {
          clearTimeout(timeout);
          finish(next);
        }
      },
      (error) => {
        clearTimeout(timeout);
        finish(best ?? undefined, error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        maximumAge: 0,
        timeout: 12000
      }
    );
  });
}

async function reverseGeocode(coordinates: Coordinates): Promise<string> {
  const params = new URLSearchParams({
    latitude: String(coordinates.latitude),
    longitude: String(coordinates.longitude),
    language: "vi",
    format: "json"
  });

  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Reverse geocoding failed");
    }

    const data = (await response.json()) as {
      results?: Array<{
        name?: string;
        admin1?: string;
        country?: string;
      }>;
    };
    const place = data.results?.[0];
    const parts = [place?.name, place?.admin1, place?.country].filter(Boolean);

    if (parts.length > 0) {
      return parts.join(", ");
    }
  } catch {
    // Coordinates are still enough to fetch accurate weather if geocoding is unavailable.
  }

  return `${coordinates.latitude.toFixed(2)}, ${coordinates.longitude.toFixed(2)}`;
}
