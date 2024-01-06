import type { Climb } from "@type-definitions/Climb";

export const climbs: Climb[] = [
  {
    id: "climb1",
    name: "Majestic Peak",
    slug: "majestic-peak",
    description:
      "A challenging and scenic climb up the Majestic Peak, offering breathtaking views.",
    minGrade: 5,
    maxGrade: 8,
    averageGrade: 6.5,
    elevationGain: 1200,
    distance: 5.2,
    city: "Mountainville",
    state: "Colorado",
    country: "USA",
    tags: ["scenic", "challenging", "popular"],
    photos: [
      "https://images.unsplash.com/photo-1501610862033-8787c0add568?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3ljbGluZyUyMG1vdW50YWluc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1534146789009-76ed5060ec70?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3ljbGluZyUyMG1vdW50YWluc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1699389359817-6d17d0880c2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGN5Y2xpbmclMjBtb3VudGFpbnN8ZW58MHx8MHx8fDA%3D",
    ],
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-02T12:00:00Z",
  },
  {
    id: "climb2",
    name: "River's Edge",
    slug: "rivers-edge",
    description:
      "A serene climb alongside a river, perfect for beginners or those looking for a relaxing hike.",
    minGrade: 2,
    maxGrade: 4,
    averageGrade: 3,
    elevationGain: 800,
    distance: 3.5,
    city: "Riverstown",
    state: "Oregon",
    country: "USA",
    tags: ["serene", "beginner-friendly", "river"],
    photos: [
      "https://images.unsplash.com/photo-1687860910109-fb6c7a6c8a6b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3ljbGluZyUyMG1vdW50YWluc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1699389359923-99c59a2e064f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGN5Y2xpbmclMjBtb3VudGFpbnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1699389359830-7b49eac067ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN5Y2xpbmclMjBtb3VudGFpbnN8ZW58MHx8MHx8fDA%3D",
    ],
    createdAt: "2023-02-15T08:00:00Z",
    updatedAt: "2023-02-16T08:00:00Z",
  },
];
