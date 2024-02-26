import React from "react";

class AddUserInfo extends React.Component {
  state = {
    name: "Haven nguyen",
    address: "distric 9",
    age: 21,
  };
  handleInputName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  handleInputAge(event) {
    this.setState({
      age: event.target.value,
    });
  }
  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();

    this.props.handleAddUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
    });
  }
  render() {
    return (
      <div>
        <h1>
          Hello {this.state.name} and I'm {this.state.age}
        </h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input onChange={(event) => this.handleInputName(event)} />
          <span> </span>
          <input onChange={(event) => this.handleInputAge(event)} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserInfo;
