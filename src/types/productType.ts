export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  slug?: string;
  images: string[];
};
export type CartItems = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
};

export type UpdateProductDto = {
    id: number;
    title: string;
    price: number;
    images: string[];
  };

export type ProductDetailType = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  discountPercentage: number;
  stock: number;
 category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  reviews: Reviews[];
};

export type Reviews = {
  rating: number;
  comment: string;
  date: number;
  recieverName: string;
  reviewerEmail: string;
};
