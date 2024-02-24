import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "nhatHao", age: 21 },
      { id: 2, name: "Haven", age: 32 },
      { id: 3, name: "Riven", age: 12 },
    ],
  };
  render() {
    return (
      <div>
        <UserInfo />
        <DisplayInfo listUser={this.state.listUser} />
      </div>
    );
  }
}

export default MyComponent;
