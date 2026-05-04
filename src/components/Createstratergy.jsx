import {
  Container,
  Grid,
  Card,
  Group,
  Title,
  Button,
  Select,
  NumberInput,
  SegmentedControl,
  Switch,
  TextInput,
  Divider,
  Text,
  ActionIcon,
  Flex,
  Textarea
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { IconCopy, IconTrash } from "@tabler/icons-react";
import Createleg from "./Createleg";
import { apiRequest } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreateStrategy() {

  const yourJsonData =[
  {
    "symbol": "360ONE",
    "security_id": "13061",
    "exchange_id": "NSE",
    "lot_size": 500
  },
  {
    "symbol": "ABB",
    "security_id": "13",
    "exchange_id": "NSE",
    "lot_size": 125
  },
  {
    "symbol": "ABCAPITAL",
    "security_id": "21614",
    "exchange_id": "NSE",
    "lot_size": 3100
  },
  {
    "symbol": "ADANIENSOL",
    "security_id": "10217",
    "exchange_id": "NSE",
    "lot_size": 675
  },
  {
    "symbol": "ADANIENT",
    "security_id": "25",
    "exchange_id": "NSE",
    "lot_size": 309
  },
  {
    "symbol": "ADANIGREEN",
    "security_id": "3563",
    "exchange_id": "NSE",
    "lot_size": 600
  },
  {
    "symbol": "ADANIPORTS",
    "security_id": "15083",
    "exchange_id": "NSE",
    "lot_size": 475
  },
  {
    "symbol": "ALKEM",
    "security_id": "11703",
    "exchange_id": "NSE",
    "lot_size": 125
  },
  {
    "symbol": "AMBER",
    "security_id": "1185",
    "exchange_id": "NSE",
    "lot_size": 100
  },
  {
    "symbol": "AMBUJACEM",
    "security_id": "1270",
    "exchange_id": "NSE",
    "lot_size": 1050
  },
  {
    "symbol": "ANGELONE",
    "security_id": "324",
    "exchange_id": "NSE",
    "lot_size": 2500
  },
  {
    "symbol": "APLAPOLLO",
    "security_id": "25780",
    "exchange_id": "NSE",
    "lot_size": 350
  },
  {
    "symbol": "APOLLOHOSP",
    "security_id": "157",
    "exchange_id": "NSE",
    "lot_size": 125
  },
  {
    "symbol": "ASHOKLEY",
    "security_id": "212",
    "exchange_id": "NSE",
    "lot_size": 5000
  },
  {
    "symbol": "ASIANPAINT",
    "security_id": "236",
    "exchange_id": "NSE",
    "lot_size": 250
  },
  {
    "symbol": "ASTRAL",
    "security_id": "14418",
    "exchange_id": "NSE",
    "lot_size": 425
  },
  {
    "symbol": "AUBANK",
    "security_id": "21238",
    "exchange_id": "NSE",
    "lot_size": 1000
  },
  {
    "symbol": "AUROPHARMA",
    "security_id": "275",
    "exchange_id": "NSE",
    "lot_size": 550
  },
  {
    "symbol": "AXISBANK",
    "security_id": "5900",
    "exchange_id": "NSE",
    "lot_size": 625
  },
  {
    "symbol": "BAJAJ-AUTO",
    "security_id": "16669",
    "exchange_id": "NSE",
    "lot_size": 75
  },
  {
    "symbol": "BAJAJFINSV",
    "security_id": "16675",
    "exchange_id": "NSE",
    "lot_size": 250
  },
  {
    "symbol": "BAJAJHLDNG",
    "security_id": "305",
    "exchange_id": "NSE",
    "lot_size": 50
  },
  {
    "symbol": "BAJFINANCE",
    "security_id": "317",
    "exchange_id": "NSE",
    "lot_size": 750
  },
  {
    "symbol": "BANDHANBNK",
    "security_id": "2263",
    "exchange_id": "NSE",
    "lot_size": 3600
  },
  {
    "symbol": "BANKBARODA",
    "security_id": "4668",
    "exchange_id": "NSE",
    "lot_size": 2925
  },
  {
    "symbol": "BANKINDIA",
    "security_id": "4745",
    "exchange_id": "NSE",
    "lot_size": 5200
  },
  {
    "symbol": "BDL",
    "security_id": "2144",
    "exchange_id": "NSE",
    "lot_size": 350
  },
  {
    "symbol": "BEL",
    "security_id": "383",
    "exchange_id": "NSE",
    "lot_size": 1425
  },
  {
    "symbol": "BHARATFORG",
    "security_id": "422",
    "exchange_id": "NSE",
    "lot_size": 500
  },
  {
    "symbol": "BHARTIARTL",
    "security_id": "10604",
    "exchange_id": "NSE",
    "lot_size": 475
  },
  {
    "symbol": "BHEL",
    "security_id": "438",
    "exchange_id": "NSE",
    "lot_size": 2625
  },
  {
    "symbol": "BIOCON",
    "security_id": "11373",
    "exchange_id": "NSE",
    "lot_size": 2500
  },
  {
    "symbol": "BLUESTARCO",
    "security_id": "8311",
    "exchange_id": "NSE",
    "lot_size": 325
  },
  {
    "symbol": "BOSCHLTD",
    "security_id": "2181",
    "exchange_id": "NSE",
    "lot_size": 25
  },
  {
    "symbol": "BPCL",
    "security_id": "526",
    "exchange_id": "NSE",
    "lot_size": 1975
  },
  {
    "symbol": "BRITANNIA",
    "security_id": "547",
    "exchange_id": "NSE",
    "lot_size": 125
  },
  {
    "symbol": "BSE",
    "security_id": "19585",
    "exchange_id": "NSE",
    "lot_size": 375
  },
  {
    "symbol": "CAMS",
    "security_id": "342",
    "exchange_id": "NSE",
    "lot_size": 750
  },
  {
    "symbol": "CANBK",
    "security_id": "10794",
    "exchange_id": "NSE",
    "lot_size": 6750
  },
  {
    "symbol": "CDSL",
    "security_id": "21174",
    "exchange_id": "NSE",
    "lot_size": 475
  },
  {
    "symbol": "CGPOWER",
    "security_id": "760",
    "exchange_id": "NSE",
    "lot_size": 850
  },
  {
    "symbol": "CHOLAFIN",
    "security_id": "19257",
    "exchange_id": "NSE",
    "lot_size": 625
  },
  {
    "symbol": "CIPLA",
    "security_id": "694",
    "exchange_id": "NSE",
    "lot_size": 375
  },
  {
    "symbol": "COALINDIA",
    "security_id": "20374",
    "exchange_id": "NSE",
    "lot_size": 1350
  },
  {
    "symbol": "COFORGE",
    "security_id": "11543",
    "exchange_id": "NSE",
    "lot_size": 375
  },
  {
    "symbol": "COLPAL",
    "security_id": "15141",
    "exchange_id": "NSE",
    "lot_size": 225
  },
  {
    "symbol": "CONCOR",
    "security_id": "4749",
    "exchange_id": "NSE",
    "lot_size": 1250
  },
  {
    "symbol": "CROMPTON",
    "security_id": "17094",
    "exchange_id": "NSE",
    "lot_size": 1800
  },
  {
    "symbol": "CUMMINSIND",
    "security_id": "1901",
    "exchange_id": "NSE",
    "lot_size": 200
  },
  {
    "symbol": "DABUR",
    "security_id": "772",
    "exchange_id": "NSE",
    "lot_size": 1250
  },
  {
    "symbol": "DALBHARAT",
    "security_id": "8075",
    "exchange_id": "NSE",
    "lot_size": 325
  },
  {
    "symbol": "DELHIVERY",
    "security_id": "9599",
    "exchange_id": "NSE",
    "lot_size": 2075
  },
  {
    "symbol": "DIVISLAB",
    "security_id": "10940",
    "exchange_id": "NSE",
    "lot_size": 100
  },
  {
    "symbol": "DIXON",
    "security_id": "21690",
    "exchange_id": "NSE",
    "lot_size": 50
  },
  {
    "symbol": "DLF",
    "security_id": "14732",
    "exchange_id": "NSE",
    "lot_size": 825
  },
  {
    "symbol": "DMART",
    "security_id": "19913",
    "exchange_id": "NSE",
    "lot_size": 150
  },
  {
    "symbol": "DRREDDY",
    "security_id": "881",
    "exchange_id": "NSE",
    "lot_size": 625
  },
  {
    "symbol": "EICHERMOT",
    "security_id": "910",
    "exchange_id": "NSE",
    "lot_size": 100
  },
  {
    "symbol": "ETERNAL",
    "security_id": "5097",
    "exchange_id": "NSE",
    "lot_size": 2425
  },
  {
    "symbol": "EXIDEIND",
    "security_id": "676",
    "exchange_id": "NSE",
    "lot_size": 1800
  },
  {
    "symbol": "FEDERALBNK",
    "security_id": "1023",
    "exchange_id": "NSE",
    "lot_size": 5000
  },
  {
    "symbol": "FORTIS",
    "security_id": "14592",
    "exchange_id": "NSE",
    "lot_size": 775
  },
  {
    "symbol": "GAIL",
    "security_id": "4717",
    "exchange_id": "NSE",
    "lot_size": 3150
  },
  {
    "symbol": "GLENMARK",
    "security_id": "7406",
    "exchange_id": "NSE",
    "lot_size": 375
  },
  {
    "symbol": "GMRAIRPORT",
    "security_id": "13528",
    "exchange_id": "NSE",
    "lot_size": 6975
  },
  {
    "symbol": "GODREJCP",
    "security_id": "10099",
    "exchange_id": "NSE",
    "lot_size": 500
  },
  {
    "symbol": "GODREJPROP",
    "security_id": "17875",
    "exchange_id": "NSE",
    "lot_size": 275
  },
  {
    "symbol": "GRASIM",
    "security_id": "1232",
    "exchange_id": "NSE",
    "lot_size": 250
  },
  {
    "symbol": "HAL",
    "security_id": "2303",
    "exchange_id": "NSE",
    "lot_size": 150
  },
  {
    "symbol": "HAVELLS",
    "security_id": "9819",
    "exchange_id": "NSE",
    "lot_size": 500
  },
  {
    "symbol": "HCLTECH",
    "security_id": "7229",
    "exchange_id": "NSE",
    "lot_size": 350
  },
  {
    "symbol": "HDFCAMC",
    "security_id": "4244",
    "exchange_id": "NSE",
    "lot_size": 300
  },
  {
    "symbol": "HDFCBANK",
    "security_id": "1333",
    "exchange_id": "NSE",
    "lot_size": 550
  },
  {
    "symbol": "HDFCLIFE",
    "security_id": "467",
    "exchange_id": "NSE",
    "lot_size": 1100
  },
  {
    "symbol": "HEROMOTOCO",
    "security_id": "1348",
    "exchange_id": "NSE",
    "lot_size": 150
  },
  {
    "symbol": "HINDALCO",
    "security_id": "1363",
    "exchange_id": "NSE",
    "lot_size": 700
  },
  {
    "symbol": "HINDPETRO",
    "security_id": "1406",
    "exchange_id": "NSE",
    "lot_size": 2025
  },
  {
    "symbol": "HINDUNILVR",
    "security_id": "1394",
    "exchange_id": "NSE",
    "lot_size": 300
  },
  {
    "symbol": "HINDZINC",
    "security_id": "1424",
    "exchange_id": "NSE",
    "lot_size": 1225
  },
  {
    "symbol": "HUDCO",
    "security_id": "20825",
    "exchange_id": "NSE",
    "lot_size": 2775
  },
  {
    "symbol": "ICICIBANK",
    "security_id": "4963",
    "exchange_id": "NSE",
    "lot_size": 700
  },
  {
    "symbol": "ICICIGI",
    "security_id": "21770",
    "exchange_id": "NSE",
    "lot_size": 325
  },
  {
    "symbol": "ICICIPRULI",
    "security_id": "18652",
    "exchange_id": "NSE",
    "lot_size": 925
  },
  {
    "symbol": "IDEA",
    "security_id": "14366",
    "exchange_id": "NSE",
    "lot_size": 71475
  },
  {
    "symbol": "IDFCFIRSTB",
    "security_id": "11184",
    "exchange_id": "NSE",
    "lot_size": 9275
  },
  {
    "symbol": "IEX",
    "security_id": "220",
    "exchange_id": "NSE",
    "lot_size": 3750
  },
  {
    "symbol": "INDHOTEL",
    "security_id": "1512",
    "exchange_id": "NSE",
    "lot_size": 1000
  },
  {
    "symbol": "INDIANB",
    "security_id": "14309",
    "exchange_id": "NSE",
    "lot_size": 1000
  },
  {
    "symbol": "INDIGO",
    "security_id": "11195",
    "exchange_id": "NSE",
    "lot_size": 150
  },
  {
    "symbol": "INDUSINDBK",
    "security_id": "5258",
    "exchange_id": "NSE",
    "lot_size": 700
  },
  {
    "symbol": "INDUSTOWER",
    "security_id": "29135",
    "exchange_id": "NSE",
    "lot_size": 1700
  },
  {
    "symbol": "INFY",
    "security_id": "1594",
    "exchange_id": "NSE",
    "lot_size": 400
  },
  {
    "symbol": "INOXWIND",
    "security_id": "7852",
    "exchange_id": "NSE",
    "lot_size": 3575
  },
  {
    "symbol": "IOC",
    "security_id": "1624",
    "exchange_id": "NSE",
    "lot_size": 4875
  },
  {
    "symbol": "IREDA",
    "security_id": "20261",
    "exchange_id": "NSE",
    "lot_size": 3450
  },
  {
    "symbol": "IRFC",
    "security_id": "2029",
    "exchange_id": "NSE",
    "lot_size": 4250
  },
  {
    "symbol": "ITC",
    "security_id": "1660",
    "exchange_id": "NSE",
    "lot_size": 1600
  },
  {
    "symbol": "JINDALSTEL",
    "security_id": "6733",
    "exchange_id": "NSE",
    "lot_size": 625
  },
  {
    "symbol": "JIOFIN",
    "security_id": "18143",
    "exchange_id": "NSE",
    "lot_size": 2350
  },
  {
    "symbol": "JSWENERGY",
    "security_id": "17869",
    "exchange_id": "NSE",
    "lot_size": 1000
  },
  {
    "symbol": "JSWSTEEL",
    "security_id": "11723",
    "exchange_id": "NSE",
    "lot_size": 675
  },
  {
    "symbol": "JUBLFOOD",
    "security_id": "18096",
    "exchange_id": "NSE",
    "lot_size": 1250
  },
  {
    "symbol": "KALYANKJIL",
    "security_id": "2955",
    "exchange_id": "NSE",
    "lot_size": 1175
  },
  {
    "symbol": "KAYNES",
    "security_id": "12092",
    "exchange_id": "NSE",
    "lot_size": 100
  },
  {
    "symbol": "KEI",
    "security_id": "13310",
    "exchange_id": "NSE",
    "lot_size": 175
  },
  {
    "symbol": "KFINTECH",
    "security_id": "13359",
    "exchange_id": "NSE",
    "lot_size": 500
  },
  {
    "symbol": "KOTAKBANK",
    "security_id": "1922",
    "exchange_id": "NSE",
    "lot_size": 2000
  },
  {
    "symbol": "KPITTECH",
    "security_id": "9683",
    "exchange_id": "NSE",
    "lot_size": 425
  },
  {
    "symbol": "LAURUSLABS",
    "security_id": "19234",
    "exchange_id": "NSE",
    "lot_size": 850
  },
  {
    "symbol": "LICHSGFIN",
    "security_id": "1997",
    "exchange_id": "NSE",
    "lot_size": 1000
  },
  {
    "symbol": "LICI",
    "security_id": "9480",
    "exchange_id": "NSE",
    "lot_size": 700
  },
  {
    "symbol": "LODHA",
    "security_id": "3220",
    "exchange_id": "NSE",
    "lot_size": 450
  },
  {
    "symbol": "LT",
    "security_id": "11483",
    "exchange_id": "NSE",
    "lot_size": 175
  },
  {
    "symbol": "LTF",
    "security_id": "24948",
    "exchange_id": "NSE",
    "lot_size": 2250
  },
  {
    "symbol": "LTM",
    "security_id": "17818",
    "exchange_id": "NSE",
    "lot_size": 150
  },
  {
    "symbol": "LUPIN",
    "security_id": "10440",
    "exchange_id": "NSE",
    "lot_size": 425
  },
  {
    "symbol": "M&M",
    "security_id": "2031",
    "exchange_id": "NSE",
    "lot_size": 200
  },
  {
    "symbol": "MANAPPURAM",
    "security_id": "19061",
    "exchange_id": "NSE",
    "lot_size": 3000
  },
  {
    "symbol": "MANKIND",
    "security_id": "15380",
    "exchange_id": "NSE",
    "lot_size": 225
  },
  {
    "symbol": "MARICO",
    "security_id": "4067",
    "exchange_id": "NSE",
    "lot_size": 1200
  },
  {
    "symbol": "MARUTI",
    "security_id": "10999",
    "exchange_id": "NSE",
    "lot_size": 50
  },
  {
    "symbol": "MAXHEALTH",
    "security_id": "22377",
    "exchange_id": "NSE",
    "lot_size": 525
  },
  {
    "symbol": "MAZDOCK",
    "security_id": "509",
    "exchange_id": "NSE",
    "lot_size": 200
  },
  {
    "symbol": "MCX",
    "security_id": "31181",
    "exchange_id": "NSE",
    "lot_size": 625
  },
  {
    "symbol": "MFSL",
    "security_id": "2142",
    "exchange_id": "NSE",
    "lot_size": 400
  },
  {
    "symbol": "MOTHERSON",
    "security_id": "25510",
    "exchange_id": "NSE",
    "lot_size": 6150
  },
  {
    "symbol": "MPHASIS",
    "security_id": "4503",
    "exchange_id": "NSE",
    "lot_size": 275
  },
  {
    "symbol": "MUTHOOTFIN",
    "security_id": "23650",
    "exchange_id": "NSE",
    "lot_size": 275
  },
  {
    "symbol": "NATIONALUM",
    "security_id": "6364",
    "exchange_id": "NSE",
    "lot_size": 3750
  },
  {
    "symbol": "NAUKRI",
    "security_id": "13751",
    "exchange_id": "NSE",
    "lot_size": 375
  },
  {
    "symbol": "NBCC",
    "security_id": "31415",
    "exchange_id": "NSE",
    "lot_size": 6500
  },
  {
    "symbol": "NESTLEIND",
    "security_id": "17963",
    "exchange_id": "NSE",
    "lot_size": 500
  },
  {
    "symbol": "NHPC",
    "security_id": "17400",
    "exchange_id": "NSE",
    "lot_size": 6400
  },
  {
    "symbol": "NMDC",
    "security_id": "15332",
    "exchange_id": "NSE",
    "lot_size": 6750
  },
  {
    "symbol": "NTPC",
    "security_id": "11630",
    "exchange_id": "NSE",
    "lot_size": 1500
  },
  {
    "symbol": "NUVAMA",
    "security_id": "18721",
    "exchange_id": "NSE",
    "lot_size": 500
  },
  {
    "symbol": "NYKAA",
    "security_id": "6545",
    "exchange_id": "NSE",
    "lot_size": 3125
  },
  {
    "symbol": "OBEROIRLTY",
    "security_id": "20242",
    "exchange_id": "NSE",
    "lot_size": 350
  },
  {
    "symbol": "OFSS",
    "security_id": "10738",
    "exchange_id": "NSE",
    "lot_size": 75
  },
  {
    "symbol": "OIL",
    "security_id": "17438",
    "exchange_id": "NSE",
    "lot_size": 1400
  },
  {
    "symbol": "ONGC",
    "security_id": "2475",
    "exchange_id": "NSE",
    "lot_size": 2250
  },
  {
    "symbol": "PAGEIND",
    "security_id": "14413",
    "exchange_id": "NSE",
    "lot_size": 15
  },
  {
    "symbol": "PATANJALI",
    "security_id": "17029",
    "exchange_id": "NSE",
    "lot_size": 900
  },
  {
    "symbol": "PAYTM",
    "security_id": "6705",
    "exchange_id": "NSE",
    "lot_size": 725
  },
  {
    "symbol": "PERSISTENT",
    "security_id": "18365",
    "exchange_id": "NSE",
    "lot_size": 100
  },
  {
    "symbol": "PETRONET",
    "security_id": "11351",
    "exchange_id": "NSE",
    "lot_size": 1900
  },
  {
    "symbol": "PFC",
    "security_id": "14299",
    "exchange_id": "NSE",
    "lot_size": 1300
  },
  {
    "symbol": "PGEL",
    "security_id": "25358",
    "exchange_id": "NSE",
    "lot_size": 950
  },
  {
    "symbol": "PHOENIXLTD",
    "security_id": "14552",
    "exchange_id": "NSE",
    "lot_size": 350
  },
  {
    "symbol": "PIDILITIND",
    "security_id": "2664",
    "exchange_id": "NSE",
    "lot_size": 500
  },
  {
    "symbol": "PIIND",
    "security_id": "24184",
    "exchange_id": "NSE",
    "lot_size": 175
  },
  {
    "symbol": "PNB",
    "security_id": "10666",
    "exchange_id": "NSE",
    "lot_size": 8000
  },
  {
    "symbol": "PNBHOUSING",
    "security_id": "18908",
    "exchange_id": "NSE",
    "lot_size": 650
  },
  {
    "symbol": "POLICYBZR",
    "security_id": "6656",
    "exchange_id": "NSE",
    "lot_size": 350
  },
  {
    "symbol": "POLYCAB",
    "security_id": "9590",
    "exchange_id": "NSE",
    "lot_size": 125
  },
  {
    "symbol": "POWERGRID",
    "security_id": "14977",
    "exchange_id": "NSE",
    "lot_size": 1900
  },
  {
    "symbol": "POWERINDIA",
    "security_id": "18457",
    "exchange_id": "NSE",
    "lot_size": 50
  },
  {
    "symbol": "PPLPHARMA",
    "security_id": "11571",
    "exchange_id": "NSE",
    "lot_size": 2625
  },
  {
    "symbol": "PREMIERENE",
    "security_id": "25049",
    "exchange_id": "NSE",
    "lot_size": 575
  },
  {
    "symbol": "PRESTIGE",
    "security_id": "20302",
    "exchange_id": "NSE",
    "lot_size": 450
  },
  {
    "symbol": "RBLBANK",
    "security_id": "18391",
    "exchange_id": "NSE",
    "lot_size": 3175
  },
  {
    "symbol": "RECLTD",
    "security_id": "15355",
    "exchange_id": "NSE",
    "lot_size": 1400
  },
  {
    "symbol": "RELIANCE",
    "security_id": "2885",
    "exchange_id": "NSE",
    "lot_size": 500
  },
  {
    "symbol": "RVNL",
    "security_id": "9552",
    "exchange_id": "NSE",
    "lot_size": 1525
  },
  {
    "symbol": "SAIL",
    "security_id": "2963",
    "exchange_id": "NSE",
    "lot_size": 4700
  },
  {
    "symbol": "SAMMAANCAP",
    "security_id": "30125",
    "exchange_id": "NSE",
    "lot_size": 4300
  },
  {
    "symbol": "SBICARD",
    "security_id": "17971",
    "exchange_id": "NSE",
    "lot_size": 800
  },
  {
    "symbol": "SBILIFE",
    "security_id": "21808",
    "exchange_id": "NSE",
    "lot_size": 375
  },
  {
    "symbol": "SBIN",
    "security_id": "3045",
    "exchange_id": "NSE",
    "lot_size": 750
  },
  {
    "symbol": "SHREECEM",
    "security_id": "3103",
    "exchange_id": "NSE",
    "lot_size": 25
  },
  {
    "symbol": "SHRIRAMFIN",
    "security_id": "4306",
    "exchange_id": "NSE",
    "lot_size": 825
  },
  {
    "symbol": "SIEMENS",
    "security_id": "3150",
    "exchange_id": "NSE",
    "lot_size": 175
  },
  {
    "symbol": "SOLARINDS",
    "security_id": "13332",
    "exchange_id": "NSE",
    "lot_size": 50
  },
  {
    "symbol": "SONACOMS",
    "security_id": "4684",
    "exchange_id": "NSE",
    "lot_size": 1225
  },
  {
    "symbol": "SRF",
    "security_id": "3273",
    "exchange_id": "NSE",
    "lot_size": 200
  },
  {
    "symbol": "SUNPHARMA",
    "security_id": "3351",
    "exchange_id": "NSE",
    "lot_size": 350
  },
  {
    "symbol": "SUPREMEIND",
    "security_id": "3363",
    "exchange_id": "NSE",
    "lot_size": 175
  },
  {
    "symbol": "SUZLON",
    "security_id": "12018",
    "exchange_id": "NSE",
    "lot_size": 9025
  },
  {
    "symbol": "SWIGGY",
    "security_id": "27066",
    "exchange_id": "NSE",
    "lot_size": 1300
  },
  {
    "symbol": "TATACONSUM",
    "security_id": "3432",
    "exchange_id": "NSE",
    "lot_size": 550
  },
  {
    "symbol": "TATAELXSI",
    "security_id": "3411",
    "exchange_id": "NSE",
    "lot_size": 100
  },
  {
    "symbol": "TATAPOWER",
    "security_id": "3426",
    "exchange_id": "NSE",
    "lot_size": 1450
  },
  {
    "symbol": "TATASTEEL",
    "security_id": "3499",
    "exchange_id": "NSE",
    "lot_size": 5500
  },
  {
    "symbol": "TATATECH",
    "security_id": "20293",
    "exchange_id": "NSE",
    "lot_size": 800
  },
  {
    "symbol": "TCS",
    "security_id": "11536",
    "exchange_id": "NSE",
    "lot_size": 175
  },
  {
    "symbol": "TECHM",
    "security_id": "13538",
    "exchange_id": "NSE",
    "lot_size": 600
  },
  {
    "symbol": "TIINDIA",
    "security_id": "312",
    "exchange_id": "NSE",
    "lot_size": 200
  },
  {
    "symbol": "TITAN",
    "security_id": "3506",
    "exchange_id": "NSE",
    "lot_size": 175
  },
  {
    "symbol": "TMPV",
    "security_id": "3456",
    "exchange_id": "NSE",
    "lot_size": 800
  },
  {
    "symbol": "TORNTPHARM",
    "security_id": "3518",
    "exchange_id": "NSE",
    "lot_size": 250
  },
  {
    "symbol": "TORNTPOWER",
    "security_id": "13786",
    "exchange_id": "NSE",
    "lot_size": 425
  },
  {
    "symbol": "TRENT",
    "security_id": "1964",
    "exchange_id": "NSE",
    "lot_size": 100
  },
  {
    "symbol": "TVSMOTOR",
    "security_id": "8479",
    "exchange_id": "NSE",
    "lot_size": 175
  },
  {
    "symbol": "ULTRACEMCO",
    "security_id": "11532",
    "exchange_id": "NSE",
    "lot_size": 50
  },
  {
    "symbol": "UNIONBANK",
    "security_id": "10753",
    "exchange_id": "NSE",
    "lot_size": 4425
  },
  {
    "symbol": "UNITDSPR",
    "security_id": "10447",
    "exchange_id": "NSE",
    "lot_size": 400
  },
  {
    "symbol": "UNOMINDA",
    "security_id": "14154",
    "exchange_id": "NSE",
    "lot_size": 550
  },
  {
    "symbol": "UPL",
    "security_id": "11287",
    "exchange_id": "NSE",
    "lot_size": 1355
  },
  {
    "symbol": "VBL",
    "security_id": "18921",
    "exchange_id": "NSE",
    "lot_size": 1125
  },
  {
    "symbol": "VEDL",
    "security_id": "3063",
    "exchange_id": "NSE",
    "lot_size": 1150
  },
  {
    "symbol": "VOLTAS",
    "security_id": "3718",
    "exchange_id": "NSE",
    "lot_size": 375
  },
  {
    "symbol": "WAAREEENER",
    "security_id": "25907",
    "exchange_id": "NSE",
    "lot_size": 175
  },
  {
    "symbol": "WIPRO",
    "security_id": "3787",
    "exchange_id": "NSE",
    "lot_size": 3000
  },
  {
    "symbol": "YESBANK",
    "security_id": "11915",
    "exchange_id": "NSE",
    "lot_size": 31100
  },
  {
    "symbol": "ZYDUSLIFE",
    "security_id": "7929",
    "exchange_id": "NSE",
    "lot_size": 900
  },
    {
    "symbol": "NIFTY",
    "security_id": "13",
    "exchange_id": "NSE",
    "lot_size": 65
  },
  {
    "symbol": "BANKNIFTY",
    "security_id": "25",
    "exchange_id": "NSE",
    "lot_size": 30
  },
  {
    "symbol": "FINNIFTY",
    "security_id": "27",
    "exchange_id": "NSE",
    "lot_size": 60
  },
  {
    "symbol": "MIDCPNIFTY",
    "security_id": "442",
    "exchange_id": "NSE",
    "lot_size": 120
  }
]
 
  const [indexes, setIndexes] = useState([])
  const [index, setIndex] = useState(null);

  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [securityId, setSecurityId] = useState(null);
  const [exchange, setExchange] = useState(null);
  const [description , setdescription] = useState("")
  const [startergyname , setstartergyname] = useState("")
  const navigation = useNavigate()
  
  const mappedOptions = yourJsonData.map((item) => ({
  value: JSON.stringify(item), // store full object
  label: item.symbol           // show symbol in UI
}));
  

    const createDefaultLeg = () => ({
  id: Date.now(),

  market_type: "options",

  lots: 1,
  position: "Sell",
  option_type: "Call",
  strike_type: {
    type: "ATM spot",
    value:""
  },
  expiry: "This Week",

  entry: {
    type: "current_price",
    value: null
  },

  stoploss: {
    enabled: false,
    type: "percentage",
    value: null,
    reentry: {
      enabled: false,
      count: 0
    }
  },

  target: {
    enabled: false,
    type: "mtm",
    value: null,
    reentry: {
      enabled: false,
      count: 0
    }
  },

  trailing: {
    enabled: false,
    type: "points",
    tsl_active: null,
    sl_position: null,
    trail_value: null,
    reentry: {
      enabled: false,
      count: 0
    }
  }
});

const [entrySettings, setEntrySettings] = useState({
  mode: "intraday",

  entry_time: null,
  exit_time: null,

  no_reentry_after: {
    enabled: false,
    time: null
  },

  delay_restart: {
    enabled: false,
    time: null
  },

  positional: {
    expiry_type: "weekly",
    entry_days_before_expiry: 0,
    exit_days_before_expiry: 0
  },

  momentum: {
    enabled: false,
    type: "points",
    value: 50
  }
});
  
  const updateLeg = (id, path, value) => {
  setLegs((prev) =>
    prev.map((leg) => {
      if (leg.id !== id) return leg;

      const keys = path.split(".");
      let updated = { ...leg };

      let obj = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }

      obj[keys[keys.length - 1]] = value;

      return updated;
    })
  );
};

const handleSaveSignal = async() => {

  const signalJSON = {
    index: index,
    startergyname:startergyname,
    description : description,
    config_json: {
      entry_settings: entrySettings,
      legs: legs
    }
  };

  const response = await apiRequest('POST','/api/createstartergy/create',{
    index_id:index,
    startergy_name:startergyname,
    description: description,
    entry_settings: entrySettings,
    config_json: {legs:legs},
    status: 'published',
    created_by: 'user'
  })

  navigation('/strategies')

  /* console.log(response) */

  /* console.log("FINAL SIGNAL JSON 👇"); */
  /* console.log(JSON.stringify(signalJSON, null, 2)); */
};

  const [mode, setMode] = useState("intraday");
  const [marketType, setMarketType] = useState("options");

    const strikeTypeOptions = [
  { label: "ATM Spot", value: "atm_spot" },
  { label: "ATM Futures", value: "atm_futures" },
  { label: "Premium Nearest", value: "premium_nearest" },
  { label: "Premium <", value: "premium_lt" },
  { label: "Premium >", value: "premium_gt" },
  { label: "Delta Nearest", value: "delta_nearest" },
  { label: "Delta <", value: "delta_lt" },
  { label: "Delta >", value: "delta_gt" }
];

const atmValueOptions = [
  { label: "ATM", value: "ATM" },
  { label: "ITM 0", value: "ITM0" },
  { label: "ITM 1", value: "ITM1" },
  { label: "OTM 0", value: "OTM0" },
  { label: "OTM 1", value: "OTM1" }
];
  
    const [formData, setFormData] = useState({
    lots: 1,
    position: "Sell",
    option_type: "Call",
    strike_price: "",
    expiry: "This Week",
    strike_type: "",
    strike_value: ""
  });
  
    
    const expiryOptions =
    marketType === "futures"
    ? ["Current Month", "Next Month"]
    : ["This Week", "Next Week"];
    
    const [legs, setLegs] = useState([createDefaultLeg()]);
  
  
    const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  
  const addLeg = () => {
  setLegs((prev) => [...prev, createDefaultLeg()]);
};
  
  const deleteLeg = (id) => {
    setLegs((prev) => prev.filter((leg) => leg.id !== id));
  };
  
  const copyLeg = (leg) => {
  const newLeg = {
    ...JSON.parse(JSON.stringify(leg)),
    id: Date.now()
  };

  setLegs((prev) => [...prev, newLeg]);
};

  return (
    <Container size="xl" py="md">
      <Title py={"0rem"} order={3} >This feature is in testing feature not for production</Title>
      <Title order={3} pb={"1rem"} >Create Startergy</Title>
      <Grid justify={"space-around"} >

        {/* INSTRUMENT SETTINGS */}

        <Grid.Col span={{ base: 12, md: 4 }}>

          <Card shadow="sm" p="lg">
            <TextInput mb={'1rem'} value={startergyname} onChange={(e)=>setstartergyname(e.target.value)} label='Startegy Name' />
            <Select
  mb={"1rem"}
  label="Underlying"
  placeholder="Select index"
  data={mappedOptions}
  value={index}
  onChange={(val) => {
    if (!val) return;

    const parsed = JSON.parse(val);

    setIndex(val); // for UI
    setSelectedSymbol(parsed.symbol);
    setSecurityId(parsed.security_id);
    setExchange(parsed.exchange_id);
  }}
  searchable
  nothingFoundMessage="No index found"
/>
            <Textarea label="Description" maxLength={300} value={description} onChange={(e)=>setdescription(e.target.value)} />
          </Card>
        </Grid.Col>

        {/* ENTRY SETTINGS */}

          <Grid.Col mb={"1rem"} span={{ base: 12, md: 6 }}>
      <Card shadow="sm" p="lg">

        <Title order={5} mb="md">
          Entry settings
        </Title>

        <SegmentedControl
          fullWidth
          value={entrySettings.mode}
          onChange={(val) =>
            setEntrySettings((prev) => ({
            ...prev,
              mode: val
              }))
            }
          data={[
            { label: "Intraday", value: "intraday" },
            { label: "BTST", value: "btst" },
            { label: "Positional", value: "positional" }
          ]}
        />

        {/* ---------- INTRADAY ---------- */}

        {mode === "intraday" && (
          <>
            <Grid mt="md">

              <Grid.Col span={6}>
                <TimeInput
  label="Entry Time"
  value={entrySettings.entry_time || ""}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      entry_time: e.currentTarget.value
    }))
  }
