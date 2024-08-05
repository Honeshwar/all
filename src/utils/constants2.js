/**
 * Geojson Default State Line Color
 */
export const DEFAULT_STATE_LINE_COLOR = [60, 60, 60, 255];

/**
 * Geojson District line Color for General Elections
 */
export const DEFAULT_DISTRICT_LINE_COLOR_GENERAL = [255, 255, 255, 255];

/**
 * Geojson Transparent Color
 */
export const TRANSPARENT_COLOR = [255, 255, 255, 0];

/**
 * Geojson Transparent color when no data is available
 */
export const MAP_TRANSPARENT_NA_COLOR = {
  red: 255,
  green: 255,
  blue: 255,
  alpha: 0,
};

/**
 * State/UT names and their coordinates
 */
export const STATE_COORDINATES2 = [
  {
    state: "Andaman & Nicobar Islands",
    latitude: 10.5,
    longitude: 93,
    zoom: 5.8,
  },
  {
    state: "Andhra Pradesh",
    latitude: 16.25,
    longitude: 80.75,
    zoom: 5.9,
  },
  {
    state: "Andhra Pradesh [Before 2014]",
    latitude: 16.25,
    longitude: 80.75,
    zoom: 5.9,
  },
  {
    state: "Arunachal Pradesh",
    latitude: 28.25,
    longitude: 94.5,
    zoom: 6.4,
  },
  {
    state: "Assam",
    latitude: 26.75,
    longitude: 92.75,
    zoom: 6.2,
  },
  {
    state: "Bihar",
    latitude: 26,
    longitude: 86,
    zoom: 6.5,
  },
  {
    state: "Chandigarh",
    latitude: 30.75,
    longitude: 76.78,
    zoom: 10,
  },
  {
    state: "Chhattisgarh",
    latitude: 21.0,
    longitude: 82.35,
    zoom: 6.2,
  },
  {
    state: "Dadra & Nagar Haveli",
    latitude: 20.2,
    longitude: 73.1,
    zoom: 10,
  },
  {
    state: "Daman & Diu",
    latitude: 20.4,
    longitude: 72.75,
    zoom: 10,
  },
  {
    state: "NCT of Delhi",
    latitude: 28.67,
    longitude: 77.1,
    zoom: 9.5,
  },
  {
    state: "Gujarat",
    latitude: 22.5,
    longitude: 71.25,
    zoom: 6.3,
  },
  {
    state: "Goa",
    latitude: 15.35,
    longitude: 74,
    zoom: 8.6,
  },
  {
    state: "Haryana",
    latitude: 29.5,
    longitude: 76.25,
    zoom: 7.0,
  },
  {
    state: "Himachal Pradesh",
    latitude: 31.9,
    longitude: 77.25,
    zoom: 7,
  },
  {
    state: "Jammu & Kashmir",
    latitude: 34.75,
    longitude: 76.5,
    zoom: 6.0,
  },
  {
    state: "Jharkhand",
    latitude: 23.5,
    longitude: 85.75,
    zoom: 6.75,
  },
  {
    state: "Karnataka",
    latitude: 15,
    longitude: 76.25,
    zoom: 6.2,
  },
  {
    state: "Kerala",
    latitude: 10.5,
    longitude: 76.5,
    zoom: 6.7,
  },
  {
    state: "Ladakh",
    latitude: 34.2,
    longitude: 76.5,
    zoom: 6.0,
  },
  {
    state: "Lakshadweep",
    latitude: 10.5,
    longitude: 72.6,
    zoom: 6.5,
  },
  {
    state: "Madhya Pradesh",
    latitude: 23.75,
    longitude: 78.5,
    zoom: 5.8,
  },
  {
    state: "Maharashtra",
    latitude: 19.25,
    longitude: 76.65,
    zoom: 5.8,
  },
  {
    state: "Manipur",
    latitude: 24.75,
    longitude: 94,
    zoom: 7.6,
  },
  {
    state: "Meghalaya",
    latitude: 25.75,
    longitude: 91.25,
    zoom: 7.2,
  },
  {
    state: "Mizoram",
    latitude: 23.5,
    longitude: 93,
    zoom: 7.2,
  },
  {
    state: "Nagaland",
    latitude: 26.0,
    longitude: 94.5,
    zoom: 7.2,
  },
  {
    state: "Odisha",
    latitude: 20,
    longitude: 84.65,
    zoom: 6.2,
  },
  {
    state: "Puducherry",
    latitude: 11.25,
    longitude: 79.75,
    zoom: 8.0,
  },
  {
    state: "Punjab",
    latitude: 31.0,
    longitude: 75.5,
    zoom: 7.2,
  },
  {
    state: "Rajasthan",
    latitude: 27, //-5
    longitude: 73.75, //+1
    zoom: 5.8,
  },
  {
    state: "Sikkim",
    latitude: 27.5,
    longitude: 88.5,
    zoom: 7.8,
  },
  {
    state: "Tamil Nadu",
    latitude: 10.75,
    longitude: 78.5,
    zoom: 6.5,
  },
  {
    state: "Telangana",
    latitude: 18.0,
    longitude: 79.5,
    zoom: 6.8,
  },
  {
    state: "Tripura",
    latitude: 23.75,
    longitude: 91.75,
    zoom: 8.0,
  },
  {
    state: "Uttar Pradesh",
    latitude: 27.25,
    longitude: 80.75,
    zoom: 6.0,
  },
  {
    state: "Uttarakhand",
    latitude: 30.25,
    longitude: 79.25,
    zoom: 7,
  },
  {
    state: "West Bengal",
    latitude: 24.5,
    longitude: 88.3,
    zoom: 6.4,
  },
];

