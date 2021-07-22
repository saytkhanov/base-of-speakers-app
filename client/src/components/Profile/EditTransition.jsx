import React, { useState } from "react";
import ProfileWithInputs from "./EditProfile";
import Profile from "./Profile";


function EditTransition() {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <ProfileWithInputs setIsEditing={setIsEditing} />
  ) : (
    <Profile setIsEditing={setIsEditing}/>
  );
}

export default EditTransition;
