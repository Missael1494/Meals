import React from 'react'
import { Card } from '../UI/Card';
import { MealItem } from './MealItem.js/MealItem';

import classes from './AvailableMeals.module.css'
import { useEffect, useState } from 'react';




export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://section11-53ad6-default-rtdb.firebaseio.com/meals.json');
      console.log('response', response)

      if (!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      console.log('responseData', responseData);

      const loadedMeals = [];

      for (const key in responseData) {
        console.log('key', key);
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
                                           //try {
     fetchMeals().catch((error) => {       //    await fetchMeals();}
      setIsLoading(false);                                //catch (error) { setIsLoading(false);
      setHttpError(error.message);                               //setHttpError(error.message);
      
     })
     
      
    },[])

  if(isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
    <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
    )
  
  }

    const mealList = meals.map( meal => 
        <MealItem 
            key={meal.id} 
            id={meal.id}
            name={meal.name} 
            description={meal.description} 
            price={meal.price}
        />
    );

  return (
    <section className={classes.meals}>
        <Card>
            <ul>
                {mealList}
            </ul>
        </Card>
    </section>
  )
}
