import React, { Fragment } from 'react'
import { AvailableMeals } from './AvailableMeals'
import { MealsSummary } from './MealsSummary'

export const Meals = (props) => {
  return (
    <Fragment>
        <MealsSummary />
        <AvailableMeals />
    </Fragment>
  )
}
