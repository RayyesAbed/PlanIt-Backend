import { getAllInfoByISO } from "iso-country-currency";
import { getReader } from "../configs/geolite";

export const getCountryFromIP = (ipAddress: string) => {
  try {
    const reader = getReader();
    const response = reader.country(ipAddress);

    return response?.country?.isoCode || null;
  } catch (error) {
    console.error("GeoLite lookup failed", error);
    return null;
  }
};

export const getCurrencyFromIP = (ipAddress: string) => {
  const countryISO = getCountryFromIP(ipAddress) || "US";
  const currencySymbol = getAllInfoByISO(countryISO).symbol;

  return currencySymbol;
};
