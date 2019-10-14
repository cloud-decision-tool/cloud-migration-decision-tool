import React from "react";
import CloudResources from "./cloudResources";
import PricingReview from "./pricingReview";
import { sm } from "../../pages/util/util";
import styles from "../../styles/styles";
import { Typography, Row, Col, Button } from "antd";
import axios from "axios";

const { Title } = Typography;

const round = (value, decimals = 2) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

const privateCloudData = {
  windows: {
    selectedValue: {
      small: 6,
      medium: 8,
      large: 4,
      disk: 13,
      operation: 0
    },
    price: {
      small: 0,
      medium: 0,
      large: 0,
      disk: 0,
      operation: 0
    }
  },
  linux: {
    selectedValue: {
      small: 0,
      medium: 0,
      large: 0,
      disk: 0,
      operation: 0
    },
    price: {
      small: 0,
      medium: 0,
      large: 0,
      disk: 0,
      operation: 0
    }
  }
}

export default class CloudReview extends React.Component {
  state = {
    isLoading: true,
    networkError: false,
    pricingData: {
      windows: {
        selectedValue: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        },
        price: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        }
      },
      linux: {
        selectedValue: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        },
        price: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        }
      }
    },
    awsPricingData: {
      windows: {
        selectedValue: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        },
        price: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        }
      },
      linux: {
        selectedValue: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        },
        price: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        }
      }
    }
  };

  async componentDidMount() {
    try {
      console.log("Trying fetch data");
      const response = await axios.get("/azure");
      const awsResponse = await axios.get("/aws");
      this.setState({
        azureCalculateData: response.data,
        awsCalculateData: awsResponse.data,
        isLoading: false
      });
      // calculate the default price here and put it in pricingData and awsPricingData
      const initialData = this.getDefaultValueForAWS(awsResponse.data);
      const azureInitialData = this.getDefaultValueForAzure(response.data);
      this.setState(prevState => ({
        pricingData: {
          ...prevState.pricingData,
          windows: azureInitialData
        },
        awsPricingData: {
          ...prevState.awsPricingData,           
          windows: initialData
        }
      }))
    } catch (error) {
      this.setState({
        isLoading: false,
        networkError: true
      });
    }
  }

  getDefaultValueForAWS = (awsPricingData) => {
    const storagePricePerGb = awsPricingData.storage.pricePerGb;
    
    const storagePrice = storagePricePerGb * 1024;
    const defaultSmallTshirt = {
      small: 6,
      medium: 8,
      large: 4,
      disk: 13,
      operation: 0
    }
    const windowsSmallPrice = round(awsPricingData.computeEngine.windows.small * defaultSmallTshirt.small, 2);
    const windowsMediumPrice = round(awsPricingData.computeEngine.windows.medium * defaultSmallTshirt.medium, 2);
    const windowsLargePrice = round(awsPricingData.computeEngine.windows.large * defaultSmallTshirt.large, 2);
    const diskPrice = round(storagePrice * defaultSmallTshirt.disk, 2);
    const initialData = {
      selectedValue: defaultSmallTshirt,
      price: {
        small: windowsSmallPrice,
        medium: windowsMediumPrice,
        large: windowsLargePrice,
        disk: diskPrice,
        operation: 0
      }
    }

    return initialData;
  }

  getDefaultValueForAzure = azurePricingData => {
    const azureStoragePrice = azurePricingData.storage.smallDiskPrice * 1024;
    const defaultSmallTshirt = {
      small: 6,
      medium: 8,
      large: 4,
      disk: 13,
      operation: 0
    }

    const azureWindowsSmallPrice = round(azurePricingData.computeEngine.windows.small * defaultSmallTshirt.small ,2);
    const azureWindowsMediumPrice = round(azurePricingData.computeEngine.windows.medium * defaultSmallTshirt.medium ,2);
    const azureWindowsLargePrice = round(azurePricingData.computeEngine.windows.large * defaultSmallTshirt.large ,2);

    const azureDiskPrice = round(azureStoragePrice * defaultSmallTshirt.disk, 2);
    const azureInitialData = {
      selectedValue: defaultSmallTshirt,
      price: {
        small: azureWindowsSmallPrice,
        medium: azureWindowsMediumPrice,
        large: azureWindowsLargePrice,
        disk: azureDiskPrice,
        operation: 0
      }
    }
    return azureInitialData;
  }

  onStorageSelected = ({ type, value, os }) => {
    var storagePricePerGb =
      type === "disk"
        ? this.state.azureCalculateData.storage.smallDiskPrice
        : this.state.azureCalculateData.storage.operationPrices;
    var storagePrice = storagePricePerGb * 1024;

    const priceValue = storagePrice * value;
    let newPrice = { ...this.state.pricingData[os].price };
    let newSelected = { ...this.state.pricingData[os].selectedValue };
    newPrice[type] = round(priceValue, 2);
    newSelected[type] = value;

    var awsStoragePricePerGb =
      type === "disk" ? this.state.awsCalculateData.storage.pricePerGb : 0;
    var awsStoragePrice = awsStoragePricePerGb * 1024;

    const awsPriceValue = awsStoragePrice * value;
    let awsNewPrice = { ...this.state.awsPricingData[os].price };
    let awsNewSelected = { ...this.state.awsPricingData[os].selectedValue };
    awsNewPrice[type] = round(awsPriceValue, 2);
    awsNewSelected[type] = value;

    this.setState(prev => {
      let pricingData = JSON.parse(JSON.stringify(prev.pricingData));
      let awsPricingData = JSON.parse(JSON.stringify(prev.awsPricingData));
      const result = {
        selectedValue: newSelected,
        price: newPrice
      };
      const awsResult = {
        selectedValue: awsNewSelected,
        price: awsNewPrice
      };
      pricingData[os] = result;
      awsPricingData[os] = awsResult;
      return { pricingData, awsPricingData };
    });
  };

  onComputeSelected = ({ size, value, os }) => {
    const priceValue =
      this.state.azureCalculateData.computeEngine[os][size] * value;
    let newPrice = { ...this.state.pricingData[os].price };
    let newSelected = { ...this.state.pricingData[os].selectedValue };
    newPrice[size] = round(priceValue, 2);
    newSelected[size] = value;

    const awsPriceValue =
      this.state.awsCalculateData.computeEngine[os][size] * value;
    let awsNewPrice = { ...this.state.awsPricingData[os].price };
    let awsNewSelected = { ...this.state.awsPricingData[os].selectedValue };
    awsNewPrice[size] = round(awsPriceValue, 2);
    awsNewSelected[size] = value;
    this.setState(prev => {
      let pricingData = JSON.parse(JSON.stringify(prev.pricingData));
      let awsPricingData = JSON.parse(JSON.stringify(prev.awsPricingData));
      const result = {
        selectedValue: newSelected,
        price: newPrice
      };
      const awsResult = {
        selectedValue: awsNewSelected,
        price: awsNewPrice
      };
      pricingData[os] = result;
      awsPricingData[os] = awsResult;
      return { pricingData, awsPricingData };
    });
  };

  getInitialInputValue = tier => {
    if (tier === "small") {
      return 6;
    } else if (tier === "medium") {
      return 8;
    } else {
      return 4;
    }
  }

  render() {
    if (this.state.isLoading) {
      return <p>Please wait while we fetch cloud pricing data...</p>;
    }
    if (this.state.networkError) {
      return <p>Something is wrong with the network. Please try again. </p>;
    }
    return (
      <div className="App">
        <Title level={2} style={{ textAlign: "center" }}>
          Choose your cloud resources
        </Title>
        <Row style={{ marginTop: 40 }}>
          <Col span={12}>
            <Title
              level={4}
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              Windows
            </Title>
            <CloudResources
              os="windows"
              //platform
              getInitialInputValue={this.getInitialInputValue}
              onComputeSelected={this.onComputeSelected}
              onStorageSelected={this.onStorageSelected}
            />
          </Col>
          <Col span={12}>
            <Title
              level={4}
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              Linux (Optional)
            </Title>
            <CloudResources
              os="linux"
              getInitialInputValue={this.getInitialInputValue}
              onComputeSelected={this.onComputeSelected}
              onStorageSelected={this.onStorageSelected}
            />
          </Col>
        </Row>

        <PricingReview
          selectedValue={this.state.selectedValue}
          data={this.state.pricingData}
          awsData={this.state.awsPricingData}
          privateCloudData={privateCloudData}
        />

        <Row style={{ marginBottom: 40 }}></Row>
        <Row type="flex" justify="center">
          <Col>
            <Button
              loading={false}
              justify="center"
              style={sm([styles.bggreen, styles.w200])}
              onClick={this.props.onContinueSelected}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
