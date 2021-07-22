import React, { useState } from "react";
import ProfileWithInputs from "./ProfileWithIputs";
import Profile from "./Profile";

function Edit( ) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <ProfileWithInputs setIsEditing={setIsEditing} />
  ) : (
    <Profile setIsEditing={setIsEditing}/>
  );
}

export default Edit;
