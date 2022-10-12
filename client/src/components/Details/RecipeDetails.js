import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { recipesDetails } from '../../redux/actions';

export default function RecipeDetails() {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(recipesDetails(id))
    },[dispatch, id]);

    const detRec = useSelector((state) => state.details);

  return (
    <div>
        <div>
            <h1>Recipe Detail</h1>
        </div>

        <div>
            <h1>{detRec.name}</h1>
        </div>

        <img src={detRec.img? detRec.img : detRec.image} alt='' className=''/>

        <div>
            <h4>
                Type of Dish: {detRec.dishTypes}
            </h4>
        </div>

        <div>
            <h4> Summary: </h4>
            <p>{detRec.summary}</p>
        </div>

        <div className='cont-g'>
                        It's an{' '}
                        {!detRec.createdInDb
                        ? detRec.diets + ' '
                        : detRec.diets.map((e)=> e.name+ ' ')}
                        recipe health score at {detRec.healthScore} points.
                    </div>

                    <div className='cont-p'>
                        <p>Steps: {detRec.instructions}</p>
                    </div>
    </div>
  )
}
