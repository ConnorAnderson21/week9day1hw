import { useContext, useEffect, useState } from "react"
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { DataContext } from "./context/DataProvider";



const Shop = () => {
    useEffect(() => { console.log('SHOP component state has been rendered or re-rendered') });




    const getPokemonData = async () => {
        let response = await axios.get('http://127.0.0.1:5000/api/pokemon');
        return response.status === 200 ? response.data : null
    }
    const loadPokemonData = async () => {
        let data = await getPokemonData();

        setPokemon(data.pokemon);
    }


    const [pokemon, setPokemon] = useState(() => loadPokemonData());
    
  

    const { cart, setCart } = useContext(DataContext);


    const addPokemon = (pokemon) => {
        
        let copyCart = { ...cart };
        
        copyCart.size++;
        copyCart.total += (Math.round(pokemon.price * 100) / 100);
        copyCart.pokemon[pokemon.id] ?
            copyCart.pokemon[pokemon.id].quantity++
            :
            copyCart.pokemon[pokemon.id] = { data: pokemon, quantity: 1 };
        console.log(copyCart);
     
        setCart(copyCart);
    }

    
    return (
        <div>
            <h1>Rare Pokemon Market</h1>
            <div className="container">
                <div className="row">
                    {console.log(pokemon, typeof pokemon)}
                    {pokemon && pokemon.length > 0 ? pokemon.map((p, index) => {
                        return <Card key={index} id={p.id} style={{ width: '13rem' }}>
                            <Card.Img variant="top" src={p.sprite} />
                            <Card.Body>
                                <Card.Title>{p.name}</Card.Title>

                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Ability: {p.ability}</ListGroup.Item>
                                <ListGroup.Item>Base Experience: {p.base_exp}</ListGroup.Item>
                                <ListGroup.Item>Attack: {p.attack}</ListGroup.Item>
                                <ListGroup.Item>Defense: {p.defense}</ListGroup.Item>
                                <ListGroup.Item>HP: {p.hp}</ListGroup.Item>
                                <ListGroup.Item>Price: ${p.price}</ListGroup.Item>
                            </ListGroup>
<Card.Body>
                                <Button variant="success" onClick={() => addPokemon(p)}>Add to cart</Button>
                            </Card.Body>

                        </Card>
                    }) :    null  
                }
                </div>
            </div>
        </div>
    )
}
export default Shop;