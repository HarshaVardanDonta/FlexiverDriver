import React, { useState } from "react";
import "./QuotePage.css";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import VehicleComp from "../Components/VehicleComp/VehicleComp";
import Spacer from "../../../Components/MySpacer";
import Logo from "../../../Assets/CustomerPortal/FlexiverWhiteLogo.png";
import { DatePicker, Typography } from "antd";
import { AiOutlineEnvironment } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import CustomTextField from "../../../Components/CustomTextField";
import { Height, Margin, Padding } from "@mui/icons-material";
import { Checkbox, Divider, TextField } from "@mui/material";
import FlightOfStairsComp from "../Components/FlightOfStairsComp/FlightOfStairsComp";
import CustomDropDown from "../Components/CustomDropDown/CustomDropDown";
import Fire from "../../../Assets/CustomerPortal/Fire.png";
import Battery from "../../../Assets/CustomerPortal/Charging Battery.png";
import Chemicals from "../../../Assets/CustomerPortal/Molecule.png";
import Paint from "../../../Assets/CustomerPortal/Paint Brush.png";
import Weapon from "../../../Assets/CustomerPortal/saber weapon.png";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import { useNavigate } from "react-router-dom";
import { Icon } from "leaflet";
import MapComp from "../../../Components/MapComp";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import ImagePreview from "../../../Components/ImagePreview";
import CustomerQuoteModel from "../../../Model/CustomerQuoteModel";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import MySupClient from "../../../SupabaseClient";
import toast from "react-hot-toast";