/>
              </Grid.Col>

              <Grid.Col span={6}>
                <TimeInput
  label="Exit Time"
  value={entrySettings.exit_time || ""}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      exit_time: e.currentTarget.value
    }))
  }
/>
              </Grid.Col>

            </Grid>

            <Group mt="md" align="end">
              <Switch
  label="No re-entry after"
  checked={entrySettings.no_reentry_after.enabled}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      no_reentry_after: {
        ...prev.no_reentry_after,
        enabled: e.currentTarget.checked
      }
    }))
  }
/>
              <TimeInput
  placeholder="Time"
  value={entrySettings.no_reentry_after.time || ""}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      no_reentry_after: {
        ...prev.no_reentry_after,
        time: e.currentTarget.value
      }
    }))
  }
/>
            </Group>
          </>
        )}

        {/* ---------- BTST ---------- */}

        {mode === "btst" && (
          <>
            <Grid mt="md">

              <Grid.Col span={6}>
               <TimeInput
  label="Entry Time"
  value={entrySettings.entry_time || ""}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      entry_time: e.currentTarget.value
    }))
  }
/>
              </Grid.Col>

              <Grid.Col span={6}>
                <TimeInput
  label="Exit Time"
  value={entrySettings.exit_time || ""}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      exit_time: e.currentTarget.value
    }))
  }
