import styles from "@/assets/scss/homepage.module.scss";
import ICart from "@/types/cart";
import { Button, InputNumber } from "antd";
import ldash from "lodash";
import React from "react";
interface IProduct {
  id: number;
  name?: string;
  unitPrice?: number;
  quantity?: number;
}
interface IPayload {
  type: string;
  item: IProduct;
}
const inventory: IProduct[] = [
  { id: 1, name: "bacon", unitPrice: 10.99, quantity: 10 },
  { id: 2, name: "eggs", unitPrice: 3.99, quantity: 11 },
  { id: 3, name: "cheese", unitPrice: 6.99, quantity: 12 }
];

const cartReducer = (state: IProduct[], action: IPayload) => {
  switch (action.type) {
    case "add_cart":
      return [...state, action.item];
    case "update_cart":
      let stateDraft: IProduct[] = ldash.cloneDeep(state);
      stateDraft.forEach((elmt) => {
        if (elmt.id === action.item.id) {
          elmt.quantity = action.item.quantity;
        }
      });
      return stateDraft;
    case "delete_cart":
      let stateFilter: IProduct[] = state.filter((elmt) => {
        return elmt.id !== action.item.id;
      });
      return stateFilter;
    default:
      return [...state];
  }
};
const HomePage = () => {
  const [cartData, cartDispatch] = React.useReducer(cartReducer, []);
  const handleAddCart = (id: number) => () => {
    const item: IProduct | undefined = inventory.find((x) => x.id === id);
    if (item) {
      cartDispatch({
        type: "add_cart",
        item: {
          id,
          name: item.name ? item.name : "",
          unitPrice: item.unitPrice ? item.unitPrice : 0,
          quantity: 1
        }
      });
    }
  };
  const handleUpdateQuantity = (id: number) => (e: any) => {
    cartDispatch({ type: "update_cart", item: { id, quantity: parseInt(e) } });
  };
  const handleRemove = (id: number) => () => {
    cartDispatch({ type: "delete_cart", item: { id } });
  };
  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        {inventory.length > 0 && (
          <React.Fragment>
            <table cellPadding={10} cellSpacing={10}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Unit price</th>
                  <th>Quantity</th>
                  <th>Add cart</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item: IProduct, idx: number) => {
                  return (
                    <tr key={`product-${idx}`}>
                      <td>{item.name}</td>
                      <td>{item.unitPrice}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <Button htmlType="button" onClick={handleAddCart(item.id)}>
                          Add cart
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
        )}
        <hr />
        {cartData.length > 0 && (
          <React.Fragment>
            <table cellPadding={10} cellSpacing={10}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Unit price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((elmt: ICart, idx: number) => {
                  return (
                    <tr key={`cart-${idx}`}>
                      <td>{elmt.name}</td>
                      <td>{elmt.unitPrice}</td>
                      <td>
                        <InputNumber
                          value={elmt.quantity}
                          onChange={handleUpdateQuantity(elmt.id)}
                        />
                      </td>
                      <td>
                        <Button htmlType="button" onClick={handleRemove(elmt.id)}>
                          Remove cart
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default HomePage;
