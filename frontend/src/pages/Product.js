import styles from '../styles/product.module.css'
import { ImCancelCircle } from "react-icons/im";
import { useEffect, useState } from 'react';

const Product = (props) => {
    const price = 100 //debería venir por props
    const sizeFries = [
        {size:"Chicas", cost:0},
        {size:"Medianas", cost: 10},
        {size:"Grandes", cost: 20}] //debería venir de props y si no existe debe ser []
    const extrasChoices = [
        {type:"Carne", cost:20},
        {type:"Queso", cost: 10},
        {type:"Cebolla", cost: 5},
        {type:"Gaseosa 500cc", cost:35}] //debería venir de props
    
    const [fries, setFries] = useState("Chicas")
    const [extras, setExtras] = useState([])
    const [extrasCost, setExtrasCost] = useState(0)
    const [totalAmount, setTotalAmount] = useState(1)
    const [unitaryPrice, setUnitaryPrice] = useState(price)
    const [totalPrice, setTotalPrice] = useState(unitaryPrice)

    const amount = (operation) => {
        if(operation==="sum"){
            setTotalAmount(totalAmount + 1)
        } else {
            if(totalAmount > 1){
                setTotalAmount(totalAmount - 1)
            }
        }
    }

    const addFries = (fries) => {
        setFries(fries)
    }

    const addExtras = (extra) => {
        if(!extras.includes(extra)) {
            setExtras([...extras, extra])
        } else {
            setExtras(extras.filter((e) => e !== extra))
        }
    }

    useEffect(() => {
        let amount = 0
        extrasChoices.forEach(extra => {
            if(extras.includes(extra.type)) amount = amount + extra.cost
        })
        setExtrasCost(amount)
    }, [extras])

    useEffect(() => {
        let friesCost = 0
        sizeFries.forEach(size => {
            if(fries.includes(size.size)) friesCost = friesCost + size.cost
        }) //se puede hacer mejor con find

        setUnitaryPrice(price + friesCost + extrasCost)
    }, [sizeFries, extrasCost])
    
    useEffect(() => {
        setTotalPrice(unitaryPrice*totalAmount)
    },[unitaryPrice ,totalAmount])

    const addToCart = () => {
        console.log("agregar a mi orden!!!")
    }

    return (
        <main className={styles.main}>
            <div className={styles.card}>
                <ImCancelCircle className={styles.exit}/>

                <div className={styles.product}>
                    <div className={styles.cardInfo}>

                        <div className={styles.title}>
                            <h1>Super Hamburguesa</h1>
                            <p>La más grande la más bella</p>
                        </div>
                        
                        <div className={styles.title}>
                            <h3>Descripcion:</h3>
                            <p>Hamburguesa de carne 100% vacuna, salsa casera, cheddar, lechuga, tomate, cebolla, 
                                pan de papa. Incluye porción de papas chicas</p>
                        </div>
                        
                        <div className={styles.order}>
                            <div className={styles.amount}>
                                <p className={styles.amountButton} onClick={() => amount("res")}>-</p>
                                <p>{totalAmount}</p>
                                <p className={styles.amountButton} onClick={() => amount("sum")}>+</p>
                            </div>
                            <p className={styles.addToCart} onClick={addToCart}>Agregar a mi orden</p>
                        </div>

                    </div>

                    <img className={styles.cardPicture} src="https://i.postimg.cc/yWq5xyLZ/hamburguesas.png"/>

                    <div className={styles.cardPrice}>
                        <div className={styles.choices}>
                            {sizeFries.length !== 0 &&
                            <div>
                                <h3 className={styles.h3}>Tamaño papas</h3>
                                {sizeFries.map(size =>
                                    <div>
                                        <input type="radio" name="extras" value={size.size} id={size.size} 
                                        onClick={() => addFries(size.size)} defaultChecked={size.cost === 0 && "checked"}/>
                                        
                                        <label className={styles.input} for={size.size}>
                                            {size.size}{size.cost !==0 && <span className={styles.span}> (USD {size.cost})</span>}
                                        </label>
                                    </div>
                                )}
                            </div>}
                            <div>
                                <h3 className={styles.h3}>Extras</h3>
                                    {extrasChoices.map(extra =>
                                        <div>
                                            <input type="checkbox" name="extras" value={extra.type} id={extra.type} 
                                            onClick={() => addExtras(extra.type)}/>

                                            <label className={styles.input} for={extra.type}>
                                                {extra.type} <span className={styles.span}>(USD {extra.cost})</span>
                                            </label>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div>
                            <h4>Unidad: USD {unitaryPrice}</h4>
                            <h2>Total: USD {totalPrice}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Product