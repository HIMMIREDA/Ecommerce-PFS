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
  price: number;
  categoryName: string;
  brandName: string;
  images: File[];
}

export type UpdateProductPayload = Omit<AddProductPayload, "images">;