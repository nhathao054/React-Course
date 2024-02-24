import React from "react";

class DisplayInfo extends React.Component {
  state = {
    isShowListUser: false,
  };

  handleClick = () => {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  };

  render() {
    const { listUser } = this.props;
    return (
      <div>
        <div>
          <span onClick={() => this.handleClick()}>
            {this.state.isShowListUser ? "Hide List User" : "Show List User"}
          </span>
        </div>
        {this.state.isShowListUser && (
          <div>
            {listUser.map((user) => {
              return (
                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                  <div>My name is {user.name}</div>
                  <div>my age is {user.age}</div>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfo;
