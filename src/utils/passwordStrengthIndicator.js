import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const PasswordStrengthIndicator = ({
  validity: { minChar, number, specialChar, mayusChar },
}) => {
  return (
    <div>
      <Typography variant="h6">La contraseña debe contener:</Typography>
      <List>
        <ListItem>
          <PasswordStrengthIndicatorItem
            isValid={specialChar}
            text="Por lo menos un caracter especial o signo"
          />
        </ListItem>
        <ListItem>
          <PasswordStrengthIndicatorItem
            isValid={minChar}
            text="Mas de 8 caracteres"
          />
        </ListItem>
        <ListItem>
          <PasswordStrengthIndicatorItem
            isValid={number}
            text="Por lo menos un numero"
          />
        </ListItem>
        <ListItem>
          <PasswordStrengthIndicatorItem
            isValid={mayusChar}
            text="Por lo menos una letra mayuscula"
          />
        </ListItem>
      </List>
    </div>
  );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
  return (
    <ListItemText
      style={{
        color: isValid ? "green" : "red",
      }}
    >
      {text}
    </ListItemText>
  );
};

export default PasswordStrengthIndicator;