/>
              </Grid.Col>

            </Grid>

            <Group mt="md" align="end">
              <Switch
  label="Delay restart"
  checked={entrySettings.delay_restart.enabled}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      delay_restart: {
        ...prev.delay_restart,
        enabled: e.currentTarget.checked
      }
    }))
  }
/>
              <TimeInput
  placeholder="Time"
  value={entrySettings.delay_restart.time || ""}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      delay_restart: {
        ...prev.delay_restart,
        time: e.currentTarget.value
      }
    }))
  }
/>
            </Group>
          </>
        )}

        {/* ---------- POSITIONAL ---------- */}

        {mode === "positional" && (
          <>

            <Group mt="md">
              <Text>Position expiry on</Text>

              <Select
  w={140}
  value={entrySettings.positional.expiry_type}
  onChange={(val) =>
    setEntrySettings((prev) => ({
      ...prev,
      positional: {
        ...prev.positional,
        expiry_type: val
      }
    }))
  }
  data={[
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" }
  ]}
/>
            </Group>

            <Grid mt="md">

              <Grid.Col span={6}>
                <TimeInput
  label="Entry Time"
  value={entrySettings.entry_time || ""}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      entry_time: e.currentTarget.value
    }))
  }
/>
              </Grid.Col>

              <Grid.Col span={6}>
                <TimeInput
  label="Exit Time"
  value={entrySettings.exit_time || ""}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      exit_time: e.currentTarget.value
    }))
  }
