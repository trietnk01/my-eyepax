import { Button, Card, Flex, Form, FormProps, Input, InputNumber, Select } from "antd";
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";
import styles from "@/assets/scss/homepage.module.scss";
import { dispatch, useSelector } from "@/store";
import { addCart, updateCart, removeCart } from "@/store/slices/cartSlice";
import ICart from "@/types/cart";
interface IProduct {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
}
const HomePage = () => {
  const { cartData } = useSelector((state) => state.cart);
  const inventory: IProduct[] = [
    { id: 1, name: "bacon", unitPrice: 10.99, quantity: 10 },
    { id: 2, name: "eggs", unitPrice: 3.99, quantity: 11 },
    { id: 3, name: "cheese", unitPrice: 6.99, quantity: 12 }
  ];
  const handleAddCart = (id: number) => () => {
    const item: IProduct | undefined = inventory.find((x) => x.id === id);
    if (item) {
      dispatch(
        addCart({
          id: item.id,
          name: item.name ? item.name : "",
          unitPrice: item.unitPrice ? item.unitPrice : 0,
          quantity: 1
        })
      );
    }
  };
  const handleUpdateQuantity = (id: number) => (e: any) => {
    dispatch(
      updateCart({
        id,
        quantity: parseInt(e)
      })
    );
  };
  const handleRemove = (id: number) => () => {
    dispatch(removeCart({ id }));
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
