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
  {
    id: "climb3",
    name: "Alpine Vista",
    slug: "alpine-vista",
    description: "An exhilarating climb with stunning views of the Alps.",
    minGrade: 6,
    maxGrade: 9,
    averageGrade: 7.5,
    elevationGain: 1500,
    distance: 7.0,
    city: "Chamonix",
    state: "Auvergne-Rhône-Alpes",
    country: "France",
    tags: ["breathtaking", "Alps", "advanced"],
    photos: [
      "https://images.unsplash.com/photo-1558980394-dbb9770398b1?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-06-10T09:00:00Z",
    updatedAt: "2023-06-11T09:00:00Z",
  },
  {
    id: "climb4",
    name: "Dolomite Challenge",
    slug: "dolomite-challenge",
    description: "A steep and technical climb through the dramatic Dolomites.",
    minGrade: 7,
    maxGrade: 10,
    averageGrade: 8.5,
    elevationGain: 1800,
    distance: 6.5,
    city: "Cortina d'Ampezzo",
    state: "Veneto",
    country: "Italy",
    tags: ["steep", "Dolomites", "technical"],
    photos: [
      "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562911666-31a0b0a69a7e?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-07-20T10:00:00Z",
    updatedAt: "2023-07-21T10:00:00Z",
  },
  {
    id: "climb5",
    name: "Sierra Serenity",
    slug: "sierra-serenity",
    description: "A peaceful climb through the serene Sierra Nevada mountains.",
    minGrade: 3,
    maxGrade: 5,
    averageGrade: 4,
    elevationGain: 1000,
    distance: 5.0,
    city: "Granada",
    state: "Andalusia",
    country: "Spain",
    tags: ["peaceful", "Sierra Nevada", "serene"],
    photos: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1524231719719-1d94e8e9a0e2?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-08-15T11:00:00Z",
    updatedAt: "2023-08-16T11:00:00Z",
  },
  {
    id: "climb6",
    name: "Bavarian Traverse",
    slug: "bavarian-traverse",
    description:
      "A scenic journey through the lush landscapes and rolling hills of Bavaria.",
    minGrade: 4,
    maxGrade: 6,
    averageGrade: 5,
    elevationGain: 1100,
    distance: 8.0,
    city: "Garmisch-Partenkirchen",
    state: "Bavaria",
    country: "Germany",
    tags: ["scenic", "rolling-hills", "Bavaria"],
    photos: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506748686219-c5cb9f6beae7?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-09-10T09:00:00Z",
    updatedAt: "2023-09-11T09:00:00Z",
  },
  {
    id: "climb7",
    name: "Black Forest Ascent",
    slug: "black-forest-ascent",
    description:
      "An enchanting climb through the dense, mystical woods of the Black Forest.",
    minGrade: 5,
    maxGrade: 7,
    averageGrade: 6,
    elevationGain: 1300,
    distance: 6.0,
    city: "Freiburg",
    state: "Baden-Württemberg",
    country: "Germany",
    tags: ["enchanting", "dense-woods", "Black-Forest"],
    photos: [
      "https://images.unsplash.com/photo-1568625501381-a11a5f1f1ede?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1568625501745-2474789f37f9?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-10-20T10:00:00Z",
    updatedAt: "2023-10-21T10:00:00Z",
  },
  {
    id: "climb8",
    name: "Saxon Switzerland Challenge",
    slug: "saxon-switzerland-challenge",
    description:
      "A rigorous climb featuring the unique sandstone formations of Saxon Switzerland.",
    minGrade: 7,
    maxGrade: 9,
    averageGrade: 8,
    elevationGain: 1400,
    distance: 7.5,
    city: "Bad Schandau",
    state: "Saxony",
    country: "Germany",
    tags: ["rigorous", "sandstone-formations", "Saxon-Switzerland"],
    photos: [
      "https://images.unsplash.com/photo-1581323127298-92e8e1a0d0d6?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1581323127360-8e60a4b381d3?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-11-15T11:00:00Z",
    updatedAt: "2023-11-16T11:00:00Z",
  },
  {
    id: "climb9",
    name: "Swabian Alb Adventure",
    slug: "swabian-alb-adventure",
    description:
      "A picturesque climb offering panoramic views of the Swabian Alb's unique landscapes.",
    minGrade: 4,
    maxGrade: 6,
    averageGrade: 5,
    elevationGain: 950,
    distance: 5.5,
    city: "Reutlingen",
    state: "Baden-Württemberg",
    country: "Germany",
    tags: ["picturesque", "panoramic", "Swabian-Alb"],
    photos: [
      "https://images.unsplash.com/photo-1581323127298-92e8e1a0d0d6?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1581323127360-8e60a4b381d3?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-02T10:00:00Z",
  },
  {
    id: "climb10",
    name: "Heidelberg Heights",
    slug: "heidelberg-heights",
    description:
      "Experience the historic charm of Heidelberg as you climb its surrounding hills.",
    minGrade: 3,
    maxGrade: 5,
    averageGrade: 4,
    elevationGain: 700,
    distance: 4.0,
    city: "Heidelberg",
    state: "Baden-Württemberg",
    country: "Germany",
    tags: ["historic", "charming", "Heidelberg"],
    photos: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506748686219-c5cb9f6beae7?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-12-15T11:00:00Z",
    updatedAt: "2023-12-16T11:00:00Z",
  },
  {
    id: "climb11",
    name: "Black Forest Peak",
    slug: "black-forest-peak",
    description:
      "Ascend to the highest peaks of the Black Forest for an unforgettable climbing experience.",
    minGrade: 6,
    maxGrade: 8,
    averageGrade: 7,
    elevationGain: 1200,
    distance: 6.5,
    city: "Freudenstadt",
    state: "Baden-Württemberg",
    country: "Germany",
    tags: ["high-peaks", "unforgettable", "Black-Forest"],
    photos: [
      "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562911666-31a0b0a69a7e?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-01-05T09:30:00Z",
    updatedAt: "2024-01-06T09:30:00Z",
  },
  {
    id: "climb12",
    name: "Offenburg Outlook",
    slug: "offenburg-outlook",
    description:
      "A serene climb leading to a spectacular view over Offenburg and the Rhine valley.",
    minGrade: 3,
    maxGrade: 5,
    averageGrade: 4,
    elevationGain: 600,
    distance: 4.5,
    city: "Offenburg",
    state: "Baden-Württemberg",
    country: "Germany",
    tags: ["serene", "viewpoint", "Rhine-valley"],
    photos: [
      "https://images.unsplash.com/photo-1573485544620-71c1130d9a30?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1573485545053-63d11a4a6a44?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-02-10T08:30:00Z",
    updatedAt: "2024-02-11T08:30:00Z",
  },
  {
    id: "climb13",
    name: "Vineyard Venture",
    slug: "vineyard-venture",
    description:
      "Wander through the rolling vineyards surrounding Offenburg, a blend of nature and culture.",
    minGrade: 2,
    maxGrade: 4,
    averageGrade: 3,
    elevationGain: 500,
    distance: 3.8,
    city: "Offenburg",
    state: "Baden-Württemberg",
    country: "Germany",
    tags: ["vineyards", "cultural", "nature"],
    photos: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506748686219-c5cb9f6beae7?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-03-15T09:45:00Z",
    updatedAt: "2024-03-16T09:45:00Z",
  },
  {
    id: "climb14",
    name: "Ortenberg Castle Climb",
    slug: "ortenberg-castle-climb",
    description:
      "A historic route leading to the Ortenberg Castle, offering both a physical challenge and a lesson in history.",
    minGrade: 5,
    maxGrade: 7,
    averageGrade: 6,
    elevationGain: 750,
    distance: 5.0,
    city: "Offenburg",
    state: "Baden-Württemberg",
    country: "Germany",
    tags: ["historic", "castle", "challenging"],
    photos: [
      "https://images.unsplash.com/photo-1568625501381-a11a5f1f1ede?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1568625501745-2474789f37f9?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-04-20T11:00:00Z",
    updatedAt: "2024-04-21T11:00:00Z",
  },
];
