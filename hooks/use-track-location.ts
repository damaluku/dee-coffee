import { ACTION_TYPES, useStoreContext } from "@/store/context";
import { useState, useContext } from "react";

const useTrackLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  // const [latlong, setLatlong] = useState("");

  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useStoreContext();

  /*   const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }; */

  const success = (position: any) => {
    const crd = position.coords;

    const latitude = crd.latitude;
    const longitude = crd.longitude;

    // setLatlong(`${latitude},${longitude}`);

    dispatch({
      type: ACTION_TYPES.SET_LATLONG,
      payload: { latlong: `${latitude},${longitude}` },
    });
    setLocationErrorMessage("");

    setIsFindingLocation(false);
  };

  const error = (err: any) => {
    setIsFindingLocation(false);
    setLocationErrorMessage(`ERROR(${err.code}): ${err.message}`);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationErrorMessage("No geolocation available");
      setIsFindingLocation(false);
    } else {
      // setIsFindingLocation(true);

      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {
    // latlong,
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
};

export default useTrackLocation;
