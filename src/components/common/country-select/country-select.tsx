import { getCountries } from "@services/api/countries-api";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SelectComponent from "../select-component/select-component";

type CountrySelectProps = {
  selectedCountry: string;
  onChange: (value: string) => void;
  isErrored?: boolean;
};

function CountrySelect({
  selectedCountry,
  onChange,
  isErrored,
}: CountrySelectProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getCountries().then((res) => {
      const countries = res.data.map(
        (country: { iso2: string; lat: number; long: number; name: string }) =>
          country.name,
      );
      setCountries(countries);
    });
  }, []);

  return (
    <SelectComponent
      items={countries}
      selected={selectedCountry}
      onChange={onChange}
      placeholder={t("activities-page-sidebar.country")}
      isErrored={isErrored}
    />
  );
}

export default CountrySelect;
