import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import { fetchEnsName } from "../utils";

const Item = ({ title, value }) => {
  return (
    <div className="flex py-2 justify-between">
      <h3>{title}</h3>
      <h3 className="">{value}</h3>
    </div>
  );
};

const LargeInfoBox = ({ image, name, owner, num_sales, ui, download }) => {
  const [ownerAddress, setOwnerAddress] = useState(
    `${owner?.slice(0, 4)}...${owner?.slice(-4)}`
  );
  const init = async () => {
    const res = await fetchEnsName(owner);
    setOwnerAddress(res);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div
      className={`flex flex-col bg-white w-[300px] h-auto m-4 rounded-lg border-red-600 border-2  drop-shadow-lg`}
    >
      <div className="flex flex-col items-center">
        <Image src={image} height={300} width={300} className="rounded-md" />
      </div>
      <div className="flex flex-col py-2 px-3 divide-y divide-slate-200 ">
        <h3 className="py-2 font-semibold">{name}</h3>
        <Item title="Owner" value={ownerAddress} />
        <Item title="Uniquness Index" value={ui} />
        <Item title="Number of Sales" value={num_sales} />
      </div>
      <div className="flex justify-around items-center py-4">
        <Button small label="Download QR Code" onClick={() => download()} />
      </div>
    </div>
  );
};

export default LargeInfoBox;