/>
              </Grid.Col>

            </Grid>

            <Grid mt="md">

              <Grid.Col span={6}>
                <Group align="end">
                  <Select
  label="Entry"
  value={String(entrySettings.positional.entry_days_before_expiry)}
  onChange={(val) =>
    setEntrySettings((prev) => ({
      ...prev,
      positional: {
        ...prev.positional,
        entry_days_before_expiry: Number(val)
      }
    }))
  }
  data={["0","1","2","3","4"]}
/>
                  <Text mb={6}>trading days before expiry</Text>
                </Group>
              </Grid.Col>

              <Grid.Col span={6}>
                <Group align="end">
                  <Select
  label="Exit"
  value={String(entrySettings.positional.exit_days_before_expiry)}
  onChange={(val) =>
    setEntrySettings((prev) => ({
      ...prev,
      positional: {
        ...prev.positional,
        exit_days_before_expiry: Number(val)
      }
    }))
  }
  data={["0","1","2","3","4"]}
/>
                  <Text mb={6}>trading days before expiry</Text>
                </Group>
              </Grid.Col>

            </Grid>

            <Group mt="md" align="end">
              <Switch label="Delay restart" />
              <TimeInput placeholder="Time" />
            </Group>

          </>
        )}

        {/* ---------- COMMON SECTION ---------- */}

        <Divider my="md" />

        <Group justify="space-between">
          <Text>Overall Momentum</Text>
          <Switch
  checked={entrySettings.momentum.enabled}
  onChange={(e) =>
    setEntrySettings((prev) => ({
      ...prev,
      momentum: {
        ...prev.momentum,
        enabled: e.currentTarget.checked
      }
    }))
  }
