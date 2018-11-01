import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Chip, Card, CardContent, CardActions, CardActionArea, CardMedia, Typography, Button, withStyles, Grid } from '@material-ui/core';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

const ProductSingle = ({ classes, product }) => {
  console.log(product);
  return (
    <Grid item xs={12} lg={3}>
      <Card className={classes.card}>
        <CardActionArea to={`/products/${product.id}`} component={Link}>
          <CardMedia
            className={classes.media}
            image={product.photo}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography>
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {product.categories.map(category => (
          <Chip label={category.name} />
        ))}
        <CardActions>
          <Button size="small" color="primary">
            +
          </Button>
          <Typography>
            0
          </Typography>
          <Button size="small" color="primary">
            -
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

const mapStateToProps = ({ products }) => {
  return { products }
}

export default withStyles(styles)(connect(mapStateToProps)(ProductSingle));