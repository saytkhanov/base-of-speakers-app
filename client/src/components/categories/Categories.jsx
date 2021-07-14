import React, { useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../redux/features/categories";
import { NavLink } from "react-router-dom";
import CategoryPreloader from "./CategoryPreloader";

function Categories(props) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);

  useEffect(() => dispatch(loadCategories()), [dispatch]);

  if (loading) {
    return <CategoryPreloader />;
  }

  console.log(loading)
  console.log(categories);

  return (
    <>
      <Box mr={3}>
        <Button color="inherit" variant="outlined">
          <NavLink to="/speakers">Все дикторы</NavLink>
        </Button>
      </Box>
      {categories.map((item) => {
        return (
          <Box mr={3}>
            <Button color="inherit" variant="outlined">
              <NavLink to={`/category/${item._id}/speakers`}>{item.gender}</NavLink>
            </Button>
          </Box>
        );
      })}
    </>
  );
}

export default Categories;
