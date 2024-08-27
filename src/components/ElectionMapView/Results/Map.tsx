// on click and selcting form dropdown map update

import DeckGL from "@deck.gl/react";

import { useState, useRef, useEffect } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoJsonLayer } from "@deck.gl/layers";

import {
  DEFAULT_DISTRICT_LINE_COLOR_GENERAL,
  DEFAULT_STATE_LINE_COLOR,
  TRANSPARENT_COLOR,
  PARTY_ALLIANCE_COLORS,
  MAP_TRANSPARENT_NA_COLOR,
  STATE_COORDINATES_2 as STATE_COORDINATES,
} from "@/utils/constants";
import { useFilterContextValue } from "@/context/MapViewFilterContext";
import hexRgb from "hex-rgb";
import Loading from "../Loading";
export default function Map() {
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 700;

  const mapRef = useRef<any>(null);

  const tooltipRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const [viewport, setViewport] = useState({
    longitude: windowWidth < 640 ? 78.9629 : 78.9629 + 1,
    latitude: windowWidth < 640 ? 20.5937 : 20.5937 - 5,
    zoom: windowWidth < 640 ? 3 : 3.5,
  });
  const [layers, setLayers] = useState([]);

  const {
    select_sabha,

    select_state,
    setSelect_state,
    select_constituency,
    setSelect_constituency,

    select_election_year,
    stateGeojson: StateGeojson,
    assemblyConstituenciesGeojson: ACGeojson,
    parliamentaryConstituenciesGeojson: PCGeojson,
  } = useFilterContextValue();

  const [mapResult, setMapResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (select_state === "Select State") {
      setViewport(
        isRendering1
          ? {
              longitude: windowWidth < 640 ? 78.9629 : 78.9629 + 1,
              latitude: windowWidth < 640 ? 20.5937 : 20.5937 - 5,
              zoom: windowWidth < 640 ? 3 : 3.5,
            }
          : {
              longitude: windowWidth < 640 ? 78.9629 : 78.9629 + 1,
              latitude: windowWidth < 640 ? 20.5937 : 20.5937 - 5,
              zoom: windowWidth < 640 ? 3 : 3.5000001,
            }
      );
      setIsRendering1((p) => !p);
    } else if (select_state !== "Select State") {
      const stateCoordinates = STATE_COORDINATES.find(
        (row) => row.state.toUpperCase() === select_state.toUpperCase()
      );

      console.log("stateCoordinates", stateCoordinates);
      if (!stateCoordinates) return;
      setViewport(
        isRendering2
          ? {
              latitude: stateCoordinates.latitude - 0.1,
              longitude: stateCoordinates.longitude,
              zoom:
                windowWidth < 800
                  ? stateCoordinates.zoom
                  : stateCoordinates.zoom * 0.82 + 1,
            }
          : {
              latitude: stateCoordinates.latitude - 0.1,
              longitude: stateCoordinates.longitude,
              zoom:
                windowWidth < 800
                  ? stateCoordinates.zoom + 0.000001
                  : stateCoordinates.zoom * 0.82 + 1.2,
            }
      );

      setIsRendering2((p) => !p);
    }
  }, [select_state]);

  useEffect(() => {
    if (
      select_sabha === "Lok Sabha"
        ? select_constituency.pcNo !== -1
        : select_constituency.acNo !== -1
    ) {
      const stateCoordinates = STATE_COORDINATES.find(
        (row) => row.state.toUpperCase() === select_state.toUpperCase()
      );

      if (!stateCoordinates) return;

      setViewport(
        isRendering2
          ? {
              latitude: stateCoordinates.latitude,
              longitude: stateCoordinates.longitude,
              zoom:
                windowWidth < 800
                  ? stateCoordinates.zoom
                  : stateCoordinates.zoom * 0.82 + 1,
            }
          : {
              latitude: stateCoordinates.latitude,
              longitude: stateCoordinates.longitude,
              zoom:
                windowWidth < 800
                  ? stateCoordinates.zoom + 0.000001
                  : stateCoordinates.zoom * 0.82 + 1,
            }
      );

      setIsRendering2((p) => !p);
    }
  }, [select_constituency]);
  useEffect(() => {
    const getMapResult = async () => {
      try {
        const stateParams =
          select_state !== "Select State"
            ? `&state=${encodeURIComponent(select_state)}`
            : "";
        const res = await fetch(
          `https://dhruvresearch.com/api/v2/result/map?election_type=${
            select_sabha === "Vidhan Sabha" ? "VS" : "LS"
          }${stateParams}${
            select_election_year !== "Select Election year"
              ? `&year=${select_election_year}`
              : ""
          }`
        );

        const d = await res.json();

        console.log("mapResult", d);

        setMapResult(d.data);

        select_sabha === "Vidhan Sabha"
          ? setSelect_state(Object.keys(d.data)[0])
          : null;
        setLoading(false);
      } catch (error) {
        console.log("error in fetch map election result", error);
      }
    };
    setLoading(true);
    getMapResult();
  }, [select_sabha, select_state, select_election_year]);

  useEffect(() => {
    if (!loading && mapResult !== null) {
      let layers = [];

      if (select_sabha === "Lok Sabha") {
        layers = [
          new GeoJsonLayer({
            id: "geojson-layer-1", //@ts-ignore
            data: PCGeojson,
            stroked: true,
            filled: true,
            pickable: true,
            lineWidthScale: 200,
            //@ts-ignore
            getFillColor: (d) => _fillGeoJsonColor(d), //@ts-ignore
            getLineColor: DEFAULT_DISTRICT_LINE_COLOR_GENERAL,
            getLineWidth: 10, //@ts-ignore
            onClick:
              select_constituency.pcNo === -1 && windowWidth > 640
                ? ({ object }: any) => _handleMap(object)
                : null,

            updateTriggers: {
              getFillColor: [mapResult, select_constituency], // Trigger update when filter changes
            },
            // transitions: {
            //   getFillColor: {
            //     duration: 5000,
            //     easing: (t: any) => t,
            //   },
            // },
          }),
          new GeoJsonLayer({
            id: "state-geojson-layer-1", //@ts-ignore
            data: StateGeojson,
            stroked: true,
            filled: false,
            lineWidthScale: 600, //@ts-ignore
            getLineColor: DEFAULT_STATE_LINE_COLOR, //@ts-ignore
            getFillColor: TRANSPARENT_COLOR,
            getLineWidth: 4,
          }),
        ];
      } else {
        layers = [
          // only for assembly
          new GeoJsonLayer({
            id: "geojson-layer-2", //@ts-ignore
            data: ACGeojson,
            stroked: true,
            filled: true,
            pickable: true,
            lineWidthScale: 110,
            //@ts-ignore
            getFillColor: (d) => _fillGeoJsonColor(d), //@ts-ignore
            getLineColor: (d) => fillDefaultLineColor(d), //DEFAULT_DISTRICT_LINE_COLOR_GENERAL, //@ts-ignore
            getLineWidth: select_state === "NCT OF Delhi" ? 2 : 10, //@ts-ignore
            //@ts-ignore
            onClick:
              select_constituency.acNo === -1 && windowWidth > 640
                ? ({ object }: any) => _handleMap(object)
                : null,
            updateTriggers: {
              getFillColor: [mapResult, select_constituency], // Trigger update when filter changes
              getLineColor: [mapResult, select_constituency],
              getLineWidth: [select_state],
            },
            // transitions: {
            //   getFillColor: {
            //     duration: 5000,
            //     easing: (t: any) => t,
            //   },
            // },
          }),
          // only for state
          new GeoJsonLayer({
            id: "state-geojson-layer-2", //@ts-ignore
            data: StateGeojson,
            stroked: true,
            filled: false,
            lineWidthScale: 600, //@ts-ignore
            getLineColor: TRANSPARENT_COLOR, //DEFAULT_STATE_LINE_COLOR, //@ts-ignore
            getFillColor: [0, 0, 0, 0],
            getLineWidth: 4,
          }),
        ];
      }

      if (tooltipRef.current) {
        tooltipRef.current.style.display = "none";
        tooltipRef.current.innerHTML = "";
      }
      //@ts-ignore
      setLayers(layers);
    }
  }, [PCGeojson, ACGeojson, StateGeojson, mapResult, select_constituency]);

  function fillDefaultLineColor(d: any) {
    if (
      select_state === "Andhra Pradesh [Before 2014]" &&
      d.properties.ST_NAME.toUpperCase() === "Andhra Pradesh".toUpperCase()
    ) {
      return [0, 0, 0];
    }
    if (d.properties.ST_NAME.toUpperCase() === select_state.toUpperCase()) {
      return [0, 0, 0];
    } else {
      return [0, 0, 0, 0];
    }
  }
  function _handleMap(object: any) {
    const stateName = object.properties.ST_NAME;

    if (select_sabha === "Lok Sabha") {
      if (select_state === "Select State") {
        setSelect_state(stateName);
      } else if (select_constituency.pcNo === -1) {
        if (stateName.toUpperCase() === select_state.toUpperCase()) {
          setSelect_constituency({
            pcNo: object.properties.PC_NO,
            pcName: object.properties.PC_NAME,
          });
        }
      }
    } else {
      if (select_state === "Select State") {
        setSelect_state(stateName);
      } else if (select_constituency.acNo === -1) {
        if (stateName.toUpperCase() === select_state.toUpperCase()) {
          const constit =
            mapResult[object.properties.ST_NAME][object.properties.AC_NO];
          setSelect_constituency({
            acNo: object.properties.AC_NO,
            acName: constit.acName,
          });
        }
      }
    }
  }
  const _fillGeoJsonColor = (d: any) => {
    let obj = null,
      stateName = select_state;

    // For PC
    if (select_sabha === "Lok Sabha") {
      if (
        mapResult &&
        mapResult[d.properties.ST_NAME] &&
        mapResult[d.properties.ST_NAME][d.properties.PC_NO]
      ) {
        // for single state selection only fill color
        if (
          stateName !== "Select State" &&
          stateName.toUpperCase() !== d.properties.ST_NAME.toUpperCase()
        ) {
          // obj = null;
        } else {
          if (
            select_constituency.pcNo !== -1 &&
            mapResult[d.properties.ST_NAME][d.properties.PC_NO].pcNo !==
              select_constituency.pcNo
          ) {
            obj = null;
          } else {
            obj = mapResult[d.properties.ST_NAME][d.properties.PC_NO];
          }
        }
      }
    }
    // For AC
    else {
      if (
        mapResult &&
        mapResult[d.properties.ST_NAME] &&
        mapResult[d.properties.ST_NAME][d.properties.AC_NO]
      ) {
        // for single state selection only fill color
        if (
          stateName !== "Select State" &&
          stateName.toUpperCase() !== d.properties.ST_NAME.toUpperCase()
        ) {
          // obj = null;
        } else {
          if (
            select_constituency.acNo !== -1 &&
            mapResult[d.properties.ST_NAME][d.properties.AC_NO]?.acNo !==
              select_constituency.acNo
          ) {
            obj = null;
          } else {
            obj = mapResult[d.properties.ST_NAME][d.properties.AC_NO];
          }
        }
      }
    }

    // console.log("obj", obj, d.properties.PC_NAME);
    let rgba = [];
    if (obj) {
      let party = "",
        maxVotes = -1;
      for (let p in obj.voteShare) {
        if (!obj.voteShare[p] || obj.voteShare[p] > maxVotes) {
          if (obj.voteShare[p]) {
            maxVotes = obj.voteShare[p];
          }
          party = p;
        }
      }
      if (d.properties.PC_NAME === "Maval") {
        //@ts-ignore
        console.log(party, d.properties.PC_NO);
      }

      //@ts-ignore

      if (PARTY_ALLIANCE_COLORS[party]) {
        //@ts-ignore
        rgba = hexRgb(PARTY_ALLIANCE_COLORS[party], {
          format: "array",
          alpha: 255,
        });
      } else rgba = [128, 128, 128];
      // MAP_TRANSPARENT_NA_COLOR.red,
      // MAP_TRANSPARENT_NA_COLOR.green,
      // MAP_TRANSPARENT_NA_COLOR.blue,
      // MAP_TRANSPARENT_NA_COLOR.alpha,
    } else {
      rgba = [255, 255, 255, 0];
    }

    return rgba;
  };

  const _getTooltip = ({ object, x, y }: any) => {
    // console.log("hover", object);
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
      tooltipRef.current.innerHTML = "";
    }

    const tooltip = tooltipRef.current;
    if (!object && !tooltip) {
      tooltip.style.display = "none";
      return null;
    }

    // Set tooltip position
    let tooltipWidth = 350;
    let tooltipHeight = 300;
    const margin = 10;

    if (windowWidth < 640) {
      x = 20;
      y -= tooltipHeight - 20;
    } else {
      // Adjust for screen boundaries
      if (x + tooltipWidth > containerRef.current.clientWidth) {
        x -= tooltipWidth - margin; // + tooltipWidth;
      } else {
        x += margin;
      }

      // Adjust y to place the cursor at the top-center of the tooltip
      y += margin;
      if (y + tooltipHeight > containerRef.current.clientHeight) {
        y = y - tooltipHeight - margin; //tooltipHeight / 2;
      }
    }
    if (object && mapResult) {
      if (select_sabha === "Lok Sabha") {
        let results = null,
          stateName = select_state;
        if (
          mapResult[object.properties.ST_NAME] &&
          mapResult[object.properties.ST_NAME][object.properties.PC_NO]
        ) {
          if (
            stateName !== "Select State" &&
            stateName.toUpperCase() !== object.properties.ST_NAME.toUpperCase()
          ) {
          } else {
            if (
              select_constituency.pcNo !== -1 &&
              mapResult[object.properties.ST_NAME][object.properties.PC_NO]
                .pcNo !== select_constituency.pcNo
            ) {
              results = null;
            } else {
              results =
                mapResult[object.properties.ST_NAME][object.properties.PC_NO];
            }
          }
        }

        if (results) {
          let voteShare = "";

          for (let p in results.voteShare) {
            voteShare =
              voteShare +
              ` <p>
              <span class="font-[600] text-[12px]">
                ${p} <span class="px-3">:</span>
              </span>
              <span class="text-[gray] text-[12px]">${
                results.voteShare[p] ? results.voteShare[p] : 0
              }%</span>
            </p>`;
          }

          // Set tooltip content
          tooltipRef.current.innerHTML = `
            <div id="tooltip-1" class="bg-white p-0 pt-0 rounded-lg w-fit min-w-[250px]  ">
            <p class="bg-[#fff9e0] rounded-md p-2.5 pl-3 text-[14px] ">
              <span class="font-[600]">${results.state}</span>
            </p>
            <div class="flex flex-col gap-1 text-[gray] pb-3 pt-2 px-4">
              <p class="flex text-[13px] ">
                <span class="flex justify-between min-w-[100px] max-w-[100px]">Constituency  <span class="pr-2 ">:</span></span>
                <span class="text-black flex-1 font-[600]">
                  ${results.pcName}
                </span>
              </p>
              <p class="flex   text-[13px]">
                <span class="flex justify-between min-w-[100px] max-w-[100px]">Winner <span class="pr-2">:</span></span>
                <span class="text-black  font-[600]">
                   ${results.winner}
                </span>
              </p>
            </div>
            <div class="flex flex-col gap-0   pt-0 pb-3 px-5">
              <span class="font-[600] pb-1">
                Vote Share<span class="px-2">:</span>
              </span>
            <div>
            ${voteShare}</div>
            </div>
            <div>
              `;
          // Set tooltip position
          tooltip.style.left = `${x}px`;

          tooltip.style.top = `${y}px`;
          tooltip.style.display = "block";

          return null; // DeckGL won't render its own tooltip
        }
      } else {
        let results = null,
          stateName = select_state;
        if (
          mapResult[object.properties.ST_NAME] &&
          mapResult[object.properties.ST_NAME][object.properties.AC_NO]
        ) {
          if (
            stateName &&
            stateName.toUpperCase() !== object.properties.ST_NAME.toUpperCase()
          ) {
          } else {
            if (
              select_constituency.acNo !== -1 &&
              mapResult[object.properties.ST_NAME][object.properties.AC_NO]
                .acNo !== select_constituency.acNo
            ) {
              results = null;
            } else {
              results =
                mapResult[object.properties.ST_NAME][object.properties.AC_NO];
            }
          }
        }

        if (results) {
          let voteShare = "";

          for (let p in results.voteShare) {
            voteShare =
              voteShare +
              ` <p>
              <span class="font-[600] text-[12px]">
                ${p} <span class="px-3">:</span>
              </span>
              <span class="text-[gray] text-[12px]">${
                results.voteShare[p] ? results.voteShare[p] : 0
              }%</span>
            </p>`;
          }
          // Set tooltip content
          tooltipRef.current.innerHTML = `
            <div class="bg-white p-0 pt-0 rounded-lg w-fit min-w-[250px] ">
            <p class="bg-[#fff9e0] rounded-md p-2.5 pl-3 text-[14px] ">
              <span class="font-[600]">${results.state}</span>
            </p>
            <div class="flex flex-col gap-1 text-[gray] pb-3 pt-2 px-4">
              <p class="flex   text-[13px]">
                <span class="flex justify-between min-w-[100px] max-w-[100px]">Constituency  <span class="pr-2 ">:</span></span>
                <span class="text-black flex-1 font-[600]">
                  ${results.acName}
                </span>
              </p>
              <p class="flex   text-[13px]">
                <span class="flex justify-between min-w-[100px] max-w-[100px]">Winner <span class="pr-2">:</span></span>
                <span class="text-black  font-[600]">
                   ${results.winner}
                </span>
              </p>
            </div>
            <div class="flex flex-col gap-0   pt-0 pb-3 px-5">
              <span class="font-[600] pb-1">
                Vote Share<span class="px-2">:</span>
              </span>
            <div>
            ${voteShare}</div>
            </div>
            <div>
              `;
          // Set tooltip position
          tooltip.style.left = `${x}px`;
          tooltip.style.top = `${y}px`;
          tooltip.style.display = "block";

          return null; // DeckGL won't render its own tooltip
        }
      }
    }
  };

  //   just on drag add dragging cursor
  const _getCursor = (e: any) => {
    return e.isHovering ? (e.isDragging ? "grabbing" : "pointer") : "";
  };
  const handleZoomIn = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.min(prevViewport.zoom + 0.5, 20), // Limit max zoom level to 20
    }));
  };

  const handleZoomOut = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.max(prevViewport.zoom - 0.5, 0), // Limit min zoom level to 0
    }));
  };
  const [isRendering1, setIsRendering1] = useState(false);
  const [isRendering2, setIsRendering2] = useState(false);
  const handleResetToInitial = () => {
    if (select_sabha === "Lok Sabha" && select_state === "Select State") {
      setViewport(
        isRendering1
          ? {
              longitude: windowWidth < 640 ? 78.9629 : 78.9629 + 1,
              latitude: windowWidth < 640 ? 20.5937 : 20.5937 - 5,
              zoom: windowWidth < 640 ? 3 : 3.5,
            }
          : {
              longitude: windowWidth < 640 ? 78.9629 : 78.9629 + 1,
              latitude: windowWidth < 640 ? 20.5937 : 20.5937 - 5,
              zoom: windowWidth < 640 ? 3 : 3.5000001,
            }
      );
      setIsRendering1((p) => !p);
    } else {
      const stateCoordinates = STATE_COORDINATES.find(
        (row) => row.state.toUpperCase() === select_state.toUpperCase()
      );

      //console.log("stateCoordinates", stateCoordinates);
      if (!stateCoordinates) return;

      setViewport(
        isRendering2
          ? {
              latitude: stateCoordinates.latitude - 0.1,
              longitude: stateCoordinates.longitude,
              zoom:
                windowWidth < 800
                  ? stateCoordinates.zoom * 0.82
                  : stateCoordinates.zoom * 0.82 + 1.2,
            }
          : {
              latitude: stateCoordinates.latitude - 0.1,
              longitude: stateCoordinates.longitude,
              zoom:
                windowWidth < 800
                  ? stateCoordinates.zoom * 0.82000001
                  : stateCoordinates.zoom * 0.82 + 1.2,
            }
      );

      setIsRendering2((p) => !p);
    }
  };

  return (
    <>
      {layers.length > 0 ? (
        <div
          ref={containerRef}
          className="w-full bg-gray-200  h-[80vh] md:h-auto md:w-1/2 min-w-[250px] sm:min-w-[300px] flex-1 z-0 flex justify-end relative  "
        >
          <DeckGL
            initialViewState={viewport}
            layers={layers} //@ts-ignore
            getTooltip={_getTooltip}
            getCursor={(e) => _getCursor(e)}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            pickingRadius={5}
            width="100%"
            height="100%"
            onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            reuseMaps
            preventStyleDiffing={true}
            attributionControl={false}
            controller={
              windowWidth < 640
                ? {
                    doubleClickZoom: true, // Enable double click to zoom
                    scrollZoom: false,
                    dragPan: false,
                    dragRotate: false,
                    keyboard: false,
                    touchRotate: false,
                    touchZoom: false,
                  }
                : true
            }
          >
            <ReactMapGL
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
              reuseMaps
            ></ReactMapGL>

            <div id="map" className="absolute z-50 bottom-0 left-0">
              <div className="mapbox-attribution-container relative flex row-reverse">
                <div
                  className="flex justify-start"
                  style={{ placeItems: "baseline" }}
                >
                  <img
                    src={`/dhruv_logo.jpg`}
                    alt="copyright newsclick dot in"
                    className="w-28"
                  />
                </div>
              </div>
            </div>
            <div className="absolute z-50 top-0 left-0 ">
              <div className="mapbox-attribution-container relative flex row-reverse">
                <div className="flex items-center px-5 py-2 bg-white border  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192 512"
                    fill="rgb(107 114 128)"
                    className="w-5 h-5 border-2 border-gray-500  cursor-pointer  rounded-full p-[4px]"
                  >
                    <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-500">
                    Hover on Map to view details
                  </span>
                </div>
              </div>
            </div>
          </DeckGL>

          {/* zoom buttons */}
          <div
            style={{
              position: "absolute",
              right: 15,
              top: 10,

              display: "flex",
              flexDirection: "column",
              zIndex: 2,

              borderRadius: "5px",
              boxShadow: "0 0 0 1.5px rgba(0, 0, 0, .3)",
            }}
          >
            <button
              className="py-[5px] px-2 bg-white rounded-t-md hover:bg-gray-100"
              onClick={handleZoomIn}
            >
              <svg
                fill="rgba(0, 0, 0, .7)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="18px"
                height="18px"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
            <button
              className="py-[4px] px-2 bg-white border-t-[2px] border-gray-300 border-b-[2px] hover:bg-gray-100"
              onClick={handleZoomOut}
            >
              <svg
                fill="rgba(0, 0, 0, .7)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="18px"
                height="18px"
              >
                {" "}
                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
            <button
              className="py-[5px] px-2 bg-white rounded-b-md hover:bg-gray-100"
              onClick={handleResetToInitial}
            >
              <svg
                fill="rgba(0, 0, 0, .7)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="18px"
                height="18px"
              >
                {" "}
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
            </button>
          </div>

          {/* tooltip */}
          <div
            ref={tooltipRef}
            className="absolute z-[1000]  text-black w-full h-full "
          ></div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
