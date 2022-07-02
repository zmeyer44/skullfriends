import { createContext, useContext, useEffect, useState } from "react";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";

const CommunityContext = createContext({});
export const useCommunity = () => useContext(CommunityContext);
export const CommunityContextProvider = ({ children }) => {
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const router = useRouter();
  const { communityId } = router.query;

  useEffect(() => {
    if (!community) getCommunityInfo();
    router.events.on("routeChangeComplete", getCommunityInfo);
    return () => {
      router.events.off("routeChangeComplete", getCommunityInfo);
    };
  }, [router.events, router, user]);

  async function getCommunityInfo() {
    if (!communityId) return;
    if (communityId == community?.id) return;
    const data = await getDoc(doc(db, "communities", communityId));
    if (data) {
      setCommunity(data.data());
    }
  }

  return (
    <CommunityContext.Provider value={community}>
      {children}
    </CommunityContext.Provider>
  );
};
