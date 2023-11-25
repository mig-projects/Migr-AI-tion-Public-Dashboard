// Fetch all categories from the database
import supabase from "./configuration.js";

const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select();
  return { data, error };
}

// Fetch all tags from the database
const fetchTags = async () => {
  const {data, error} = await supabase.rpc('get_tags').select();
  return { data, error };
}

export {
  fetchCategories,
  fetchTags,
};