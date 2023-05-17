import { Brand } from "./brand";
import { Category } from "./category";
import { Image } from "./image";

export interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  brand: Brand | null;
  category: Category;
  images: Image[] | [];
}
