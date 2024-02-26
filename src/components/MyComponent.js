import React from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "nhatHao", age: 21 },
      { id: 2, name: "Haven", age: 32 },
      { id: 3, name: "Riven", age: 12 },
    ],
  };

  handleAddUser = (userObj) => {
    console.log(userObj);
    this.setState({
      listUser: [userObj, ...this.state.listUser],
    });
  };

  render() {
    return (
      <div>
        <AddUserInfo handleAddUser={this.handleAddUser} />
        <DisplayInfo listUser={this.state.listUser} />
      </div>
    );
  }
}

export default MyComponent;