export default function QuotePage() {
  const [pickUpStairsCount, setPickUpStairsCount] = useState(0);
  const [dropOffStairsCount, setDropOffStairsCount] = useState(0);

  const quote = new CustomerQuoteModel();
  const [quoteDateAndTime, setQuoteDateAndTime] = useState(new Date());
  const [twoWheelerSelected, settwoWheelerSelected] = useState(false);
  const [uteVanSelected, setuteVanSelected] = useState(false);
  const [refrigeratedVanSelected, setrefrigeratedVanSelected] = useState(false);

  const [openCamera, setOpenCamera] = useState(false);
  const [dataUri, setDataUri] = useState("");

  const [supabase] = useState(() => MySupClient());

  const navigate = useNavigate();

  function handlePickUpStairsAdd() {
    if (pickUpStairsCount >= 0) {
      setPickUpStairsCount(pickUpStairsCount + 1);
    }
  }
  function handlePickUpStairsRemove() {
    if (pickUpStairsCount > 0) {
      setPickUpStairsCount(pickUpStairsCount - 1);
    }
  }
  function handleDropOffStairsAdd() {
    if (dropOffStairsCount >= 0) {
      setDropOffStairsCount(dropOffStairsCount + 1);
    }
  }
  function handleDropOffStairsRemove() {
    if (dropOffStairsCount > 0) {
      setDropOffStairsCount(dropOffStairsCount - 1);
    }
  }

  async function handleSubmit() {
    if (noExcludedItems) {
      quote.city = city;
      quote.vehicleType = vehicleType;
      quote.dateAndTime = dateAndTime.getTime();
      quote.pickUpContactName = pickUpContactName;
      quote.pickUpContactNumber = pickUpContactNumber;
      quote.pickUpAddress = pickUpAddress;
      quote.pickUpInstructions = pickUpInstructions;
      quote.pickUpStairs = pickUpStairs;
      quote.dropOffContactName = dropOffContactName;
      quote.dropOffContactNumber = dropOffContactNumber;
      quote.dropOffAddress = dropOffAddress;
      quote.dropOffInstructions = dropOffInstructions;
      quote.dropOffStairs = dropOffStairs;
      quote.noOfItems = noOfItems;
      quote.approxWeight = approxWeight;
      quote.noOfHaulers = noOfHaulers;
      quote.parkingSpaceAvailable = parkingSpaceAvailable;
      quote.itemNote = itemSpecs;
      quote.alternateContactName = alternateContactName;
      quote.alternateContactNumber = alternateContactNumber;
      quote.imageUrl = dataUri;
      console.log(quote);
      navigate("/billingPage", { state: { quote } });

      // supabase.auth
      //   .getSession()
      //   .then(async (session) => {
      //     if (session.data.session) {
      //       console.log("User logged in successfully");
      // const data = await supabase.from("CustomerQuote").insert(quote.toJson());

      // console.log(data);
      // if (data.status === 201) {
      // console.log(data);
      // toast.success("Quote added successfully");

      // } else {
      // console.log("Error");
      // toast.error("Quote added failed");
      // }
      //   } else {
      //     console.log("Error");
      //   }
      // })
      // .catch((error) => {});
    } else {
      return;
    }
  }

  const LocationIcon = new Icon({
    iconUrl: mark,
    iconSize: [30, 30], // size of the icon
  });

  const PinIcon = new Icon({
    iconUrl: pin,
    iconSize: [30, 30], // size of the icon
  });

  const handleTakePhotoAnimationDone = (dataUri: any) => {
    console.log("Take Photo");
    console.log(dataUri);
    setDataUri(dataUri);
  };

  const [city, setCity] = useState("Sydney");
  const [vehicleType, setVehicleType] = useState("");
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [pickUpContactName, setPickUpContactName] = useState("");
  const [pickUpContactNumber, setPickUpContactNumber] = useState("");
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [pickUpInstructions, setPickUpInstructions] = useState("");
  const [pickUpStairs, setPickUpStairs] = useState(0);
  const [dropOffContactName, setDropOffContactName] = useState("");
  const [dropOffContactNumber, setDropOffContactNumber] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [dropOffInstructions, setDropOffInstructions] = useState("");
  const [dropOffStairs, setDropOffStairs] = useState(0);
  const [noOfItems, setNoOfItems] = useState(0);
  const [approxWeight, setApproxWeight] = useState(0);
  const [noOfHaulers, setNoOfHaulers] = useState(0);
  const [parkingSpaceAvailable, setParkingSpaceAvailable] = useState(false);
  const [itemSpecs, setItemSpecs] = useState("");
  const [alternateContactName, setAlternateContactName] = useState("");
  const [alternateContactNumber, setAlternateContactNumber] = useState("");
  const [noExcludedItems, setNoExcludedItems] = useState(false);

  if (openCamera) {
    return (
      <div>
        {dataUri ? (
          <>
            <ImagePreview dataUri={dataUri} isFullscreen={true} />
            <button onClick={() => setOpenCamera(false)}>back</button>
          </>
        ) : (
          <Camera
            onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
            isFullscreen={true}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <CustomerPortalHeader />
      <div className="customerQuotePage">
        <Typography.Title
          level={2}
          style={{
            textAlign: "center",
          }}
        >
          Let's plan your move!
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{
            textAlign: "center",
          }}
        >
          Select vehicle type
        </Typography.Title>
        <Typography.Title level={4}>
          <AiOutlineEnvironment /> City
        </Typography.Title>
        <div className="vehicleBanner">
          <VehicleComp
            vehicleName={"Two Wheeler"}
            vehicleImage={Logo}
            vehicleDescription={"Can Carry upto 5Kg and 3ftx3ftx3ft package"}
            onClick={() => {
              settwoWheelerSelected(true);
              setuteVanSelected(false);
              setrefrigeratedVanSelected(false);
              setVehicleType("Two Wheeler");
            }}
            selected={twoWheelerSelected}
          />
          <VehicleComp
            vehicleName={"UTE / Van"}
            vehicleImage={Logo}
            vehicleDescription={"Can Carry upto 5Kg and 3ftx3ftx3ft package"}
            onClick={() => {
              setuteVanSelected(true);
              settwoWheelerSelected(false);
              setrefrigeratedVanSelected(false);
              setVehicleType("UTE / Van");
            }}
            selected={uteVanSelected}
          />
          <VehicleComp
            vehicleName={"Refreigerated Van"}
            vehicleImage={Logo}
            vehicleDescription={"Can Carry upto 5Kg and 3ftx3ftx3ft package"}
            onClick={() => {
              setrefrigeratedVanSelected(true);
              settwoWheelerSelected(false);
              setuteVanSelected(false);
              setVehicleType("Refreigerated Van");
            }}
            selected={refrigeratedVanSelected}
          />
          <div className="getQuoteButton">
            Get an Instant
            <br />
            Quote Now!
            <br />
            <br /> →
          </div>
        </div>
        <div className="dateSelectionSection">
          <Typography.Title
            level={4}
            style={{
              textAlign: "center",
            }}
          >
            Choose a Date and Time:
          </Typography.Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              onChange={(newDate: any) => {
                setQuoteDateAndTime(newDate!.toDate());
              }}
              sx={{
                backgroundColor: "#FFECC0",
                borderRadius: "15px",
              }}
              label="Select Date And Time"
            />
          </LocalizationProvider>
        </div>
        <div className="pickupAndDropSectionBanner">
          <div className="pickupSection">
            <h3>Pickup Details</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "89%",
              }}
            >
              <CustomTextField
                placeHolder={"Contact Name"}
                onChanged={(e) => {
                  setPickUpContactName(e.target.value);
                }}
                style={{
                  backgroundColor: "#FFECC0",
                  width: "85%",
                  border: "none",
                }}
              />
              <Spacer width={20} />
              <CustomTextField
                placeHolder={"Contact Number"}
                onChanged={(e) => {
                  setPickUpContactNumber(e.target.value);
                }}
                style={{
                  backgroundColor: "#FFECC0",
                  width: "85%",
                  border: "none",
                }}
              />
            </div>
            <CustomTextField
              placeHolder={"From Adddress"}
              onChanged={(e) => {
                setPickUpAddress(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "85%",
                border: "none",
              }}
            />
            <CustomTextField
              placeHolder={"Instructions for Partner"}
              onChanged={(e) => {
                setPickUpInstructions(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "85%",
                border: "none",
              }}
            />
            <FlightOfStairsComp
              onAdd={handlePickUpStairsAdd}
              onRemove={handlePickUpStairsRemove}
              count={pickUpStairsCount}
            />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="pickupSection">
            <h3>DropOff Details</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "89%",
              }}
            >
              <CustomTextField
                placeHolder={"Contact Name"}
                onChanged={(e) => {
                  setDropOffContactName(e.target.value);
                }}
                style={{
                  backgroundColor: "#FFECC0",
                  width: "85%",
                  border: "none",
                }}
              />
              <Spacer width={20} />
              <CustomTextField
                placeHolder={"Contact Number"}
                onChanged={(e) => {
                  setDropOffContactNumber(e.target.value);
                }}
                style={{
                  backgroundColor: "#FFECC0",
                  width: "85%",
                  border: "none",
                }}
              />
            </div>
            <CustomTextField
              placeHolder={"To Address"}
              onChanged={(e) => {
                setDropOffAddress(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "85%",
                border: "none",
              }}
            />
            <CustomTextField
              placeHolder={"Instructions for Partner"}
              onChanged={(e) => {
                setDropOffInstructions(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "85%",
                border: "none",
              }}
            />
            <FlightOfStairsComp
              onAdd={handleDropOffStairsAdd}
              onRemove={handleDropOffStairsRemove}
              count={dropOffStairsCount}
            />
          </div>
        </div>
      </div>
      <div className="quoteItemSpecSection">
        <div className="quoteItemSpecSectionMapSection">
          <MapComp
            positionWithIconsArray={[
              {
                lat: 51.511,
                lng: -0.09,
                marker: LocationIcon,
                popup: "",
              },
              { lat: 51.495, lng: -0.055, marker: PinIcon, popup: "POP-UP" },
            ]}
          />
        </div>
        <div className="quoteItemSpecSectionRightSection">
          <Typography.Title level={4}>
            Provide Item Specifications
          </Typography.Title>
          <div className="quoteItemSpecSectionRightSectionEntrycontainer">
            <div className="quoteItemSpecSectionRightSectionText">
              Enter Number of Items
            </div>
            <CustomTextField
              placeHolder={"How many items"}
              onChanged={(e) => {
                setNoOfItems(parseInt(e.target.value));
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "40%",
                border: "none",
              }}
            />
          </div>
          <div className="quoteItemSpecSectionRightSectionEntrycontainer">
            <div className="quoteItemSpecSectionRightSectionText">
              Enter Approx Weight
            </div>
            <CustomTextField
              placeHolder={"Maximum for selected Vehicle"}
              onChanged={(e) => {
                setApproxWeight(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "40%",
                border: "none",
              }}
            />
          </div>
          <div className="quoteItemSpecSectionRightSectionEntrycontainer">
            <div className="quoteItemSpecSectionRightSectionText">
              No. of Haulers
            </div>
            <CustomTextField
              placeHolder={"Maximum 2 Haulers"}
              onChanged={(e) => {
                setNoOfHaulers(parseInt(e.target.value));
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "40%",
                border: "none",
              }}
            />
          </div>
          <div className="quoteItemSpecSectionRightSectionEntrycontainer">
            <div className="quoteItemSpecSectionRightSectionText">
              Parking Space Available?
            </div>
            <div
              style={{
                width: "43%",
              }}
            >
              <CustomDropDown
                label={"Select an Option"}
                options={["Yes", "No"]}
                selectedOption={"Select"}
                onOptionChange={(option) => {
                  if (option === "Yes") {
                    setParkingSpaceAvailable(true);
                  }
                  if (option === "No") {
                    setParkingSpaceAvailable(false);
                  }
                }}
                buttonId={"parkingSpaceAvailableDropButton"}
                menuId={"parkingSpaceAvailableMenu"}
                style={{
                  backgroundColor: "#FFECC0",
                  borderRadius: 15,
                  padding: 10,
                  width: "100%",
                }}
                textStyle={{
                  fontWeight: "600",
                  color: "#4A4A4A",
                  textAlign: "start",
                }}
              />
            </div>
          </div>
          <div className="quoteItemSpecSectionRightSectionEntrycontainer">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: "#FFECC0",
                padding: "10px",
                borderRadius: "15px",
                width: "40%",
                justifyContent: "center",
                color: "#4A4A4A",
                cursor: "pointer",
              }}
              onClick={() => setOpenCamera(!openCamera)}
            >
              Take a Picture!
            </div>
          </div>
        </div>
      </div>
      <div className="customerQuotePage">
        <div
          style={{
            fontSize: "24px",
          }}
        >
          Please provide details regarding the type of package you intend to
          send, including dimensions, weight, and any other relevant
          specifications or instructions?
        </div>
        <TextField
          sx={{
            backgroundColor: "#FFECC0",
            borderRadius: "15px",
            padding: "10px",
            height: "100px",
          }}
          multiline={true}
          maxRows={4}
          InputProps={{
            disableUnderline: true,
          }}
          variant="standard"
          placeholder="for example: a 10x10 Sofa"
          onChange={(e) => {
            setItemSpecs(e.target.value);
          }}
        />
        <div
          style={{
            fontSize: "24px",
          }}
        >
          Alternate Contact Information
        </div>
        <div className="alternateContactContainer">
          <CustomTextField
            placeHolder={"Receivers Name"}
            onChanged={(e) => {
              setAlternateContactName(e.target.value);
            }}
            style={{
              backgroundColor: "#FFECC0",
              width: "45%",
              border: "none",
            }}
          />
          <CustomTextField
            placeHolder={"Receivers Contact"}
            onChanged={(e) => {
              setAlternateContactNumber(e.target.value);
            }}
            style={{
              backgroundColor: "#FFECC0",
              width: "45%",
              border: "none",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Excluded Items
        </div>
        <div className="mainExcludedItemContainer">
          <div className="excludedItemContainer">
            <img src={Fire} alt="Fire" />
            <div>Fire</div>
          </div>
          <div className="excludedItemContainer">
            <img src={Battery} alt="Battery" />
            <div>Battery</div>
          </div>
          <div className="excludedItemContainer">
            <img src={Chemicals} alt="Chemicals" />
            <div>Chemicals</div>
          </div>
          <div className="excludedItemContainer">
            <img src={Paint} alt="Paint" />
            <div>Paint</div>
          </div>
          <div className="excludedItemContainer">
            <img src={Weapon} alt="Weapon" />
            <div>Weapon</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          No Excluded Items
          <Checkbox
            value={noExcludedItems}
            onChange={(e) => {
              setNoExcludedItems(e.target.checked);
            }}
            style={{
              color: "#FFD700",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "#FFECC0",
            padding: "10px",
            borderRadius: "15px",
            width: "20%",
            height: "30px",
            justifyContent: "center",
            color: "#4A4A4A",
            cursor: "pointer",
          }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </div>
      </div>
      <CustomerPortalFooter />
    </div>
  );
}
