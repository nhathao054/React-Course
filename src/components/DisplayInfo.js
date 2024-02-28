import React, { useState } from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

const DisplayInfo = (props) => {
  const { listUser } = props;
  const [isShowHideUser, setIsShowHideUser] = useState(true);

  const showListUser = () => {
    setIsShowHideUser(!isShowHideUser);
  };

  return (
    <div className="DisplayInfo-Container">
      <div>
        <span
          onClick={() => {
            showListUser();
          }}
        >
          {isShowHideUser === true ? "Hide List User" : "Show List User"}
        </span>
      </div>
      {isShowHideUser && (
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
};

export default DisplayInfo;
