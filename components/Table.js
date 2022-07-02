import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchEnsName } from "../utils";

const ListItem = ({ rank, image, name, owner, allTime, openseaUrl }) => {
  const [ownerAddress, setOwnerAddress] = useState(
    `${owner?.slice(0, 4)}...${owner?.slice(-4)}`
  );
  const init = async () => {
    const res = await fetchEnsName(owner);
    setOwnerAddress(res);
  };
  useEffect(() => {
    init();
  }, [owner]);
  return (
    <tr
      className={`text-slate-200  hover:shadow-xl transition-all ${
        rank % 2 == 0 ? "bg-zinc-800" : null
      }`}
    >
      <td className="flex items-center">
        <div className="flex px-4 w-[75px]">
          <h3 className="font-bold">{rank}</h3>
        </div>
        <a
          href={openseaUrl}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer"
        >
          <div className="flex flex-grow items-center space-x-3 py-4">
            <Image src={image} width={50} height={50} className="rounded-lg" />
            <h3 className="overflow-hidden line-clamp-2">{name}</h3>
          </div>
        </a>
      </td>
      <td className="overflow-hidden">
        <a
          href={`https://opensea.io/${owner}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600"
        >
          {ownerAddress}
        </a>
      </td>
      <td className="flex justify-center">{allTime}</td>
    </tr>
  );
};

const Table = ({ items }) => {
  return (
    <table className="table-fixed md:table-auto text-slate-200  min-w-[600px]">
      <thead>
        <tr>
          <th className="">
            <div className="flex">Item</div>
          </th>
          <th className="">
            <div className="flex">Owner</div>
          </th>
          <th className="">Scans</th>
        </tr>
      </thead>
      <tbody className="min-w-[600px]">
        {items?.map((item, index) => (
          <ListItem {...item} rank={index + 1} key={index} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
