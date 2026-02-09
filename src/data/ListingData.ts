import type { Listing } from '../types/Listing';

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Modern 3-Bedroom Apartment in Lekki Phase 1",
    description: "Stunning modern apartment with ocean views, spacious living areas, and top-tier amenities. Features include a fully equipped kitchen, en-suite bathrooms, and a private balcony. Perfect for families or professionals seeking luxury living.",
    location: "Lekki Phase 1, Lagos",
    agentID: "agent-001",
    createdAt: "2024-01-15T10:30:00Z",
    tags: ["apartment", "ocean view", "luxury", "parking"],
    price: "45000000",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    bedrooms: 3,
    type: "apartment",
    availability: "available",
    isArchived: false
  },
  {
    id: "2",
    title: "Luxurious 5-Bedroom Detached Duplex in Ikoyi",
    description: "Exquisite detached duplex in the heart of Ikoyi. This property boasts contemporary design, a private swimming pool, landscaped garden, and smart home features. Ideal for executives and high-net-worth individuals.",
    location: "Ikoyi, Lagos",
    agentID: "agent-002",
    createdAt: "2024-01-20T14:45:00Z",
    tags: ["duplex", "swimming pool", "smart home", "garden", "executive"],
    price: "180000000",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
    ],
    bedrooms: 5,
    type: "house",
    availability: "available",
    isArchived: false
  },
  {
    id: "3",
    title: "Cozy 2-Bedroom Flat in Yaba",
    description: "Affordable and comfortable 2-bedroom flat perfect for young professionals and small families. Located in a serene neighborhood with easy access to major roads, schools, and shopping centers.",
    location: "Yaba, Lagos",
    agentID: "agent-003",
    createdAt: "2024-02-01T09:15:00Z",
    tags: ["flat", "affordable", "serene", "accessible"],
    price: "25000000",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    ],
    bedrooms: 2,
    type: "apartment",
    availability: "sold",
    isArchived: false
  },
  {
    id: "4",
    title: "Elegant 4-Bedroom Terrace in Banana Island",
    description: "Premium terrace house in the prestigious Banana Island estate. Features include marble flooring, high ceilings, a private gym, and 24/7 security. Experience luxury island living at its finest.",
    location: "Banana Island, Lagos",
    agentID: "agent-001",
    createdAt: "2024-02-05T16:20:00Z",
    tags: ["terrace", "premium", "gym", "24/7 security", "island"],
    price: "350000000",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    bedrooms: 4,
    type: "house",
    availability: "available",
    isArchived: false
  },
  {
    id: "5",
    title: "Spacious 1-Bedroom Studio in Victoria Island",
    description: "Modern studio apartment ideal for singles or couples. Open-plan design with contemporary finishes, fitted kitchen, and access to shared amenities including a rooftop lounge and fitness center.",
    location: "Victoria Island, Lagos",
    agentID: "agent-004",
    createdAt: "2024-02-08T11:00:00Z",
    tags: ["studio", "modern", "rooftop", "fitness center", "VI"],
    price: "35000000",
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"
    ],
    bedrooms: 1,
    type: "apartment",
    availability: "pending",
    isArchived: false
  }
];