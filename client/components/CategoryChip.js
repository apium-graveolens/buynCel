import React from 'react';
import { Link } from 'react-router-dom';
import { Chip, withStyles } from '@material-ui/core';

const styles = {
  chip: {
    margin: 3
  },
}

const CategoryChip = ({ category, classes }) => (
  <Chip
    component={Link}
    to={`/categories/${category.name}`}
    className={classes.chip}
    key={category.id}
    label={category.name}
  />
)

export default withStyles(styles)(CategoryChip);