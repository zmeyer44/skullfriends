import { ethers } from "ethers";
import axios from "axios";
import { CollectionsMap } from "../config/Constants";

export async function fetchEnsName(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const res = await provider.lookupAddress(address);
  if (res) {
    return res.charAt(0).toUpperCase() + res.slice(1);
  } else {
    return `${address?.slice(0, 4)}...${address?.slice(-4)}`;
  }
}

export function shortTimeDifference(time) {
  let current = Date.now();
  let msPerMin = 60 * 1000;
  let msPerHour = msPerMin * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  var elapsed = current - time;

  if (!elapsed) {
    return "";
  } else if (elapsed < 6000) {
    return "now";
  } else if (elapsed < msPerMin) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    if (Math.round(elapsed / msPerMin) > 1) {
      return Math.round(elapsed / msPerMin) + " minutes ago";
    } else {
      return "1 minute ago";
    }
  } else if (elapsed < msPerHour * 2) {
    return "1 hour ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    if (Math.round(elapsed / msPerDay) > 1) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else {
      return "1 day ago";
    }
  } else if (elapsed < msPerYear) {
    if (Math.round(elapsed / msPerMonth) > 1) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return "1 month ago";
    }
  } else {
    if (Math.round(elapsed / msPerYear) > 1) {
      return Math.round(elapsed / msPerYear) + " years ago";
    } else {
      return "1 year ago";
    }
  }
}

export function getMetaData(url) {
  if (validateUrl(url)) {
    return axios
      .post(
        "https://us-central1-discovr-98d5c.cloudfunctions.net/fetchMetaData",
        { url }
      )
      .catch((e) => console.error("Meta Data Error: ", e));
  }
}
function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

export function validateEmail(value, setEmailError) {
  if (value == "") {
    setEmailError("");
    return false;
  } else if (isValidEmail(value)) {
    setEmailError("");
    return true;
  } else {
    setEmailError("Must be a valid email");
    return false;
  }
}

export function validatePassword(value, setPasswordError) {
  if (value.length < 6) {
    console.log("passerr");
    setPasswordError("Password must be atleast 6 characters");
    return false;
  } else {
    setPasswordError("");
    return true;
  }
}

export function processText(text) {
  const lines = text.split("\n");
  const linesArray = lines.map((line) => {
    var urlFormat = /^(ftp|http|https):\/\/[^ "]+$/;
    const words = line.split(" ");
    const contentLength = words.length;
    const wordsArray = words.map((word) => {
      if (urlFormat.test(word)) {
        return (
          <a href={word} className="text-blue-600">
            {word}
          </a>
        );
      } else {
        return word;
      }
    });
    return wordsArray.join(" ");
  });
  return linesArray.join("\n");
}

export function urlify(text) {
  let strippedString = text.replace(/(<([^>]+)>)/gi, "");
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return strippedString.replace(urlRegex, function (url) {
    return `<a href="${url}" target="_blank" rel="noreferrer" class="text-blue-600 hover:underline break-all">${url}</a>`;
  });
}

export function cleanUrl(url) {
  return url.replace(/^https?:\/\//, "");
}

export async function checkOwnership(account, collection) {
  const options = { method: "GET", headers: { Accept: "application/json" } };

  return await fetch(
    `https://api.opensea.io/api/v1/collections?asset_owner=${account}&offset=0&limit=300`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.find((col) => col.slug == collection))
    .then((sel) => sel?.owned_asset_count)
    .catch((err) => console.error(err));
}

export async function fetchAssets(address) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-KEY": "c61f65614f3747cc831fa9b73c753997",
    },
  };

  return fetch(
    `https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&limit=200&include_orders=false`,
    options
  )
    .then((response) => response.json())
    .then((response) => response?.assets)
    .catch((err) => console.error(err));
}
export async function fetchCollections(address) {
  const options = { method: "GET", headers: { Accept: "application/json" } };

  return fetch(
    `https://api.opensea.io/api/v1/collections?asset_owner=${address}&offset=0&limit=200`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
