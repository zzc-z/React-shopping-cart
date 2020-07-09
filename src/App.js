import React from "react";
import styles from "./App.css";

function formatPrice(price) {
  if (typeof price !== "number") {
    price = Number(price) || 0;
  }
  return "¥" + price.toFixed(2);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          id: 1,
          name: "《算法导论》",
          date: "2006-9",
          price: 85.0,
          count: 1,
        },
        {
          id: 2,
          name: "《UNIX编程艺术》",
          date: "2006-2",
          price: 59.0,
          count: 1,
        },
        {
          id: 3,
          name: "《编程珠玑》",
          date: "2008-10",
          price: 39.0,
          count: 1,
        },
        {
          id: 4,
          name: "《代码大全》",
          date: "2006-3",
          price: 128.0,
          count: 1,
        },
      ],
    };
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let book of this.state.books) {
      totalPrice += book.count * book.price;
    }
    return "总价格：" + formatPrice(totalPrice);
  }

  //改变书籍数量
  changeItem(index, counter) {
    const books = [...this.state.books];
    this.setState({
      books: books.map((item, indey) => {
        // eslint-disable-next-line eqeqeq
        if (indey == index) {
          item.count += counter;
        }
        return item;
      }),
    });
  }

  //移除行
  removeItem(index) {
    const books = [...this.state.books];
    this.setState({
      books: books.filter((item, indey) => index !== indey),
    });
  }

  renderBooks() {
    const { books } = this.state;
    return (
      <div style={styles}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>书籍名称</th>
              <th>出版日期</th>
              <th>价格</th>
              <th>购买数量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {books.map((item, index) => {
              return (
                <tr key={item + index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td>{formatPrice(item.price)}</td>
                  <td>
                    <button
                      disabled={item.count <= 1}
                      onClick={(e) => this.changeItem(index, -1)}
                    >
                      -
                    </button>
                    <span className="counter">{item.count}</span>
                    <button onClick={(e) => this.changeItem(index, 1)}>
                      +
                    </button>
                  </td>
                  <td>
                    <button onClick={(e) => this.removeItem(index)}>
                      移除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2> {this.getTotalPrice()} </h2>
      </div>
    );
  }

  renderEmpty() {
    return <h2>购物车为空~</h2>;
  }

  render() {
    const { books } = this.state;
    return books.length ? this.renderBooks() : this.renderEmpty();
  }
}

export default App;
