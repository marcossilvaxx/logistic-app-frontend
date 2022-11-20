import React, { useEffect, useState } from 'react';
import { RangePicker } from 'react-minimal-datetime-range';
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';
import ApiService from '../../services';
import searchIcon from "../../assets/search.svg";

import "./styles.scss";

function Orders() {
  const [orders, setOrders] = useState({ data: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(undefined);
  const [dateRange, setDateRange] = useState(undefined);

  const ORDERS_LIMIT = 5

  const getOrders = async (limit, page, search, dateRange) => {
    const result = await ApiService.get("/orders", {
      params: { limit, page, search, date: dateRange?.map(date => new Date(date).toISOString())?.join(",") }
    });

    setOrders(result.data);
  }

  useEffect(() => {
    getOrders(ORDERS_LIMIT, currentPage, search, dateRange);
  }, [currentPage, search, dateRange]);



  const totalOrdersAmount = orders.data.reduce((accOrder, currentOrder) => {
    return accOrder + currentOrder.items.reduce((accItem, currentItem) => {
      return accItem + (currentItem.quantity * currentItem.price_per_unit);
    }, 0)
  }, 0);
  
  const totalPages = Math.round((orders.total / ORDERS_LIMIT)) || 1;

  return (
    <div className="container">
      <div className="list-wrapper">
        <h1>Orders</h1>
        <div className="search-container">
          <img src={searchIcon} alt="search icon" />
          Search
          <input
            type="text" 
            className="search-input" 
            placeholder="Search..." 
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div className="datefilter-container">
          Created date
          <RangePicker
            locale="en-au"
            placeholder={['Start Date', 'End Date']}
            defaultDates={dateRange?.map(date => date.split(" ")[0])}
            defaultTimes={dateRange?.map(date => date.split(" ")[1])}
            onConfirm={dates => {
              setDateRange(dates);
            }}
            style={{ width: '300px', marginTop: '8px'}}
          />
        </div>
        <p className="total-amount">
          Total amount: <strong>${totalOrdersAmount.toFixed(2)}</strong>
        </p>
        <div className="list-container">
          <table>
            <thead>
              <tr>
                <th>Order name</th>
                <th>Customer Company</th>
                <th>Customer name</th>
                <th>Order date</th>
                <th>Delivered Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.data.map(order => {
                let totalAmount = 0;

                const deliveredAmout = order.items.reduce((accItem, currentItem) => {
                  totalAmount += currentItem.price_per_unit * currentItem.quantity;

                  return accItem + currentItem.deliveries.reduce((accDelivery, currentDelivery) => {
                    return accDelivery + (currentDelivery.delivered_quantity * currentItem.price_per_unit);
                  }, 0)
                }, 0);

                return (
                  <tr key={order.name}>
                    <td>{order.name}</td>
                    <td>{order.customer.company.name}</td>
                    <td>{order.customer.name}</td>
                    <td>{new Date(order.created_at + "Z").toLocaleString("en-AU", {timeZone: "Australia/Melbourne"})}</td>
                    <td>{deliveredAmout === 0 ? "-" : `$${deliveredAmout.toFixed(2)}`}</td>
                    <td>${totalAmount.toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="pagination-container">
            Total {orders.total}
            <div className="pagination-controls">
              <button 
                className={`arrow-button ${currentPage > 1 ? '' : 'disabled'}`}
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentState => currentState - 1);
                  }
                }}
              >
                {"<"}
              </button>
              {Array.from(new Array(totalPages), (x, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`page-button ${currentPage === page ? "selected" : ""}`}
                  onClick={() => {
                    if (currentPage !== page) {
                      setCurrentPage(page);
                    }
                  }}
                >
                  {page}
                </button>
              ))}
              <button 
                className={`arrow-button ${currentPage < totalPages ? '' : 'disabled'}`}
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage(currentState => currentState + 1);
                  }
                }}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}

export default Orders;