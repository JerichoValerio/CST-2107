import { useEffect, useState } from "react";
import CryptoTableComponent from "./CryptoTableComponent";
import { TextField } from "@mui/material";

const CryptoContainerComponent = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCryptoData();
  }, []);

  const getCryptoData = async () => {
    const data = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets/?vs_currency=cad"
    );
    const convertedJSONData = await data.json();
    setCryptoData(convertedJSONData);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCryptoData = cryptoData.filter((cryptoInfo) =>
    cryptoInfo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <CryptoTableComponent data={filteredCryptoData} />
    </div>
  );
};

export default CryptoContainerComponent;