/**
 * Default Party/Alliance Color
 */
export const PARTY_ALLIANCE_COLORS = {
  OTHERS: "#B4B4B4",
  INC: "#5EA449",
  KRPP: "#E64A1D",
  BJP: "#ED8918",
  SP: "#487b38",
  BSP: "#4171FE",
  RLD: "#396502",
  IUML: "#518D23",
  "KC(J)": "#CC990B",
  TRS: "#E55672",
  "KC(M)": "#CC990B",
  AGP: "#99CCFF",
  "KC(B)": "#CC990B",
  AINRC: "#F7BF0E",
  CMPKSC: "#FF0000",
  BPF: "#BD0026",
  ADMK: "#447603",
  AITC: "#75C848",
  "Congress(Secular)": "#E97A7E",
  JDS: "#00923F",
  "CPI(M)": "#E64A1D",
  CPM: "#E64A1D",
  CPIM: "#E64A1D",
  AIFB: "#DA461B",
  GJM: "#7CD11B",
  RSP: "#E54E47",
  IND: "#A6A6A6",
  DMK: "#cf451b",
  NCP: "#5CB4B2",
  CPI: "#E64A1D",
  AIUDF: "#4A8118",
  NSC: "#BD0026",
  AD: "#FFA500",
  AAP: "#1B66A4",
  AAAP: "#1B66A4",
  SBSP: "#F5D50A",
  "AD(S)": "#E36FCB",
  TDP: "#FBEC23",
  YSRCP: "#084202",
  SHS: "#E96D1F",
  RJD: "#4B8204",
  BJD: "#396502",
  SAD: "#EF9716",
  LJP: "#3294DD",
  "JD(U)": "#255a8e",
  RLSP: "#999966",
  BLSP: "#999966",
  JKPDP: "#4D8733",
  JMM: "#447E5A",
  JKNC: "#E64C3A",
  INLD: "#3A6600",
  "JD(S)": "#006400",
  "BJP+": "#ED8918",
  "INC+": "#5EA449",
  "BSP-SP-RLD": "#0000FF",
  LEFT: "#DE0000",
  AIMIM: "#3A6C49",
  AJSUP: "#DA251C",
  SKM: "#E64A23",
  SDF: "#FAEC0D",
  NDPP: "#E64A21",
  ADAL: "#E36FCB",
  RLTP: "#DBE934",
  JKN: "#FF0000",
  BOPF: "#E8611C",
  "KEC(M)": "#CC990B",
  NPF: "#bd678b",
  NPEP: "#505d98",
  MNF: "#2E5694",
  VCK: "#427bb3",
  "KEC(J)": "#f76940",
  "KEC(B)": "f76940",
  GOJAM: "#7CD11B",
  HAMS: "#4B8204",
  MGB: "#E64A1D",
  "TMC(M)": "#207bc6",
};
