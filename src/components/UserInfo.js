import React from "react";

class UserInfo extends React.Component {
  state = {
    name: "Haven nguyen",
    address: "distric 9",
    age: 21,
  };
  handleInput(event) {
    this.setState({
      name: event.target.value,
    });
  }
  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h1>
          Hello {this.state.name} in {this.state.address}
        </h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input onChange={(event) => this.handleInput(event)} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserInfo;
