import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useCommunity } from "../context/CommunityContext";
import { getUserInfo } from "../config/firebase/functions";

const Avatar = ({
  src = "https://firebasestorage.googleapis.com/v0/b/discovr-98d5c.appspot.com/o/images%2Fdefault.jpg?alt=media&token=309521b5-1798-44a2-907d-46d499e41a5d",
  size = 60,
  uid,
  noRole,
  borderWidth = 3,
  styles,
}) => {
  const [color, setColor] = useState("blue");
  const [label, setLabel] = useState("");
  const [username, setUsername] = useState("");

  const { user } = useAuth();
  const community = useCommunity();

  const init = async () => {
    const data = await getUserInfo(uid);
    setUsername(data.username);
    if (!noRole && community) {
      const roles = data[community.slug]?.roles;
      if (!roles?.length) return;
      const roleColor = community[roles[0]].color;
      const roleLabel = community[roles[0]].label;
      setColor(roleColor);
      setLabel(roleLabel);
    }
  };

  useEffect(() => {
    if (!noRole && uid) {
      init();
    }
  }, [community, uid, user]);

  if (username) {
    return (
      <Link href={`/u/${username}`}>
        <div
          className={`flex center relative rounded-full cursor-pointer  group-avatar ${styles}`}
          style={{
            borderWidth: borderWidth,
            borderStyle: "solid",
            borderColor: color,
          }}
        >
          <Image
            src={src}
            width={size}
            height={size}
            className="rounded-full"
            objectFit="cover"
          />
          {label && (
            <div
              className="absolute rounded-full bg-green-500 scale-50 group-avatar-hover:scale-100 transition-all"
              style={{
                width: (size + 10) / 5,
                height: (size + 10) / 5,
                top: -5,
                left: -5,
                backgroundColor: color,
              }}
            >
              <div
                className={`hidden -translate-y-1/4 rounded-lg group-avatar-hover:block
          absolute top-0 whitespace-nowrap  ${
            color === "#ffffff" ? "text-black" : "text-white"
          } text-[.7em] py-1 px-2 shadow-lg`}
                style={{
                  backgroundColor: color,
                  left: size / 2.5,
                }}
              >
                {label}
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`flex center relative rounded-full cursor-pointer  group-avatar ${styles}`}
      style={{
        borderWidth: borderWidth,
        borderStyle: "solid",
        borderColor: color,
      }}
    >
      <Image
        src={src}
        width={size}
        height={size}
        className="rounded-full"
        objectFit="cover"
      />
      {label && (
        <div
          className="absolute rounded-full bg-green-500 scale-50 group-avatar-hover:scale-100 transition-all"
          style={{
            width: (size + 10) / 5,
            height: (size + 10) / 5,
            top: -5,
            left: -5,
            backgroundColor: color,
          }}
        >
          <div
            className={`hidden -translate-y-1/4 rounded-lg group-avatar-hover:block
      absolute top-0 whitespace-nowrap  ${
        color === "#ffffff" ? "text-black" : "text-white"
      } text-[.7em] py-1 px-2 shadow-lg`}
            style={{
              backgroundColor: color,
              left: size / 2.5,
            }}
          >
            {label}
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
