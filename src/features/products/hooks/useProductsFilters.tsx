
import { useState, useMemo } from 'react';
import { Product } from './useProducts';
import { SelectOption } from '@/src/components/AdvancedSelect/AdvancedSelect';

export function useProductsFilters(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<SelectOption | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [minRating, setMinRating] = useState<number>(0);

  const categoryOptions = useMemo(() => {
    const categories = new Set<string>();
    products.forEach(product => {
      if (product.category) categories.add(product.category);
    });
    return Array.from(categories).map((category, index) => ({
      id: index,
      label: category,
      value: category,
    }));
  }, [products]);

  const brandOptions = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(product => {
      if (product.brand) brands.add(product.brand);
    });
    return Array.from(brands).map((brand, index) => ({
      id: index,
      label: brand,
      value: brand,
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      if (selectedCategory && product.category !== selectedCategory.value) {
        return false;
      }

      if (selectedBrand && product.brand !== selectedBrand.value) {
        return false;
      }

      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      if (product.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, minPrice, maxPrice, minRating]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedBrand(null);
    setMinPrice(0);
    setMaxPrice(10000);
    setMinRating(0);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedBrand || minPrice > 0 || maxPrice < 10000 || minRating > 0;

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    categoryOptions,
    brandOptions,
    filteredProducts,
    clearFilters,
    hasActiveFilters,
  };
}