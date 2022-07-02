const community = {
  slug: "cryptoskulls",
  displayName: "CryptoSkulls",
  discrption: "Short text description of project and community",
  navigation: [
    {
      label: "Main",
      tabs: [
        {
          label: "Home",
          icon: "home",
          href: "home",
        },
        {
          label: "The Boneyard",
          icon: "skull",
          options: [
            {
              label: "Skull Tools",
              icon: "tools",
              href: "chat/skulltools",
            },
            {
              label: "Skulls Build",
              icon: "building",
              href: "chat/skullsbuild",
            },
          ],
        },
      ],
    },
    {
      label: "Chats",
      tabs: [
        {
          label: "Home",
          icon: "home",
          href: "home",
        },
        {
          label: "The Boneyard",
          icon: "skull",
          options: [
            {
              label: "Skull Tools",
              icon: "tools",
              href: "chat/skulltools",
            },
            {
              label: "Skulls Build",
              icon: "building",
              href: "chat/skullsbuild",
            },
          ],
        },
      ],
    },
  ],
  sideInfo: [
    {
      slug: "recentActivity",
      label: "Recent Activity",
      internal: true,
    },
    {
      slug: "officialLinks",
      label: "Official Links",
      internal: false,
    },
  ],
  roles: ["admin", "moderator", "whale", "og", "owner"],
};
