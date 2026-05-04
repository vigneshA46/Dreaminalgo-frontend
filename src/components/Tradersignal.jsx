import { ActionIcon, Box, Button, Card, Container, Divider, Flex, Grid, Group, NumberInput, SegmentedControl, Select, Switch, Text, Textarea, TextInput, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Leg from './Leg';
import { IconCopy, IconTrash } from '@tabler/icons-react';
import { TimeInput } from "@mantine/dates";
import { apiRequest } from '../utils/api';


const Tradersignal = () => {
  const [indexes, setIndexes] = useState([])
const [index, setIndex] = useState(null)
const [index_neme , setindex_name] = useState("")
const [description , setdescription] = useState("")

/* 
useEffect(() => {

  const fetchIndexes = async () => {
    try {

      const res = await apiRequest("GET", "/api/instruments/indexes")

      const formatted = res.map((item) => ({
        value: item.id,
        label: item.index_name
      }))
      setIndexes(formatted)
 
    } catch (err) {
      console.log("Index fetch error:", err)
    }
  }

  fetchIndexes()

}, [])

 */



  const yourJsonData = [
  {
    "symbol": "CDSL",
    "security_id": "201232",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BSE",
    "security_id": "201890",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ABB",
    "security_id": "500002",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BAJFINANCE",
    "security_id": "500034",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BEL",
    "security_id": "500049",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BLUESTARCO",
    "security_id": "500067",
    "exchange_id": "BSE"
  },
  {
    "symbol": "EXIDEIND",
    "security_id": "500086",
    "exchange_id": "BSE"
  },
  {
    "symbol": "CIPLA",
    "security_id": "500087",
    "exchange_id": "BSE"
  },
  {
    "symbol": "CGPOWER",
    "security_id": "500093",
    "exchange_id": "BSE"
  },
  {
    "symbol": "DABUR",
    "security_id": "500096",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BHEL",
    "security_id": "500103",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HINDPETRO",
    "security_id": "500104",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SBIN",
    "security_id": "500112",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SAIL",
    "security_id": "500113",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TITAN",
    "security_id": "500114",
    "exchange_id": "BSE"
  },
  {
    "symbol": "DRREDDY",
    "security_id": "500124",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HDFCBANK",
    "security_id": "500180",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HEROMOTOCO",
    "security_id": "500182",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HINDZINC",
    "security_id": "500188",
    "exchange_id": "BSE"
  },
  {
    "symbol": "INFY",
    "security_id": "500209",
    "exchange_id": "BSE"
  },
  {
    "symbol": "JSWSTEEL",
    "security_id": "500228",
    "exchange_id": "BSE"
  },
  {
    "symbol": "KOTAKBANK",
    "security_id": "500247",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TRENT",
    "security_id": "500251",
    "exchange_id": "BSE"
  },
  {
    "symbol": "LICHSGFIN",
    "security_id": "500253",
    "exchange_id": "BSE"
  },
  {
    "symbol": "LUPIN",
    "security_id": "500257",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MFSL",
    "security_id": "500271",
    "exchange_id": "BSE"
  },
  {
    "symbol": "VEDL",
    "security_id": "500295",
    "exchange_id": "BSE"
  },
  {
    "symbol": "GRASIM",
    "security_id": "500300",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ONGC",
    "security_id": "500312",
    "exchange_id": "BSE"
  },
  {
    "symbol": "RELIANCE",
    "security_id": "500325",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PIDILITIND",
    "security_id": "500331",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PATANJALI",
    "security_id": "500368",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SHREECEM",
    "security_id": "500387",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TATAPOWER",
    "security_id": "500400",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TATAELXSI",
    "security_id": "500408",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TORNTPHARM",
    "security_id": "500420",
    "exchange_id": "BSE"
  },
  {
    "symbol": "AMBUJACEM",
    "security_id": "500425",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HINDALCO",
    "security_id": "500440",
    "exchange_id": "BSE"
  },
  {
    "symbol": "FEDERALBNK",
    "security_id": "500469",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TATASTEEL",
    "security_id": "500470",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ASHOKLEY",
    "security_id": "500477",
    "exchange_id": "BSE"
  },
  {
    "symbol": "CUMMINSIND",
    "security_id": "500480",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BAJAJHLDNG",
    "security_id": "500490",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BHARATFORG",
    "security_id": "500493",
    "exchange_id": "BSE"
  },
  {
    "symbol": "LT",
    "security_id": "500510",
    "exchange_id": "BSE"
  },
  {
    "symbol": "M&M",
    "security_id": "500520",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BOSCHLTD",
    "security_id": "500530",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BPCL",
    "security_id": "500547",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SIEMENS",
    "security_id": "500550",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TMPV",
    "security_id": "500570",
    "exchange_id": "BSE"
  },
  {
    "symbol": "VOLTAS",
    "security_id": "500575",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HINDUNILVR",
    "security_id": "500696",
    "exchange_id": "BSE"
  },
  {
    "symbol": "NESTLEIND",
    "security_id": "500790",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TATACONSUM",
    "security_id": "500800",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ASIANPAINT",
    "security_id": "500820",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BRITANNIA",
    "security_id": "500825",
    "exchange_id": "BSE"
  },
  {
    "symbol": "COLPAL",
    "security_id": "500830",
    "exchange_id": "BSE"
  },
  {
    "symbol": "INDHOTEL",
    "security_id": "500850",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ITC",
    "security_id": "500875",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PHOENIXLTD",
    "security_id": "503100",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SRF",
    "security_id": "503806",
    "exchange_id": "BSE"
  },
  {
    "symbol": "EICHERMOT",
    "security_id": "505200",
    "exchange_id": "BSE"
  },
  {
    "symbol": "WIPRO",
    "security_id": "507685",
    "exchange_id": "BSE"
  },
  {
    "symbol": "APOLLOHOSP",
    "security_id": "508869",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SUPREMEIND",
    "security_id": "509930",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SHRIRAMFIN",
    "security_id": "511218",
    "exchange_id": "BSE"
  },
  {
    "symbol": "CHOLAFIN",
    "security_id": "511243",
    "exchange_id": "BSE"
  },
  {
    "symbol": "UPL",
    "security_id": "512070",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ADANIENT",
    "security_id": "512599",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MOTHERSON",
    "security_id": "517334",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HAVELLS",
    "security_id": "517354",
    "exchange_id": "BSE"
  },
  {
    "symbol": "KEI",
    "security_id": "517569",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PIIND",
    "security_id": "523642",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SUNPHARMA",
    "security_id": "524715",
    "exchange_id": "BSE"
  },
  {
    "symbol": "AUROPHARMA",
    "security_id": "524804",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MPHASIS",
    "security_id": "526299",
    "exchange_id": "BSE"
  },
  {
    "symbol": "NMDC",
    "security_id": "526371",
    "exchange_id": "BSE"
  },
  {
    "symbol": "IOC",
    "security_id": "530965",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MANAPPURAM",
    "security_id": "531213",
    "exchange_id": "BSE"
  },
  {
    "symbol": "CONCOR",
    "security_id": "531344",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MARICO",
    "security_id": "531642",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BANKBARODA",
    "security_id": "532134",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BANKINDIA",
    "security_id": "532149",
    "exchange_id": "BSE"
  },
  {
    "symbol": "GAIL",
    "security_id": "532155",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ICICIBANK",
    "security_id": "532174",
    "exchange_id": "BSE"
  },
  {
    "symbol": "INDUSINDBK",
    "security_id": "532187",
    "exchange_id": "BSE"
  },
  {
    "symbol": "AXISBANK",
    "security_id": "532215",
    "exchange_id": "BSE"
  },
  {
    "symbol": "NATIONALUM",
    "security_id": "532234",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HCLTECH",
    "security_id": "532281",
    "exchange_id": "BSE"
  },
  {
    "symbol": "JINDALSTEL",
    "security_id": "532286",
    "exchange_id": "BSE"
  },
  {
    "symbol": "GLENMARK",
    "security_id": "532296",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ZYDUSLIFE",
    "security_id": "532321",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TVSMOTOR",
    "security_id": "532343",
    "exchange_id": "BSE"
  },
  {
    "symbol": "GODREJCP",
    "security_id": "532424",
    "exchange_id": "BSE"
  },
  {
    "symbol": "UNITDSPR",
    "security_id": "532432",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BHARTIARTL",
    "security_id": "532454",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PNB",
    "security_id": "532461",
    "exchange_id": "BSE"
  },
  {
    "symbol": "OFSS",
    "security_id": "532466",
    "exchange_id": "BSE"
  },
  {
    "symbol": "UNIONBANK",
    "security_id": "532477",
    "exchange_id": "BSE"
  },
  {
    "symbol": "CANBK",
    "security_id": "532483",
    "exchange_id": "BSE"
  },
  {
    "symbol": "DIVISLAB",
    "security_id": "532488",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MARUTI",
    "security_id": "532500",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PETRONET",
    "security_id": "532522",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BIOCON",
    "security_id": "532523",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ULTRACEMCO",
    "security_id": "532538",
    "exchange_id": "BSE"
  },
  {
    "symbol": "UNOMINDA",
    "security_id": "532539",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TCS",
    "security_id": "532540",
    "exchange_id": "BSE"
  },
  {
    "symbol": "COFORGE",
    "security_id": "532541",
    "exchange_id": "BSE"
  },
  {
    "symbol": "NTPC",
    "security_id": "532555",
    "exchange_id": "BSE"
  },
  {
    "symbol": "YESBANK",
    "security_id": "532648",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SUZLON",
    "security_id": "532667",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SOLARINDS",
    "security_id": "532725",
    "exchange_id": "BSE"
  },
  {
    "symbol": "GMRAIRPORT",
    "security_id": "532754",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TECHM",
    "security_id": "532755",
    "exchange_id": "BSE"
  },
  {
    "symbol": "NAUKRI",
    "security_id": "532777",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TORNTPOWER",
    "security_id": "532779",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PFC",
    "security_id": "532810",
    "exchange_id": "BSE"
  },
  {
    "symbol": "INDIANB",
    "security_id": "532814",
    "exchange_id": "BSE"
  },
  {
    "symbol": "IDEA",
    "security_id": "532822",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PAGEIND",
    "security_id": "532827",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ASTRAL",
    "security_id": "532830",
    "exchange_id": "BSE"
  },
  {
    "symbol": "FORTIS",
    "security_id": "532843",
    "exchange_id": "BSE"
  },
  {
    "symbol": "DLF",
    "security_id": "532868",
    "exchange_id": "BSE"
  },
  {
    "symbol": "POWERGRID",
    "security_id": "532898",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ADANIPORTS",
    "security_id": "532921",
    "exchange_id": "BSE"
  },
  {
    "symbol": "RECLTD",
    "security_id": "532955",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BAJAJ-AUTO",
    "security_id": "532977",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BAJAJFINSV",
    "security_id": "532978",
    "exchange_id": "BSE"
  },
  {
    "symbol": "NHPC",
    "security_id": "533098",
    "exchange_id": "BSE"
  },
  {
    "symbol": "OIL",
    "security_id": "533106",
    "exchange_id": "BSE"
  },
  {
    "symbol": "JSWENERGY",
    "security_id": "533148",
    "exchange_id": "BSE"
  },
  {
    "symbol": "GODREJPROP",
    "security_id": "533150",
    "exchange_id": "BSE"
  },
  {
    "symbol": "JUBLFOOD",
    "security_id": "533155",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PERSISTENT",
    "security_id": "533179",
    "exchange_id": "BSE"
  },
  {
    "symbol": "OBEROIRLTY",
    "security_id": "533273",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PRESTIGE",
    "security_id": "533274",
    "exchange_id": "BSE"
  },
  {
    "symbol": "COALINDIA",
    "security_id": "533278",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MUTHOOTFIN",
    "security_id": "533398",
    "exchange_id": "BSE"
  },
  {
    "symbol": "LTF",
    "security_id": "533519",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PGEL",
    "security_id": "533581",
    "exchange_id": "BSE"
  },
  {
    "symbol": "APLAPOLLO",
    "security_id": "533758",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MCX",
    "security_id": "534091",
    "exchange_id": "BSE"
  },
  {
    "symbol": "NBCC",
    "security_id": "534309",
    "exchange_id": "BSE"
  },
  {
    "symbol": "INDUSTOWER",
    "security_id": "534816",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SAMMAANCAP",
    "security_id": "535789",
    "exchange_id": "BSE"
  },
  {
    "symbol": "INOXWIND",
    "security_id": "539083",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ADANIENSOL",
    "security_id": "539254",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SYNGENE",
    "security_id": "539268",
    "exchange_id": "BSE"
  },
  {
    "symbol": "IDFCFIRSTB",
    "security_id": "539437",
    "exchange_id": "BSE"
  },
  {
    "symbol": "INDIGO",
    "security_id": "539448",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ALKEM",
    "security_id": "539523",
    "exchange_id": "BSE"
  },
  {
    "symbol": "CROMPTON",
    "security_id": "539876",
    "exchange_id": "BSE"
  },
  {
    "symbol": "LTM",
    "security_id": "540005",
    "exchange_id": "BSE"
  },
  {
    "symbol": "RBLBANK",
    "security_id": "540065",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ICICIPRULI",
    "security_id": "540133",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PNBHOUSING",
    "security_id": "540173",
    "exchange_id": "BSE"
  },
  {
    "symbol": "VBL",
    "security_id": "540180",
    "exchange_id": "BSE"
  },
  {
    "symbol": "LAURUSLABS",
    "security_id": "540222",
    "exchange_id": "BSE"
  },
  {
    "symbol": "DMART",
    "security_id": "540376",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HUDCO",
    "security_id": "540530",
    "exchange_id": "BSE"
  },
  {
    "symbol": "AUBANK",
    "security_id": "540611",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ABCAPITAL",
    "security_id": "540691",
    "exchange_id": "BSE"
  },
  {
    "symbol": "DIXON",
    "security_id": "540699",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ICICIGI",
    "security_id": "540716",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SBILIFE",
    "security_id": "540719",
    "exchange_id": "BSE"
  },
  {
    "symbol": "IEX",
    "security_id": "540750",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TIINDIA",
    "security_id": "540762",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HDFCLIFE",
    "security_id": "540777",
    "exchange_id": "BSE"
  },
  {
    "symbol": "AMBER",
    "security_id": "540902",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BDL",
    "security_id": "541143",
    "exchange_id": "BSE"
  },
  {
    "symbol": "BANDHANBNK",
    "security_id": "541153",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HAL",
    "security_id": "541154",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ADANIGREEN",
    "security_id": "541450",
    "exchange_id": "BSE"
  },
  {
    "symbol": "HDFCAMC",
    "security_id": "541729",
    "exchange_id": "BSE"
  },
  {
    "symbol": "DALBHARAT",
    "security_id": "542216",
    "exchange_id": "BSE"
  },
  {
    "symbol": "RVNL",
    "security_id": "542649",
    "exchange_id": "BSE"
  },
  {
    "symbol": "KPITTECH",
    "security_id": "542651",
    "exchange_id": "BSE"
  },
  {
    "symbol": "POLYCAB",
    "security_id": "542652",
    "exchange_id": "BSE"
  },
  {
    "symbol": "360ONE",
    "security_id": "542772",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SBICARD",
    "security_id": "543066",
    "exchange_id": "BSE"
  },
  {
    "symbol": "POWERINDIA",
    "security_id": "543187",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MAXHEALTH",
    "security_id": "543220",
    "exchange_id": "BSE"
  },
  {
    "symbol": "CAMS",
    "security_id": "543232",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ANGELONE",
    "security_id": "543235",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MAZDOCK",
    "security_id": "543237",
    "exchange_id": "BSE"
  },
  {
    "symbol": "IRFC",
    "security_id": "543257",
    "exchange_id": "BSE"
  },
  {
    "symbol": "KALYANKJIL",
    "security_id": "543278",
    "exchange_id": "BSE"
  },
  {
    "symbol": "LODHA",
    "security_id": "543287",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SONACOMS",
    "security_id": "543300",
    "exchange_id": "BSE"
  },
  {
    "symbol": "ETERNAL",
    "security_id": "543320",
    "exchange_id": "BSE"
  },
  {
    "symbol": "NYKAA",
    "security_id": "543384",
    "exchange_id": "BSE"
  },
  {
    "symbol": "POLICYBZR",
    "security_id": "543390",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PAYTM",
    "security_id": "543396",
    "exchange_id": "BSE"
  },
  {
    "symbol": "LICI",
    "security_id": "543526",
    "exchange_id": "BSE"
  },
  {
    "symbol": "DELHIVERY",
    "security_id": "543529",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PPLPHARMA",
    "security_id": "543635",
    "exchange_id": "BSE"
  },
  {
    "symbol": "KAYNES",
    "security_id": "543664",
    "exchange_id": "BSE"
  },
  {
    "symbol": "KFINTECH",
    "security_id": "543720",
    "exchange_id": "BSE"
  },
  {
    "symbol": "MANKIND",
    "security_id": "543904",
    "exchange_id": "BSE"
  },
  {
    "symbol": "JIOFIN",
    "security_id": "543940",
    "exchange_id": "BSE"
  },
  {
    "symbol": "NUVAMA",
    "security_id": "543988",
    "exchange_id": "BSE"
  },
  {
    "symbol": "IREDA",
    "security_id": "544026",
    "exchange_id": "BSE"
  },
  {
    "symbol": "TATATECH",
    "security_id": "544028",
    "exchange_id": "BSE"
  },
  {
    "symbol": "PREMIERENE",
    "security_id": "544238",
    "exchange_id": "BSE"
  },
  {
    "symbol": "WAAREEENER",
    "security_id": "544277",
    "exchange_id": "BSE"
  },
  {
    "symbol": "SWIGGY",
    "security_id": "544285",
    "exchange_id": "BSE"
  },
  {
    "symbol": "GODREJCP",
    "security_id": "10099",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ADANIENSOL",
    "security_id": "10217",
    "exchange_id": "NSE"
  },
  {
    "symbol": "FEDERALBNK",
    "security_id": "1023",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SYNGENE",
    "security_id": "10243",
    "exchange_id": "NSE"
  },
  {
    "symbol": "LUPIN",
    "security_id": "10440",
    "exchange_id": "NSE"
  },
  {
    "symbol": "UNITDSPR",
    "security_id": "10447",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BHARTIARTL",
    "security_id": "10604",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PNB",
    "security_id": "10666",
    "exchange_id": "NSE"
  },
  {
    "symbol": "OFSS",
    "security_id": "10738",
    "exchange_id": "NSE"
  },
  {
    "symbol": "UNIONBANK",
    "security_id": "10753",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CANBK",
    "security_id": "10794",
    "exchange_id": "NSE"
  },
  {
    "symbol": "DIVISLAB",
    "security_id": "10940",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MARUTI",
    "security_id": "10999",
    "exchange_id": "NSE"
  },
  {
    "symbol": "IDFCFIRSTB",
    "security_id": "11184",
    "exchange_id": "NSE"
  },
  {
    "symbol": "INDIGO",
    "security_id": "11195",
    "exchange_id": "NSE"
  },
  {
    "symbol": "UPL",
    "security_id": "11287",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PETRONET",
    "security_id": "11351",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BIOCON",
    "security_id": "11373",
    "exchange_id": "NSE"
  },
  {
    "symbol": "LT",
    "security_id": "11483",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ULTRACEMCO",
    "security_id": "11532",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TCS",
    "security_id": "11536",
    "exchange_id": "NSE"
  },
  {
    "symbol": "COFORGE",
    "security_id": "11543",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PPLPHARMA",
    "security_id": "11571",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NTPC",
    "security_id": "11630",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ALKEM",
    "security_id": "11703",
    "exchange_id": "NSE"
  },
  {
    "symbol": "JSWSTEEL",
    "security_id": "11723",
    "exchange_id": "NSE"
  },
  {
    "symbol": "AMBER",
    "security_id": "1185",
    "exchange_id": "NSE"
  },
  {
    "symbol": "YESBANK",
    "security_id": "11915",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SUZLON",
    "security_id": "12018",
    "exchange_id": "NSE"
  },
  {
    "symbol": "KAYNES",
    "security_id": "12092",
    "exchange_id": "NSE"
  },
  {
    "symbol": "GRASIM",
    "security_id": "1232",
    "exchange_id": "NSE"
  },
  {
    "symbol": "AMBUJACEM",
    "security_id": "1270",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ABB",
    "security_id": "13",
    "exchange_id": "NSE"
  },
  {
    "symbol": "360ONE",
    "security_id": "13061",
    "exchange_id": "NSE"
  },
  {
    "symbol": "KEI",
    "security_id": "13310",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HDFCBANK",
    "security_id": "1333",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SOLARINDS",
    "security_id": "13332",
    "exchange_id": "NSE"
  },
  {
    "symbol": "KFINTECH",
    "security_id": "13359",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HEROMOTOCO",
    "security_id": "1348",
    "exchange_id": "NSE"
  },
  {
    "symbol": "GMRAIRPORT",
    "security_id": "13528",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TECHM",
    "security_id": "13538",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HINDALCO",
    "security_id": "1363",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NAUKRI",
    "security_id": "13751",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TORNTPOWER",
    "security_id": "13786",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HINDUNILVR",
    "security_id": "1394",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HINDPETRO",
    "security_id": "1406",
    "exchange_id": "NSE"
  },
  {
    "symbol": "UNOMINDA",
    "security_id": "14154",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HINDZINC",
    "security_id": "1424",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PFC",
    "security_id": "14299",
    "exchange_id": "NSE"
  },
  {
    "symbol": "INDIANB",
    "security_id": "14309",
    "exchange_id": "NSE"
  },
  {
    "symbol": "IDEA",
    "security_id": "14366",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PAGEIND",
    "security_id": "14413",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ASTRAL",
    "security_id": "14418",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PHOENIXLTD",
    "security_id": "14552",
    "exchange_id": "NSE"
  },
  {
    "symbol": "FORTIS",
    "security_id": "14592",
    "exchange_id": "NSE"
  },
  {
    "symbol": "DLF",
    "security_id": "14732",
    "exchange_id": "NSE"
  },
  {
    "symbol": "POWERGRID",
    "security_id": "14977",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ADANIPORTS",
    "security_id": "15083",
    "exchange_id": "NSE"
  },
  {
    "symbol": "INDHOTEL",
    "security_id": "1512",
    "exchange_id": "NSE"
  },
  {
    "symbol": "COLPAL",
    "security_id": "15141",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NMDC",
    "security_id": "15332",
    "exchange_id": "NSE"
  },
  {
    "symbol": "RECLTD",
    "security_id": "15355",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MANKIND",
    "security_id": "15380",
    "exchange_id": "NSE"
  },
  {
    "symbol": "APOLLOHOSP",
    "security_id": "157",
    "exchange_id": "NSE"
  },
  {
    "symbol": "INFY",
    "security_id": "1594",
    "exchange_id": "NSE"
  },
  {
    "symbol": "IOC",
    "security_id": "1624",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ITC",
    "security_id": "1660",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BAJAJ-AUTO",
    "security_id": "16669",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BAJAJFINSV",
    "security_id": "16675",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PATANJALI",
    "security_id": "17029",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CROMPTON",
    "security_id": "17094",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NHPC",
    "security_id": "17400",
    "exchange_id": "NSE"
  },
  {
    "symbol": "OIL",
    "security_id": "17438",
    "exchange_id": "NSE"
  },
  {
    "symbol": "LTM",
    "security_id": "17818",
    "exchange_id": "NSE"
  },
  {
    "symbol": "JSWENERGY",
    "security_id": "17869",
    "exchange_id": "NSE"
  },
  {
    "symbol": "GODREJPROP",
    "security_id": "17875",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NESTLEIND",
    "security_id": "17963",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SBICARD",
    "security_id": "17971",
    "exchange_id": "NSE"
  },
  {
    "symbol": "JUBLFOOD",
    "security_id": "18096",
    "exchange_id": "NSE"
  },
  {
    "symbol": "JIOFIN",
    "security_id": "18143",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PERSISTENT",
    "security_id": "18365",
    "exchange_id": "NSE"
  },
  {
    "symbol": "RBLBANK",
    "security_id": "18391",
    "exchange_id": "NSE"
  },
  {
    "symbol": "POWERINDIA",
    "security_id": "18457",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ICICIPRULI",
    "security_id": "18652",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NUVAMA",
    "security_id": "18721",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PNBHOUSING",
    "security_id": "18908",
    "exchange_id": "NSE"
  },
  {
    "symbol": "VBL",
    "security_id": "18921",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CUMMINSIND",
    "security_id": "1901",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MANAPPURAM",
    "security_id": "19061",
    "exchange_id": "NSE"
  },
  {
    "symbol": "KOTAKBANK",
    "security_id": "1922",
    "exchange_id": "NSE"
  },
  {
    "symbol": "LAURUSLABS",
    "security_id": "19234",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CHOLAFIN",
    "security_id": "19257",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BSE",
    "security_id": "19585",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TRENT",
    "security_id": "1964",
    "exchange_id": "NSE"
  },
  {
    "symbol": "DMART",
    "security_id": "19913",
    "exchange_id": "NSE"
  },
  {
    "symbol": "LICHSGFIN",
    "security_id": "1997",
    "exchange_id": "NSE"
  },
  {
    "symbol": "OBEROIRLTY",
    "security_id": "20242",
    "exchange_id": "NSE"
  },
  {
    "symbol": "IREDA",
    "security_id": "20261",
    "exchange_id": "NSE"
  },
  {
    "symbol": "IRFC",
    "security_id": "2029",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TATATECH",
    "security_id": "20293",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PRESTIGE",
    "security_id": "20302",
    "exchange_id": "NSE"
  },
  {
    "symbol": "M&M",
    "security_id": "2031",
    "exchange_id": "NSE"
  },
  {
    "symbol": "COALINDIA",
    "security_id": "20374",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HUDCO",
    "security_id": "20825",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CDSL",
    "security_id": "21174",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ASHOKLEY",
    "security_id": "212",
    "exchange_id": "NSE"
  },
  {
    "symbol": "AUBANK",
    "security_id": "21238",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MFSL",
    "security_id": "2142",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BDL",
    "security_id": "2144",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ABCAPITAL",
    "security_id": "21614",
    "exchange_id": "NSE"
  },
  {
    "symbol": "DIXON",
    "security_id": "21690",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ICICIGI",
    "security_id": "21770",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SBILIFE",
    "security_id": "21808",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BOSCHLTD",
    "security_id": "2181",
    "exchange_id": "NSE"
  },
  {
    "symbol": "IEX",
    "security_id": "220",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MAXHEALTH",
    "security_id": "22377",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BANDHANBNK",
    "security_id": "2263",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HAL",
    "security_id": "2303",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ASIANPAINT",
    "security_id": "236",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MUTHOOTFIN",
    "security_id": "23650",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PIIND",
    "security_id": "24184",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ONGC",
    "security_id": "2475",
    "exchange_id": "NSE"
  },
  {
    "symbol": "LTF",
    "security_id": "24948",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ADANIENT",
    "security_id": "25",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PREMIERENE",
    "security_id": "25049",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PGEL",
    "security_id": "25358",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MOTHERSON",
    "security_id": "25510",
    "exchange_id": "NSE"
  },
  {
    "symbol": "APLAPOLLO",
    "security_id": "25780",
    "exchange_id": "NSE"
  },
  {
    "symbol": "WAAREEENER",
    "security_id": "25907",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PIDILITIND",
    "security_id": "2664",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SWIGGY",
    "security_id": "27066",
    "exchange_id": "NSE"
  },
  {
    "symbol": "AUROPHARMA",
    "security_id": "275",
    "exchange_id": "NSE"
  },
  {
    "symbol": "RELIANCE",
    "security_id": "2885",
    "exchange_id": "NSE"
  },
  {
    "symbol": "INDUSTOWER",
    "security_id": "29135",
    "exchange_id": "NSE"
  },
  {
    "symbol": "KALYANKJIL",
    "security_id": "2955",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SAIL",
    "security_id": "2963",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SAMMAANCAP",
    "security_id": "30125",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SBIN",
    "security_id": "3045",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BAJAJHLDNG",
    "security_id": "305",
    "exchange_id": "NSE"
  },
  {
    "symbol": "VEDL",
    "security_id": "3063",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SHREECEM",
    "security_id": "3103",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MCX",
    "security_id": "31181",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TIINDIA",
    "security_id": "312",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NBCC",
    "security_id": "31415",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SIEMENS",
    "security_id": "3150",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BAJFINANCE",
    "security_id": "317",
    "exchange_id": "NSE"
  },
  {
    "symbol": "LODHA",
    "security_id": "3220",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ANGELONE",
    "security_id": "324",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SRF",
    "security_id": "3273",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SUNPHARMA",
    "security_id": "3351",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SUPREMEIND",
    "security_id": "3363",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TATAELXSI",
    "security_id": "3411",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CAMS",
    "security_id": "342",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TATAPOWER",
    "security_id": "3426",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TATACONSUM",
    "security_id": "3432",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TMPV",
    "security_id": "3456",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TATASTEEL",
    "security_id": "3499",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TITAN",
    "security_id": "3506",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TORNTPHARM",
    "security_id": "3518",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ADANIGREEN",
    "security_id": "3563",
    "exchange_id": "NSE"
  },
  {
    "symbol": "VOLTAS",
    "security_id": "3718",
    "exchange_id": "NSE"
  },
  {
    "symbol": "WIPRO",
    "security_id": "3787",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BEL",
    "security_id": "383",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MARICO",
    "security_id": "4067",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MOTHERSON",
    "security_id": "4204",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BHARATFORG",
    "security_id": "422",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HDFCAMC",
    "security_id": "4244",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SHRIRAMFIN",
    "security_id": "4306",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BHEL",
    "security_id": "438",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MPHASIS",
    "security_id": "4503",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BANKBARODA",
    "security_id": "4668",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HDFCLIFE",
    "security_id": "467",
    "exchange_id": "NSE"
  },
  {
    "symbol": "SONACOMS",
    "security_id": "4684",
    "exchange_id": "NSE"
  },
  {
    "symbol": "GAIL",
    "security_id": "4717",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BANKINDIA",
    "security_id": "4745",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CONCOR",
    "security_id": "4749",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ICICIBANK",
    "security_id": "4963",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MAZDOCK",
    "security_id": "509",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ETERNAL",
    "security_id": "5097",
    "exchange_id": "NSE"
  },
  {
    "symbol": "INDUSINDBK",
    "security_id": "5258",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BPCL",
    "security_id": "526",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BRITANNIA",
    "security_id": "547",
    "exchange_id": "NSE"
  },
  {
    "symbol": "AXISBANK",
    "security_id": "5900",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NATIONALUM",
    "security_id": "6364",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NYKAA",
    "security_id": "6545",
    "exchange_id": "NSE"
  },
  {
    "symbol": "POLICYBZR",
    "security_id": "6656",
    "exchange_id": "NSE"
  },
  {
    "symbol": "PAYTM",
    "security_id": "6705",
    "exchange_id": "NSE"
  },
  {
    "symbol": "JINDALSTEL",
    "security_id": "6733",
    "exchange_id": "NSE"
  },
  {
    "symbol": "EXIDEIND",
    "security_id": "676",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CHOLAFIN",
    "security_id": "685",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CIPLA",
    "security_id": "694",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HCLTECH",
    "security_id": "7229",
    "exchange_id": "NSE"
  },
  {
    "symbol": "GLENMARK",
    "security_id": "7406",
    "exchange_id": "NSE"
  },
  {
    "symbol": "CGPOWER",
    "security_id": "760",
    "exchange_id": "NSE"
  },
  {
    "symbol": "DABUR",
    "security_id": "772",
    "exchange_id": "NSE"
  },
  {
    "symbol": "INOXWIND",
    "security_id": "7852",
    "exchange_id": "NSE"
  },
  {
    "symbol": "ZYDUSLIFE",
    "security_id": "7929",
    "exchange_id": "NSE"
  },
  {
    "symbol": "DALBHARAT",
    "security_id": "8075",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BLUESTARCO",
    "security_id": "8311",
    "exchange_id": "NSE"
  },
  {
    "symbol": "TVSMOTOR",
    "security_id": "8479",
    "exchange_id": "NSE"
  },
  {
    "symbol": "DRREDDY",
    "security_id": "881",
    "exchange_id": "NSE"
  },
  {
    "symbol": "EICHERMOT",
    "security_id": "910",
    "exchange_id": "NSE"
  },
  {
    "symbol": "LICI",
    "security_id": "9480",
    "exchange_id": "NSE"
  },
  {
    "symbol": "RVNL",
    "security_id": "9552",
    "exchange_id": "NSE"
  },
  {
    "symbol": "POLYCAB",
    "security_id": "9590",
    "exchange_id": "NSE"
  },
  {
    "symbol": "DELHIVERY",
    "security_id": "9599",
    "exchange_id": "NSE"
  },
  {
    "symbol": "KPITTECH",
    "security_id": "9683",
    "exchange_id": "NSE"
  },
  {
    "symbol": "HAVELLS",
    "security_id": "9819",
    "exchange_id": "NSE"
  },
  {
    "symbol": "NIFTY",
    "security_id": "13",
    "exchange_id": "NSE"
  },
  {
    "symbol": "BANKNIFTY",
    "security_id": "25",
    "exchange_id": "NSE"
  },
  {
    "symbol": "FINNIFTY",
    "security_id": "27",
    "exchange_id": "NSE"
  },
  {
    "symbol": "MIDCPNIFTY",
    "security_id": "442",
    "exchange_id": "NSE"
  }
]

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
  strike_price: "26000",
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
    creator_name: creatorName,
    index_id: index,
    index_name:index_neme,
    description:description,
    config_json: {
      legs: legs
    },
    status:"pending"
  };
  const response = await apiRequest('POST','/api/trader-signal',{
    creator_name: creatorName,
    index_id: index,
    index_name:index_neme,
    description:description,
    config_json:{legs : legs},
    status:"pending"
  })

  console.log(response)
  console.log("FINAL SIGNAL JSON 👇");
  console.log(JSON.stringify(signalJSON, null, 2));
};



  const [marketType, setMarketType] = useState("options");
  const [formData, setFormData] = useState({
  lots: 1,
  position: "Sell",
  option_type: "Call",
  strike_price: "",
  expiry: "This Week"
});

  
  const expiryOptions =
  marketType === "futures"
  ? ["Current Month", "Next Month"]
  : ["This Week", "Next Week"];

  const [creatorName, setCreatorName] = useState("");
  
  const [legs, setLegs] = useState([createDefaultLeg()]);



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
      <Title mb={10} order={3} >
        Create Signal
      </Title>
      <Grid>
      
              {/* INSTRUMENT SETTINGS */}
      
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" p="lg">
      
                  <Title order={5} mb="md">
                    Instrument settings
                  </Title>
      
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
                </Card>
              </Grid.Col>
      
              {/* ENTRY SETTINGS */}
      
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" p="lg">
                   
                  <Title order={5} mb="md">
                    Creator Name
                  </Title>
                  <TextInput
  label="Name"
  value={creatorName}
  onChange={(e) => setCreatorName(e.target.value)}
/>

                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" p="lg">
                   
                  <Title order={5} mb="md">
                    Description
                  </Title>
                  <Textarea
                  value={description}
                  onChange={(e)=>setdescription(e.target.value)}
                  placeholder='Enter descripion'
  
/>

                </Card>
              </Grid.Col>
    
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

    <Leg
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

 
    <Flex align={"center"} justify={"center"} my={"2rem"} >
      <Button bg="#000" onClick={handleSaveSignal}>
  Save Signal
</Button>
    </Flex>

    </Container>
  )
}

export default Tradersignal
 