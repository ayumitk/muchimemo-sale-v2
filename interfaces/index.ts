export interface Ebook {
  amazonId: string;
  authors?: string;
  cmoaId?: string;
  comment?: string;
  createdAt: string;
  dmmId?: string;
  id: number;
  imageUrl?: string;
  isDeleted: boolean;
  isRecommended: boolean;
  points?: number;
  price?: number;
  publisher?: string;
  rentaId?: string;
  title: string;
  updatedAt: string;
  format: Format;
  formatId: number;
  category: Category;
  categoryId: number;
  reviewCount: number;
  reviewAverage: string;
  sales: Array<EbookOnSale>;
}

export interface Author {
  Name?: string;
  Role?: string;
}

export interface EbookOnSale {
  id:number;
  ebookId: number;
  ebook: Ebook;
  saleId: number;
  sale: Sale;
  createdAt: string;
}

export interface Sale {
  id: number;
  title: string;
  saleEnds: string;
  isDeleted:boolean;
  isPublished:boolean;
  ebooks: Array<EbookOnSale>;
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
