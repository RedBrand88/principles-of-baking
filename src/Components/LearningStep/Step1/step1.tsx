
const Step1 = () => {
  return (
    <div>
      <p>
        This first lesson will cover bakers percentages. Bakers percentages are a way to express the ratio of ingredients in a recipe.
        Understanding bakers percentages will help you understand how to adjust a recipe to fit your needs. It also allows you to tweak
        a recipe you have to change the results you get to suit your tastes. It also allows you to create your own recipes.
      </p>
      <p>
        The basic formula for bakers percentages is:
        <ul>
          <li>Ingredient Percentage = (Ingredient Weight / Flour Weight) * 100</li>
        </ul>
      </p>
      <p>
        Generally flour is measured in grams and is the ingredient that all other ingredients are measured against.
        So the weight of the flour is always 100% and the other ingredients are expressed as a percentage of the flour weight.
      </p>
      <p>
        For example, if a recipe calls for 500g of flour, 300g of water, and 10g of salt, the bakers percentages would be:
        <ul>
          <li>Flour: 100%</li>
          <li>Water: 60% → 300 / 500 = 0.6 * 100 = 60</li>
          <li>Salt: 2% → 10 / 500 = 0.02 * 100 = 2</li>
        </ul>
      </p>
      <p>
        To practice find a recipe you like and calculate the bakers percentages for each ingredient.
      </p>
      <p>
        As an advanced exercise you can scale the recipe up or down then bake the new scaled up or scaled down recipe to see if it works.
      </p> 
    </div>
  );
};

export default Step1;
