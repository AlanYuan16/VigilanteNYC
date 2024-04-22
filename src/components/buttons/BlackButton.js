import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";


// BlackButton component
const BlackButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.BlackButton}>
      <Text style={styles.BlackButtonText}>{title}
      Enter</Text>
    </TouchableOpacity>
  );
}

// Styles for the black button
const styles = StyleSheet.create({
  BlackButton:{
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  BlackButtonText:{
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  }
});


// Export the BlackButton component
export default BlackButton;