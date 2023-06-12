import { OrderStatus } from "./order";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  address: string;
  phoneNumber: string;
}

export interface AddBrandPayload {
  name: string;
  image: File;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface AddCategoryPayload {
  name: string;
  description: string;
}

export type UpdateCategoryPayload = Partial<AddCategoryPayload>;

export interface AddProductPayload {
  name: string;
  description: string;
  quantity: string;
  price: string;
  categoryName: string;
  brandName: string;
  images: File[];
}

export type UpdateProductPayload = Omit<AddProductPayload, "images">;

export interface AddReviewPayload {
  productId: string;
  rating: number;
  comment: string;
}

export interface UpdateOrderPayload {
  status: OrderStatus;
}

export interface UpdatePasswordPayload {
  newPassword: string;
  oldPassword: string;
}
