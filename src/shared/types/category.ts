type IngredientsCategory = {
    type: 'ingredient';
    category: 
      | 'Flours' 
      | 'Sugars' 
      | 'Leavening Agents' 
      | 'Fats and Oils' 
      | 'Dairy' 
      | 'Eggs' 
      | 'Flavors and Extracts' 
      | 'Spices' 
      | 'Fruits and Nuts' 
      | 'Chocolate and Confections' 
      | 'Sweeteners and Syrups' 
      | 'Thickening Agents' 
      | 'Seasonings';
  };
  
  type SuppliesCategory = {
    type: 'supply';
    category: 
      | 'Baking supplies' 
      | 'Packaging' 
      | 'Cleaning supplies' 
      | 'Miscellaneous';
  };
  
  type EquipmentCategory = {
    type: 'equipment';
    category: 
      | 'Decorating tools' 
      | 'Baking pans';
  };
  
  export type Category = IngredientsCategory | SuppliesCategory | EquipmentCategory;
  