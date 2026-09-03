const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

async function fetchFromStrapi(endpoint) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}?populate=*`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  const json = await res.json();
  return json.data;
}

export const getAbout = () => fetchFromStrapi("about-section");
export const getNavbar = () => fetchFromStrapi("navbar");
export const getBmiSection = () => fetchFromStrapi("bmi");
export const getFinalCTA = () => fetchFromStrapi("final-cta");
export const getFooter = () => fetchFromStrapi("footer");
export const getHero = () => fetchFromStrapi("hero");
export const getLocations = () => fetchFromStrapi("locations");
export const getPackages = () => fetchFromStrapi("packages");
export const getTestimonials = () => fetchFromStrapi("testimonials");

export const getTrainingProgramSection = () =>
  fetchFromStrapi("training-program-section");
export const getWhyChooseUs = () => fetchFromStrapi("why-choose-us");

export const getBmiCategory = () => fetchFromStrapi("bmi-categories");

export const getSupplements = () => fetchFromStrapi("supplements");
