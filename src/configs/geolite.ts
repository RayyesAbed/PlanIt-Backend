import { Reader, ReaderModel } from "@maxmind/geoip2-node";

let geoReader: ReaderModel;

export const initGeoLite = async () => {
  geoReader = await Reader.open("src/resources/geoip/GeoLite2-Country.mmdb");
};

export const getReader = (): ReaderModel => {
  if (!geoReader) throw new Error("GeoLite Reader is not initialized");

  return geoReader;
};
