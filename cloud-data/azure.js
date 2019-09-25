const axios = require("axios");
const HOURS_PER_MONTH = 730;

async function getExchangeRate() {
  try {
    const response = await axios.get(
      "https://api.exchangeratesapi.io/latest?base=USD&symbols=AUD"
    );
    const exchangeRate = response.data["rates"]["AUD"];
    console.log(exchangeRate);
    return exchangeRate;
  } catch (error) {
    console.log("Something has gone wrong while retrieving exchange rate");
  }
}

async function getPricingForComputeEngineAzure(exchangeRate) {
  try {
    const response = await axios.get(
      "https://azure.microsoft.com/api/v3/pricing/virtual-machines/calculator/?culture=en-us&discount=mosp&v=20190910-1131-88025"
    );
    const smallWindows = response.data["offers"]["windows-d4v3-standard"];
    const smallWindowsMonthly =
      smallWindows["prices"]["perhour"]["australia-southeast"]["value"] *
      exchangeRate *
      HOURS_PER_MONTH;
    const mediumWindows = response.data["offers"]["windows-d16v3-standard"];
    const mediumWindowsMonthly =
      mediumWindows["prices"]["perhour"]["australia-southeast"]["value"] *
      exchangeRate *
      HOURS_PER_MONTH;
    const largeWindows = response.data["offers"]["windows-d48v3-standard"];
    const largeWindowsMonthly =
      largeWindows["prices"]["perhour"]["australia-southeast"]["value"] *
      exchangeRate *
      HOURS_PER_MONTH;
    const smallLinux = response.data["offers"]["linux-d4v3-standard"];
    const smallLinuxMonthly =
      smallLinux["prices"]["perhour"]["australia-southeast"]["value"] *
      exchangeRate *
      HOURS_PER_MONTH;
    const mediumLinux = response.data["offers"]["linux-d16v3-standard"];
    const mediumLinuxMonthly =
      mediumLinux["prices"]["perhour"]["australia-southeast"]["value"] *
      exchangeRate *
      HOURS_PER_MONTH;
    const largeLinux = response.data["offers"]["linux-d48v3-standard"];
    const largeLinuxMonthly =
      largeLinux["prices"]["perhour"]["australia-southeast"]["value"] *
      exchangeRate *
      HOURS_PER_MONTH;
    const azurePrices = {
      platform: "azure",
      windows: {
        small: smallWindowsMonthly,
        medium: mediumWindowsMonthly,
        large: largeWindowsMonthly
      },
      linux: {
        small: smallLinuxMonthly,
        medium: mediumLinuxMonthly,
        large: largeLinuxMonthly
      }
    };
    return azurePrices;
  } catch (error) {
    console.log(
      "Something has gone wrong while retrieving compute engine pricing for Azure"
    );
  }
}

async function getPricingForStorageAzure(exchangeRate) {
  try {
    const response = await axios.get(
      "https://azure.microsoft.com/api/v2/pricing/managed-disks/calculator/?culture=en-us&discount=mosp&v=20190910-1131-88025"
    );
    const operationPrices =
      response.data["offers"]["transactions-ssd"]["prices"][
        "australia-southeast"
      ]["value"] * exchangeRate;
    const smallDiskPrice =
      (response.data["offers"]["standardssd-e30"]["prices"][
        "australia-southeast"
      ]["value"] /
        1024) *
      exchangeRate;
    const storagePrice = {
      operationPrices: operationPrices,
      smallDiskPrice: smallDiskPrice
    };
    return storagePrice;
  } catch (error) {
    console.log(
      "Something has gone wrong while retrieving storage pricing for Azure" +
        error
    );
  }
}

async function getAzureData() {
  const exchangeRate = await getExchangeRate();
  const azurePrices = await getPricingForComputeEngineAzure(exchangeRate);
  const storagePrices = await getPricingForStorageAzure(exchangeRate);
  const azureData = {};
  azureData["computeEngine"] = azurePrices;
  azureData["storage"] = storagePrices;
  return azureData;
}

var azureData = {};
getAzureData().then(response => {
  azureData = response;
  console.log(azureData);
});

module.exports = getAzureData;
