/*
 * This file contains known events that created a PCD.
 * see: https://0xparc.notion.site/ZuAuth-Quick-Start-bd128b90f3a64a588dbcbe85b123ad66#ad7c80808fd04a48ba898eab60f530fb.
 *
 * TODO: Create a way to fetch this from a public database or even better from the blockchain.
 */
import { PipelineEdDSATicketZuAuthConfig } from "@pcd/passport-interface";

export const ZUZALU_ZUAUTH_CONFIG: PipelineEdDSATicketZuAuthConfig[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
      "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f",
    ],
    eventId: "5de90d09-22db-40ca-b3ae-d934573def8b",
    eventName: "Zuzalu",
    productId: "5ba4cd9e-893c-4a4a-b15b-cf36ceda1938",
    productName: "Resident",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
      "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f",
    ],
    eventId: "5de90d09-22db-40ca-b3ae-d934573def8b",
    eventName: "Zuzalu",
    productId: "53b518ed-e427-4a23-bf36-a6e1e2764256",
    productName: "Visitor",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
      "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f",
    ],
    eventId: "5de90d09-22db-40ca-b3ae-d934573def8b",
    eventName: "Zuzalu",
    productId: "10016d35-40df-4033-a171-7d661ebaccaa",
    productName: "Organizer",
  },
];

export const ZUCONNECT_ZUAUTH_CONFIG: PipelineEdDSATicketZuAuthConfig[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
      "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f",
    ],
    eventId: "91312aa1-5f74-4264-bdeb-f4a3ddb8670c",
    eventName: "ZuConnect",
    productId: "cc9e3650-c29b-4629-b275-6b34fc70b2f9",
    productName: "Resident",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
      "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f",
    ],
    eventId: "54863995-10c4-46e4-9342-75e48b68d307",
    eventName: "ZuConnect",
    productId: "d2123bf9-c027-4851-b52c-d8b73fc3f5af",
    productName: "First Week",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
      "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f",
    ],
    eventId: "797de414-2aec-4ef8-8655-09df7e2b6cc6",
    eventName: "ZuConnect",
    productId: "d3620f38-56a9-4235-bea8-0d1dba6bb623",
    productName: "Scholarship",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
      "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f",
    ],
    eventId: "f7370f63-b9ae-480c-9ded-0663f1922bef",
    eventName: "ZuConnect",
    productId: "0179ed5b-f265-417c-aeaa-ac61a525c6b0",
    productName: "Organizer",
  },
];

export const EDGE_CITY_DENVER_ZUAUTH_CONFIG: PipelineEdDSATicketZuAuthConfig[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "7eb74440-1891-4cd5-a351-b24a5b03e669",
    eventName: "Edge City Denver",
    productId: "e1dc58c3-2089-4c17-b282-bc37ddbb30b0",
    productName: "General Admission",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "7eb74440-1891-4cd5-a351-b24a5b03e669",
    eventName: "Edge City Denver",
    productId: "881ceef7-e38c-4611-9de2-1506d13b8f48",
    productName: "Early Bird",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "7eb74440-1891-4cd5-a351-b24a5b03e669",
    eventName: "Edge City Denver",
    productId: "2127ea78-4144-4850-8847-b1bec9e53bd1",
    productName: "Organizer",
  },
];

export const VITALIA_ZUAUTH_CONFIG: PipelineEdDSATicketZuAuthConfig[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "0d3388a18b89dd012cb965267ab959a6ca68f7e79abfdd5de5e3e80f86821a0d",
      "0babbc67ab5da6c9245137ae75461f64a90789ae5abf3737510d5442bbfa3113",
    ],
    eventId: "9ccc53cb-3b0a-415b-ab0d-76cfa21c72ac",
    eventName: "Vitalia",
    productId: "cd3f2b06-e520-4eff-b9ed-c52365c60848",
    productName: "Resident",
  },
];

export const ETHBERLIN_ZUAUTH_CONFIG: any[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "53edb3e7-6733-41e0-a9be-488877c5c572",
  },
];

export const ETHPRAGUE_ZUAUTH_CONFIG: PipelineEdDSATicketZuAuthConfig[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "c2306074-d6e1-4c08-82d0-022849f3ce37",
    productName: "Early Bird",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "ced4eac5-715c-4081-aaa5-27e2b0a426fd",
    productName: "Regular Ticket",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "e5ac8393-8a7f-4a4a-8792-541418c6151b",
    productName: "Hacker",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "f0cd739c-313d-466a-827d-00b2cb8bc1e7",
    productName: "Sponsor",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "955d452b-e441-466b-9071-fab575150864",
    productName: "Student / Academic",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "15621325-a7fd-4651-b961-524445f7e9bb",
    productName: "test ticket",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "eb0e5421-f506-4daa-8eb1-953fce0a4ccb",
    productName: "Mergooor Pass",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "7ac1a055-4e9d-445c-af6e-491941f8822c",
    productName: "Speaker",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "408b3dc0-864e-4e87-9ce4-5eebbb672361",
    productName: "Honored Guest",
  },
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "508313ea-f16b-4729-bdf0-281c64493ca9",
    eventName: "ETHPrague 2024",
    productId: "408b3dc0-864e-4e87-9ce4-5eebbb672362",
    productName: "Regular Ticket (Comp)",
  },
];
export const EXAMPLE_TICKET_ZUAUTH_CONFIG: any[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
    ],
    eventId: "3cf75131-6631-5096-b2e8-03c25d00f4de",
  }
]

export const isETHBerlinPublicKey = (signer: [string, string]) => {
  return (
    signer[0] === "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003" &&
    signer[1] === "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
  );
};

export const ZUAUTH_CONFIG: PipelineEdDSATicketZuAuthConfig[] = [
  // ...ZUZALU_ZUAUTH_CONFIG,
  // ...ZUCONNECT_ZUAUTH_CONFIG,
  // ...EDGE_CITY_DENVER_ZUAUTH_CONFIG,
  // ...VITALIA_ZUAUTH_CONFIG,
  ...ETHBERLIN_ZUAUTH_CONFIG,
  // ...EXAMPLE_TICKET_ZUAUTH_CONFIG,
  // ...ETHPRAGUE_ZUAUTH_CONFIG,
];
