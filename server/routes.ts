import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { db } from "./db";
import { products } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed initial data if empty
  await seedDatabase();

  app.get(api.products.list.path, async (req, res) => {
    try {
      const allProducts = await storage.getProducts();
      res.json(allProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get(api.products.get.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      console.error("Error fetching product:", err);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  return httpServer;
}

async function seedDatabase() {
  try {
    const existingProducts = await storage.getProducts();
    if (existingProducts.length === 0) {
      await db.insert(products).values([
        {
          name: "EÍN Signature Kuftan",
          description: "Our signature piece crafted from premium breathable fabric with elegant gold accents. Perfect for both casual lounging and formal gatherings.",
          price: "150.00",
          imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
          inStock: true
        },
        {
          name: "Midnight Bronze Kuftan",
          description: "A dark, sophisticated design featuring intricate bronze embroidery along the neckline and cuffs. A true statement piece.",
          price: "185.00",
          imageUrl: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=800&auto=format&fit=crop",
          inStock: true
        },
        {
          name: "Cream Elegance Kuftan",
          description: "Minimalist cream kuftan that perfectly matches our brand aesthetic. Flowing silhouette and unmatched comfort.",
          price: "135.00",
          imageUrl: "https://images.unsplash.com/photo-1583391733958-d25e61c2c366?q=80&w=800&auto=format&fit=crop",
          inStock: true
        },
        {
          name: "Royal Beige Kuftan",
          description: "Luxurious beige kuftan with subtle texturing and elegant drape. An essential addition to any modern wardrobe.",
          price: "160.00",
          imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
          inStock: true
        }
      ]);
      console.log("Database seeded with initial products.");
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}