/>
        </Group>

        <Group mt="sm">
          <Select
  value={entrySettings.momentum.type}
  onChange={(val) =>
    setEntrySettings((prev) => ({
      ...prev,
      momentum: {
        ...prev.momentum,
        type: val
      }
    }))
  }
  data={[
    { label: "Points (Pts)", value: "points" },
    { label: "Percentage", value: "percentage" }
  ]}
/>
          <NumberInput
  value={entrySettings.momentum.value}
  onChange={(val) =>
    setEntrySettings((prev) => ({
      ...prev,
      momentum: {
        ...prev.momentum,
        value: val
      }
    }))
  }
/>
        </Group>

      </Card>
    </Grid.Col>
        {/* LEGWISE SETTINGS */}
{/* 
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card shadow="sm" p="lg">

            <Title order={5} mb="md">
              Legwise settings
            </Title>

            <SegmentedControl
              fullWidth
              data={[
                { label: "Partial", value: "partial" },
                { label: "Complete", value: "complete" }
              ]}
            />

            <Switch
              mt="md"
              label="Trail SL to Break-even price"
            />

            <SegmentedControl
              mt="md"
              fullWidth
              data={[
                { label: "All Legs", value: "all" },
                { label: "SL Legs", value: "sl" }
              ]}
            />

          </Card>
        </Grid.Col> */}

      </Grid> 

            {/* LEG BUILDER */}
                    {legs.map((leg, index) => (
                      <Card key={leg.id} shadow="sm" p="sm" mt="md">
                    
                        <Group justify="space-between" mb="xs">
                    
                          <Text fw={600}>#{index + 1}</Text>
                    
                          {/* Only show icons after first leg */}
                            <Group>
                              <ActionIcon
                                variant="light"
                                onClick={() => copyLeg(leg)}
                                >
                                <IconCopy size={16} />
                              </ActionIcon>
                              {index !== 0 && (
                    
                              <ActionIcon
                                variant="light"
                                color="red"
                                onClick={() => deleteLeg(leg.id)}
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            )}
                            </Group>
                    
                        </Group>
                    
                        <Createleg
                          leg={leg}
                          updateLeg={updateLeg}
                        />
                    
                        {/* Add Leg button only after first leg */}
                        {index === 0 && (
                          <Group justify="center" mt="md">
                            <Button bg="#000" onClick={addLeg}>
                              Add Leg
                            </Button>
                          </Group>
                        )}
                    
                      </Card>
                    ))}
                    


    
      {/* LOWER SECTION */}

          <Flex align={"center"} justify={"center"} >
        <Button bg="#000" onClick={handleSaveSignal}>
  Create Strategy
</Button>
        </Flex>
    </Container>
  );
}