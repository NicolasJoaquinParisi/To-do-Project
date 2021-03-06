import { useState, useContext } from 'react';

import { ItemsContext } from '../context/ItemsContext';
import { EditContext } from '../context/EditContext';

import Message from './Message';

import axios from 'axios';

const Edit = () => {

    const { setResponse } = useContext(ItemsContext);

    const { itemToEdit, setItemToEdit, itemTitle, setItemTitle } = useContext(EditContext);

    const [showMessage, setShowMessage] = useState(false);
    const [type, setType] = useState('');

    const handleChange = e => {

        setItemToEdit({
            ...itemToEdit, 
            [e.target.name]: e.target.value});

    }

    const sendRequest = async() => {
        try {
            const url = `http://localhost:8080/items/put/name/${itemToEdit.id}`; 
            const response = await axios.put(url, itemToEdit);

            setResponse(true);
            setType('updated');

            setItemTitle(itemToEdit.name);

            console.log(response);
        }
        catch {
            
        }
    }

    const handleClick = () => {

        setShowMessage(true);

        if (itemToEdit.name.trim() === '') {
            setType('error');
            return;
        }

        setType('');
        sendRequest();

    }

    return (
        Object.keys(itemToEdit).length > 0 ?
            <div className="mt-5 p-3 bg-light border rounded shadow">

                {
                    showMessage ?
                    <Message
                        setShowMessage={setShowMessage}
                        type={type}
                    />
                    :
                    null
                }

                <h1
                    className="fs-4 mb-4"
                >
                    Editing task
                    <span className="h1 fs-4 fst-italic text-secondary">"{itemTitle}"</span>
                </h1>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Item name"
                    value={itemToEdit.name}
                    name="name"
                    onChange={handleChange}
                />

                <div className="d-flex justify-content-end mt-3">
                    <input
                        type="button"
                        className="btn btn-primary w-25 me-3"
                        value="Save"
                        onClick={() => handleClick()}    
                    />

                    <input
                        type="button"
                        className="btn btn-secondary w-25"
                        value="Cancel"
                        onClick={() => {setItemToEdit({})}}
                    />
                </div>
            </div>
        :
            null
    );
}
 
export default Edit;