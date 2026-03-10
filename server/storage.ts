import { db } from "./db";
import { products, type ProductResponse } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<ProductResponse[]>;
  getProduct(id: number): Promise<ProductResponse | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<ProductResponse[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<ProductResponse | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
}

export const storage = new DatabaseStorage();
