import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@shared/schema";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error("Supabase products.list error:", error);
        throw new Error("Failed to fetch products");
      }

      return parseWithLogging(
        z.array(z.custom<Product>()),
        data,
        "products.list",
      );
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id || isNaN(id)) throw new Error("Invalid product ID");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows found
          return null;
        }

        console.error("Supabase products.get error:", error);
        throw new Error("Failed to fetch product");
      }

      if (!data) {
        return null;
      }

      return parseWithLogging(
        z.custom<Product>(),
        data,
        "products.get",
      );
    },
    enabled: !!id,
  });
}
