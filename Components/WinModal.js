import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

export default function WinModal({ isVisible, modalHandle, children }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        modalHandle();
      }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.textContainer}> 
          <Text style={styles.text}>{children}</Text>
          </View>
          <Pressable
          style={styles.button}
            onPress={() => {
              modalHandle();
            }}
          >
            <Text style={styles.buttonText}>RESET BOARD</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  container:{
    height:150,
    width:200,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:15,
    backgroundColor:"white"
  },
  button:{
    flex:1,
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    backgroundColor:"#61ff69"
  },
  buttonText:{
    fontWeight: "bold",
  },
  text:{
    padding:10,
    fontWeight: "bold",
  },
  textContainer:{
    justifyContent:"center",
    alignItems:"center",
    flex:3,
  }

});
