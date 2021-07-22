import React, { useState } from "react";
import ProfileWithInputs from "./EditProfile";
import Profile from "./Profile";

function EditTransition({ stat, note, key }) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <ProfileWithInputs setIsEditing={setIsEditing} />
  ) : (
    <Profile setIsEditing={setIsEditing} note={note} stat={stat} key={key} />
  );
}

export default EditTransition;
