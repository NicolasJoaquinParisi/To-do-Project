import { useState } from 'react';
import ItemsProvider from "./context/ItemsContext";

import List from "./components/List";
import Edit from "./components/Edit";

function App() {

  const [itemToEdit, setItemToEdit] = useState({});

  return (
    <ItemsProvider>
      <div className="container">
        <div className="row">
          <div className="col">
            <List
              itemToEdit={itemToEdit}
              setItemToEdit={setItemToEdit}
            />
          </div>

          <div className="col">
            {
              Object.keys(itemToEdit).length > 0 ?
              <Edit
                item={itemToEdit}
                setItemToEdit={setItemToEdit}
              />
              :
              null
            }
          </div>

        </div>
      </div>
    </ItemsProvider>
  );
}

export default App;
