export type ProductCategory =
  | 'industrial'
  | 'overlock'
  | 'buttonhole'
  | 'bartack'
  | 'pattern'
  | 'embroidery'
  | 'heavy-duty'
  | 'domestic'
  | 'specialty'
  | 'spare-parts'
  | 'accessories';

export type ProductManual = {
  label: string;
  url: string;
};

export type ProductParameterCell = {
  text: string;
  images: string[];
};

export type ProductParameterTable = {
  className: string;
  rows: ProductParameterCell[][];
};

export type Product = {
  id: string;
  slug: string;
  name: { uz: string; ru: string };
  category: ProductCategory;
  model: string;
  images: string[];
  price: number;
  oldPrice?: number;
  sortOrder?: number;
  inStock: boolean;
  featured?: boolean;
  newModel?: boolean;
  bestseller?: boolean;
  hidden?: boolean;
  placeholder?: boolean;
  officialUrl?: string;
  videoUrls?: string[];
  manuals?: ProductManual[];
  supportMaterialUrl?: string;
  officialDescriptionRu?: string;
  officialParameters?: ProductParameterTable[];
  shortDescription: { uz: string; ru: string };
  description: { uz: string; ru: string };
  specs: {
    maxSpeed?: string;
    threadCount?: string;
    needleCount?: string;
    needleSystem?: string;
    fabricType?: string;
    presserFoot?: string;
    voltage?: string;
    weight?: string;
    [key: string]: string | undefined;
  };
};
