import { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View, Modal} from 'react-native';

const App = () => {
  const initialState = [
    {id:1, value:"", pressed: false},
    {id:2, value:"", pressed: false},
    {id:3, value:"", pressed: false},
    {id:4, value:"", pressed: false},
    {id:5, value:"", pressed: false},
    {id:6, value:"", pressed: false},
    {id:7, value:"", pressed: false},
    {id:8, value:"", pressed: false},
    {id:9, value:"", pressed: false},
  ]
  const [board, setBoard] = useState (initialState);

  const combi= [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]

  ]
  const [xAnswers, setxAnswers] = useState([])
  const [oAnswers, setoAnswers] = useState([])
  const [win, setWin] = useState(false)
  const [isVisible, setisVisible] = useState(false)

  const [playerTurn, setPlayerTurn] = useState('X');

  const resetBoard = ()=>{
    setxAnswers([])
    setoAnswers([])

    setBoard(initialState)
    setPlayerTurn('X')
    setWin(false)
  }
  const modalHandle = ()=>{
    console.log('hide')
    setisVisible(false)
    resetBoard()
  }
  const pressHandle = (item)=> {
    let updatedboard = []
    if (item.pressed === false) {
      setBoard((prevState)=>{
        updatedboard = [...prevState]
        updatedboard[item.id -1] = {id: item.id, value: playerTurn, pressed: true}

        if (playerTurn === "X") {
          setxAnswers((prevState)=>{
            return [...prevState, updatedboard[item.id-1].id]
           
          })
        }else{
          setoAnswers((prevState)=>{
            return [...prevState, updatedboard[item.id-1].id]
           
          })
        }

        setPlayerTurn(playerTurn === 'X' ? 'O' : 'X');

        return updatedboard
    })
    }else{
      console.log("already presssed")
    }
  }
  useEffect(()=>{
    combi.map((item)=>{
      if (JSON.stringify(xAnswers) === JSON.stringify(item)){
        console.log('xwins')
        setWin(true)

      }
    })
    combi.map((item)=>{
      if (JSON.stringify(oAnswers) === JSON.stringify(item)){
        console.log('owins')
        setWin(true)
      }
    })
   },[board])

   useEffect(()=>{
    if (win) {
      setisVisible(true)
    }
   },[win])
  console.log(isVisible)
  console.log(win)
    return (
        <View style={styles.container}>
          <Modal
            animationType ='slide'
            transparent = {true}
            visible = {isVisible}
            onRequestClose={()=>{
              Alert.alert('Modal has been closed')
              setisVisible(!isVisible)
            }}
          >
            <View>
              <View>
              <Text>You win</Text>
                <Pressable
                  onPress={() => {modalHandle()}}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Text style={styles.turn}>Player {playerTurn}'s Turn</Text>
          <View style={styles.gridcontainer}>
            <FlatList
            numColumns={3}
            data={board}
            renderItem={({item}) => ( 
              <Pressable style={styles.grid} onPress={() => pressHandle(item)}>
                <View style={styles.textcontainer}>
                <Text style={styles.text}>{item.value}</Text>
                </View>
              </Pressable>)}
              />
          </View>
          <View>
            <Pressable
            onPress={resetBoard}>
              <Text>reset</Text>
            </Pressable>
          </View>
          
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    gridcontainer: {
      borderTopColor: 'white',
      flex: 1,
    },
    
    grid: {
      borderColor: 'black',
      borderWidth: 3,
      alignItems: 'center',
      margin: 'auto',
    },
    textcontainer:{
      width: 100,
      height: 150,
      alignItems:"center"
    },
    text: {
      fontSize: 120,
    },

    turn: {
      fontSize: 30,
      fontWeight: 'bold',
    },

});

export default App;