import { useContext } from "react";
import { DataContext } from "./context/DataProvider";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';






const Cart = () => {
    const { cart, setCart } = useContext(DataContext);

    const clearCart = () => {
        setCart({ size: 0, total: 0, pokemon: {} });
    }
    const increaseItem = id => {
        let copyCart = { ...cart };
        console.log(copyCart);
        copyCart.size++;
        copyCart.total += (Math.round(copyCart.pokemon[id].data.price * 100) / 100);
        copyCart.pokemon[id].quantity++;
        setCart(copyCart);
    }
    const decreaseItem = id => {
        let copyCart = { ...cart };
        copyCart.size--;
        copyCart.total -= (Math.round(copyCart.pokemon[id].data.price * 100) / 100);
        copyCart.pokemon[id].quantity > 1 ?
            copyCart.pokemon[id].quantity-- :
            delete copyCart.pokemon[id];
        setCart(copyCart);
    }
    const removeItem = id => {
        let copyCart = { ...cart };
        copyCart.size -= copyCart.pokemon[id].quantity;
        copyCart.total -= copyCart.pokemon[id].quantity * (Math.round(copyCart.pokemon[id].data.price * 100) / 100);
        delete copyCart.pokemon[id];
        setCart(copyCart);
    }

    return (
        <>
            <h1>Your cart:</h1>
            <div className="container">
                {Object.values(cart.pokemon).map((poke, ind) => {
                    return <Card key={ind} className="text-center">
                        <Card.Header>{poke.data.title}</Card.Header>
                        <div>
                            <Card.Img className="item-img" variant="top" src={poke.data.sprite} />
                        </div>
                        <Card.Body>
                            <Card.Title>{poke.data.price}</Card.Title>
                            <Card.Text>
                                <span><Button className="m-3" variant="secondary" onClick={() => decreaseItem(poke.data.id)}> - 1 </Button></span>
                                <span className="quan">{poke.quantity}</span>
                                <span><Button className="m-3" variant="success" onClick={() => increaseItem(poke.data.id)}> + 1 </Button></span>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button className="w-25" variant="danger" onClick={() => removeItem(poke.data.id)}>Remove from cart</Button>
                        </Card.Footer>
                    </Card>
                })}
            </div>

            <Button variant="danger" onClick={clearCart}>Clear Cart!</Button>
        </>
    )
}
export default Cart;