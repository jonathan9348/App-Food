import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { recipesDetails } from '../../redux/actions';
import { Link } from 'react-router-dom';
import '../Details/RecipeDetails.css';

export default function RecipeDetails() {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(recipesDetails(id))
    },[dispatch]);

    const detRec = useSelector((state) => state.details);

  return (
    <div className='content'>
        <div>
            <h1 className='title-page'>Recipe Detail</h1>
        </div>

        <div>
            <h1 className='title-rec'>{detRec.name}</h1>
        </div>

        <img src={detRec.image} alt='img not found' className='img-st'/>

        <div>
            {isNaN(detRec.id)? 'Imagen ilustrativa' :
            (<h4 className='dish'>
                Type of Dish: {detRec.dishTypes?.map(e => e.name).toString().split(' ')}
            </h4>)}
        </div>

        <div className='cont-p'>
            <h4 className='summ'> Summary: </h4>
            <p className='lett'>{detRec.summary?.replace(/<[^>]*>?/g, "")}</p> {/*reemplaza el primer argumento por el segundo, en este caso sera un string vacio y por ende se eliminaran los simbolos*/}
        </div>

        <div className='cont-p'>
            <h4 className='summ'>Diets:</h4>
        
            <h3 className='lett'>{detRec.diets?.map(e => e.name).toString().split('')}</h3>
            
                      
                    </div>

                    <div className='cont-p'>
                    <h3 className='summ'>Steps: </h3>
                    {detRec.instructions?.length > 1 &&
                    isNaN(detRec.id) ? detRec.instructions :
                    detRec.instructions?.map(e => {
                        return(
                            <ul className='lett'>
                                <li>{e.number +': ' + e.step}</li>
                            </ul>
                        )
                    })}
                    
                    
                    </div>

                    <Link to="/home"> 
                        <button className="botback" type="submit">🡸</button>
                    </Link>
    </div>
  )
}
