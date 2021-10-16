export interface Ebook {
  amazonId: string;
  authors?: string;
  cmoaId?: string;
  description?: string;
  comment?: string;
  createdAt: string;
  dmmId?: string;
  id: number;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  isPickup: boolean;
  isDeleted: boolean;
  isRecommended: boolean;
  points: number;
  price: number;
  publisher?: string;
  rentaId?: string;
  title: string;
  readAt?: string | null;
  updatedAt: string;
  format: Format;
  formatId: number;
  category: Category;
  categoryId: number;
  label: Label;
  labelId: number;
  reviewCount: number;
  reviewAverage: string;
  sales: Array<EbookOnSale>;
  tags: Array<EbookTag>;
}

export interface Author {
  Name?: string;
  Role?: string;
}

export interface EbookOnSale {
  id: number;
  ebookId: number;
  ebook: Ebook;
  saleId: number;
  sale: Sale;
  createdAt: string;
}

export interface EbookTag {
  id: number;
  ebookId: number;
  ebook: Ebook;
  tagId: number;
  tag: Tag;
  createdAt: string;
}

export interface Sale {
  id: number;
  title: string;
  description: string;
  saleEnds: string;
  isDeleted: boolean;
  isPublished: boolean;
  ebooks: Array<EbookOnSale>;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  ebooks: Array<EbookTag>;
}

export interface Format {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Label {
  id: number;
  name: string;
  slug: string;
  ebooks: Ebook[];
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  date: string;
  contentHtml: string;
}

export interface AdData {
  id: string;
  name: string;
  url: string;
}

export interface Archive {
  id: string;
  ebooks: Ebook[];
}

export interface Blog {
  id: string;
  title: string;
  description?: string;
  slug: string;
  image: string;
}
