import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Text } from "react-native";
import WinModal from "./Components/WinModal";
import ResetButton from "./Components/ResetButton";
import GridItem from "./Components/GridItem";
import Header from "./Components/Header";
import Score from "./Components/Score";
const App = () => {
  const initialState = [
    { id: 1, value: "", pressed: false },
    { id: 2, value: "", pressed: false },
    { id: 3, value: "", pressed: false },
    { id: 4, value: "", pressed: false },
    { id: 5, value: "", pressed: false },
    { id: 6, value: "", pressed: false },
    { id: 7, value: "", pressed: false },
    { id: 8, value: "", pressed: false },
    { id: 9, value: "", pressed: false },
  ];
  const winningCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const [board, setBoard] = useState(initialState);
  const [xAnswers, setxAnswers] = useState([]);
  const [oAnswers, setoAnswers] = useState([]);
  const [oScore, setOScore] = useState(0);
  const [xScore, setXScore] = useState(0);
  const [win, setWin] = useState(false);
  const [winner, setWinner] = useState("");
  const [isVisible, setisVisible] = useState(false);
  const [playerTurn, setPlayerTurn] = useState("X");

  const resetBoard = () => {
    // resets the board, answers, and win condition
    setWin(false);
    setxAnswers([]);
    setoAnswers([]);
    setBoard(initialState);
    setPlayerTurn("X");
    //console.log(win);
  };
  const modalHandle = () => {
    //sets modal visibility to false and reset win condition
    setWin(false);
    setisVisible(false);
    resetBoard();
    //console.log(win);
  };
  const resetPoints = ()=>{
    setXScore(0)
    setOScore(0)
  }
  const pressHandle = (item) => {
    let updatedboard = [];
    if (item.pressed === false) {
      setBoard((prevState) => {
        //set specific tile clicked value to x or o depending on the player
        updatedboard = [...prevState];
        updatedboard[item.id - 1] = {
          id: item.id,
          value: playerTurn,
          pressed: true,
        };

        if (playerTurn === "X") {
          //saves id of the clicked board
          setxAnswers((prevState) => {
            return [...prevState, updatedboard[item.id - 1].id];
          });
        } else {
          setoAnswers((prevState) => {
            return [...prevState, updatedboard[item.id - 1].id];
          });
        }
        //console.log(win)
        setPlayerTurn(playerTurn === "X" ? "O" : "X"); //sets who's player turn it is

        return updatedboard;
      });
    } else {
      return
    }
  };
  useEffect(() => {
    // checks changes in board and check if the player already wins
    // console.log(xAnswers);
    // console.log(oAnswers);
    if (board != initialState) {
      winningCombination.map((item) => {
        // checks if all of winning Combination is inside the player clicked id to check if the player already won
        if (item.every((element) => xAnswers.includes(element))) {
          //console.log("xwins");
          setXScore(prevState => prevState + 1)
          setWin((prevState) => !prevState);
          setWinner("X")
          return;
        }
      });

      winningCombination.map((item) => {
        if (item.every((element) => oAnswers.includes(element))) {
          //console.log("xwins");
          setOScore(prevState => prevState + 1)
          setWin((prevState) => !prevState);
          setWinner("O")
          return;
        }
      });
      if (board.every(item => item.value !== "")){
        setWinner("None of the player")
        setisVisible(true)

      }
    }
    return
  }, [board]);
  

  useEffect(() => {
    //checks if win condition is true and opens up the visibility of the modal
    if (win) {
      //console.log(win);
      setisVisible(true);
    }
  }, [win]);
  return (
    <View style={styles.mainContainer}>
      <WinModal isVisible={isVisible} modalHandle={modalHandle}>
        {winner} Wins!
      </WinModal>
      <View style={styles.headerContainer}>
        <Score>X = {xScore}</Score>
        <Header>
          Player{" "}
          <Text style={{ color: playerTurn === "X" ? "#ff6961" : "#61f7ff" }}>
            {playerTurn}
          </Text>
          's turn
        </Header>
        <Score>O = {oScore}</Score>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.flatList}
          numColumns={3}
          data={board}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <GridItem pressHandle={() => pressHandle(item)}>
              {item.value}
            </GridItem>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ResetButton onPress={resetBoard}>RESET BOARD</ResetButton>
        <ResetButton onPress={resetPoints}>RESET POINTS</ResetButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    gap:20
  },
  flatListContainer: {
    alignItems: "center",
    width: "100%",
  },
  flatList: {
    borderWidth: 1,
    borderColor: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 6,
    width: 300,
    height: 50,
    overflow: "hidden",
    marginVertical: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;