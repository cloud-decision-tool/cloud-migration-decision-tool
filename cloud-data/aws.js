const axios = require("axios");
const HOURS_PER_MONTH = 730;
const SMALL_INSTANCE = "m5d.xlarge";
const MEDIUM_INSTANCE = "m5d.4xlarge";
const LARGE_INSTANCE = "m5d.12xlarge";

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

async function getPricingForComputeEngineAWS(exchangeRate) {
  try {
    const response = await axios.get(
      "https://calculator.aws/pricing/1.0/ec2/region/ap-southeast-2/reserved-instance/windows/index.json"
    );
    const prices = response.data.prices;
    for (var i = 0; i < prices.length; i++) {
      if (
        prices[i].attributes["aws:ec2:instanceType"] === SMALL_INSTANCE &&
        prices[i].attributes["aws:offerTermLeaseLength"] === "1yr" &&
        prices[i].attributes["aws:offerTermOfferingClass"] === "standard" &&
        prices[i].attributes["aws:offerTermPurchaseOption"] === "No Upfront"
      ) {
        var smallWindowsMonthly =
          prices[i].calculatedPrice.onDemandRate.USD *
          HOURS_PER_MONTH *
          exchangeRate;
      }
      if (
        prices[i].attributes["aws:ec2:instanceType"] === MEDIUM_INSTANCE &&
        prices[i].attributes["aws:offerTermLeaseLength"] === "1yr" &&
        prices[i].attributes["aws:offerTermOfferingClass"] === "standard" &&
        prices[i].attributes["aws:offerTermPurchaseOption"] === "No Upfront"
      ) {
        var mediumWindowsMonthly =
          prices[i].calculatedPrice.onDemandRate.USD *
          HOURS_PER_MONTH *
          exchangeRate;
      }
      if (
        prices[i].attributes["aws:ec2:instanceType"] === LARGE_INSTANCE &&
        prices[i].attributes["aws:offerTermLeaseLength"] === "1yr" &&
        prices[i].attributes["aws:offerTermOfferingClass"] === "standard" &&
        prices[i].attributes["aws:offerTermPurchaseOption"] === "No Upfront"
      ) {
        var largeWindowsMonthly =
          prices[i].calculatedPrice.onDemandRate.USD *
          HOURS_PER_MONTH *
          exchangeRate;
      }
    }

    const responseLinux = await axios.get(
      "https://calculator.aws/pricing/1.0/ec2/region/ap-southeast-2/reserved-instance/linux/index.json"
    );
    const linuxPrices = responseLinux.data.prices;
    for (var i = 0; i < linuxPrices.length; i++) {
      if (
        linuxPrices[i].attributes["aws:ec2:instanceType"] === SMALL_INSTANCE &&
        linuxPrices[i].attributes["aws:offerTermLeaseLength"] === "1yr" &&
        linuxPrices[i].attributes["aws:offerTermOfferingClass"] ===
          "standard" &&
        linuxPrices[i].attributes["aws:offerTermPurchaseOption"] ===
          "No Upfront"
      ) {
        var smallLinuxMonthly =
          linuxPrices[i].calculatedPrice.onDemandRate.USD *
          HOURS_PER_MONTH *
          exchangeRate;
      }
      if (
        linuxPrices[i].attributes["aws:ec2:instanceType"] === MEDIUM_INSTANCE &&
        linuxPrices[i].attributes["aws:offerTermLeaseLength"] === "1yr" &&
        linuxPrices[i].attributes["aws:offerTermOfferingClass"] ===
          "standard" &&
        linuxPrices[i].attributes["aws:offerTermPurchaseOption"] ===
          "No Upfront"
      ) {
        var mediumLinuxMonthly =
          linuxPrices[i].calculatedPrice.onDemandRate.USD *
          HOURS_PER_MONTH *
          exchangeRate;
      }
      if (
        linuxPrices[i].attributes["aws:ec2:instanceType"] === LARGE_INSTANCE &&
        linuxPrices[i].attributes["aws:offerTermLeaseLength"] === "1yr" &&
        linuxPrices[i].attributes["aws:offerTermOfferingClass"] ===
          "standard" &&
        linuxPrices[i].attributes["aws:offerTermPurchaseOption"] ===
          "No Upfront"
      ) {
        var largeLinuxMonthly =
          linuxPrices[i].calculatedPrice.onDemandRate.USD *
          HOURS_PER_MONTH *
          exchangeRate;
      }
    }

    const computeEnginePrices = {
      platform: "aws",
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
    return computeEnginePrices;
  } catch (error) {
    console.log(
      "Something has gone wrong while retrieving prices for compute engines aws " +
        error
    );
  }
}

async function getPricingForStorageAWS(exchangeRate) {
  try {
    const response = await axios.get(
      "https://calculator.aws/pricing/1.0/ec2/region/ap-southeast-2/ebs/index.json"
    );
    const price = response.data.prices[2].price.USD * exchangeRate;
    return { pricePerGb: price };
  } catch (error) {
    console.log(
      "Something has gone wrong while retrieving prices for Storage AWS " +
        error
    );
  }
}

async function getAWSData() {
  const exchangeRate = await getExchangeRate();
  const awsComputeEngine = await getPricingForComputeEngineAWS(exchangeRate);
  const awsStorage = await getPricingForStorageAWS(exchangeRate);
  const awsData = {};
  awsData["computeEngine"] = awsComputeEngine;
  awsData["storage"] = awsStorage;
  return awsData;
}

var awsData = {};
getAWSData().then(response => {
  awsData = response;
  console.log(awsData);
});

module.exports = getAWSData;
