interface Meal {
    [key: string]: string | null;
}

interface MealDetails {
    name: string;
    ingredients: { ingredient: string, measure: string }[];
    youtubeLink: string;
    thumbnail: string;
    tags: string[];
    area: string;
    category: string;
    id: string;
}
  
function getIngredients(meal: Meal): { ingredient: string, measure: string }[] {
    const ingredients: { ingredient: string, measure: string }[] = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      
      if (meal[ingredientKey] && meal[measureKey]) {
        const ingredient = meal[ingredientKey] as string;
        const measure = meal[measureKey] as string;
        
        ingredients.push({ ingredient, measure });
      }
    }
    
    return ingredients;
}


function getMealObject(meal: Meal): MealDetails {
    const name = meal.strMeal || ""
    const ingredients = getIngredients(meal);
    const youtubeLink = meal.strYoutube || "" ;
    const thumbnail = meal.strMealThumb || "";
    const tags = meal.strTags ? meal.strTags.split(",") : [];
    const area = meal.strArea || "";
    const category = meal.strCategory || "";
    const id = meal.idMeal || "";
    
    return {
      name,
      ingredients,
      youtubeLink,
      thumbnail,
      tags,
      area,
      category,
      id,
    };
  }
  


export {
    getMealObject, 
    Meal
}