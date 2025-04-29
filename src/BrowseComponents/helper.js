import ChemistProducts from "../Data/products/chemistProducts.json";
import DairyProducts from "../Data/products/dairyProducts.json";
import SnacksProducts from "../Data/products/snacksProducts.json";

const convertTextToURLSlug = (text) => {
  const clearText = text.replace(/[&\\#,+()$~%.":*?<>{}]/g, "").toLowerCase();
  return clearText.replace(/\s/g, "-");
};

const getCategoryLink = (category) => {
  const cat = convertTextToURLSlug(category.title);
  const sub = category.subcategories[0];
  const subcat = convertTextToURLSlug(sub.title);
  return `category/${cat}/${subcat}/${category.id}/${sub.id}`;
};

const shuffleItems = (unshuffled) => {
  if (!unshuffled) return [];
  return unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const getProductForCart = (product) => {
  const { product_id, name, price, mrp, unit, image_url } = product;
  return {
    id: product_id.toString(),
    title: name,
    subTitle: unit,
    image: image_url || "",
    price,
    mrp,
  };
};

const getProducts = () => {
  return [...ChemistProducts, ...DairyProducts, ...SnacksProducts];
};

const getProductById = (id) => {
  if (id) {
    const product = getProducts().find((item) => item.id === id);
    return product || null;
  }
};

export {
  convertTextToURLSlug,
  getCategoryLink,
  shuffleItems,
  getProductForCart,
  getProductById,
};
