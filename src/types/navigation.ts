import { WeatherDetail } from "./weather";

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    title: string;
    subtitle: string;
    detail: WeatherDetail;
  };
};
