
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert

} from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {

  const [ganhadorJogo, setGanhador] = useState(null)
  const [jogadorX, setjogadorX] = useState(0)
  const [jogadorO, setjogadorO] = useState(0)
  const [bolinhaouX, setBolinhaouX] = useState('ellipse-outline')

  const initialState = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const [tabuleiro, setTabuleiro] = useState(initialState);

  const fTabuleiro = (x, y) => {
    if (tabuleiro[x][y] !== null) {
      return
    }
    // Criando uma cópia do tabuleiro
    const novoTabuleiro = [...tabuleiro];

    // Modificando a cópia do tabuleiro
    novoTabuleiro[x][y] = bolinhaouX;

    // Atualizando o estado do tabuleiro
    setTabuleiro(novoTabuleiro);
    setGanhador(verificaSeTerminou(novoTabuleiro))
    // Alternando entre 'ellipse-outline' e 'close-outline'
    setBolinhaouX(prev => (prev === 'ellipse-outline' ? 'close-outline' : 'ellipse-outline'));

  }



  function verificaSeTerminou(fNovoTabuleiro) {
    let verificaSeTerminoujogo = true
    for (let i = 0; i < fNovoTabuleiro.length; i++) {
      for (let j = 0; j < fNovoTabuleiro[i].length; j++) {
        if (fNovoTabuleiro[i][j] === null) {
          verificaSeTerminoujogo = false
        }
      }
    }

    // Verificar diagonais
    if (
      fNovoTabuleiro[0][0] === fNovoTabuleiro[1][1] &&
      fNovoTabuleiro[1][1] === fNovoTabuleiro[2][2] &&
      fNovoTabuleiro[0][0] !== null
    ) {
      return fNovoTabuleiro[0][0]; // Retorna o símbolo do vencedor
    }

    if (
      fNovoTabuleiro[0][2] === fNovoTabuleiro[1][1] &&
      fNovoTabuleiro[1][1] === fNovoTabuleiro[2][0] &&
      fNovoTabuleiro[0][2] !== null
    ) {
      return fNovoTabuleiro[0][2]; // Retorna o símbolo do vencedor
    }
    // Verificar linhas e colunas
    for (let i = 0; i < 3; i++) {
      // Verificar linhas
      if (
        fNovoTabuleiro[i][0] === fNovoTabuleiro[i][1] &&
        fNovoTabuleiro[i][1] === fNovoTabuleiro[i][2] &&
        fNovoTabuleiro[i][0] !== null
      ) {
        return fNovoTabuleiro[i][0]; // Retorna o símbolo do vencedor
      }

      // Verificar colunas
      if (
        fNovoTabuleiro[0][i] === fNovoTabuleiro[1][i] &&
        fNovoTabuleiro[1][i] === fNovoTabuleiro[2][i] &&
        fNovoTabuleiro[0][i] !== null
      ) {
        return fNovoTabuleiro[0][i]; // Retorna o símbolo do vencedor
      }
    }

    if (verificaSeTerminoujogo) {
      return 'EMPATE'
    }
    return null;
  }

  const mensagemTerminodeJogo = () => {
    let titulo = 'PARABÉNS'
    let mensagem = ''
    if (ganhadorJogo === 'EMPATE') {
      titulo = 'EMPATE'
      mensagem = 'Jogo terminou em empate!'
    } else if (ganhadorJogo === 'ellipse-outline') {
      mensagem = "Vencedor é o 'O'!"
    } else {
      mensagem = "Vencedor é o 'X'!"
    }

    Alert.alert(
      titulo,
      mensagem
    );
    setNumeroVitorias()
    setJogo()
  }

  const setNumeroVitorias = () => {
    if (ganhadorJogo === 'ellipse-outline') {
      setjogadorO(jogadorO + 1)
    } else if (ganhadorJogo === 'close-outline') {
      setjogadorX(jogadorX + 1)
    } else {
      //faz nada
    }
  }
  const setJogo = () => {
    setTabuleiro(initialState)
    setBolinhaouX('ellipse-outline')
    setGanhador(null)
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={{ fontSize: 30, paddingRight: 16, }}> {jogadorO} </Text>
        <View style={styles.Quemcomeca}>
          <Ionicons name='ellipse-outline' size={80} />
          <Ionicons name={bolinhaouX === 'ellipse-outline' ? 'radio-button-on-sharp' : 'radio-button-off-sharp'} size={30} />
        </View>

        <Text style={{ fontSize: 30 }}>  VS</Text>
        <View style={styles.Quemcomeca}>
          <Ionicons name='close-outline' size={110} />
          <Ionicons name={bolinhaouX === 'close-outline' ? 'radio-button-on-sharp' : 'radio-button-off-sharp'} size={30} style={{ top: -15 }} />
        </View>
        <Text style={{ fontSize: 30, paddingLeft: 1 }}> {jogadorX} </Text>

      </View>
      <View style={styles.tabuleiro}>

        <View style={styles.viewlinhas}>
          <TouchableOpacity style={styles.linhastabuleiro} onPress={() => fTabuleiro(0, 0)}>
            {tabuleiro[0][0] !== null ? <Ionicons name={tabuleiro[0][0]} size={tabuleiro[0][0] === 'ellipse-outline' ? 80 : 110} /> : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.linhastabuleiro} onPress={() => fTabuleiro(0, 1)}>
            {tabuleiro[0][1] !== null ? <Ionicons name={tabuleiro[0][1]} size={tabuleiro[0][1] === 'ellipse-outline' ? 80 : 110} /> : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.linhastabuleiro} onPress={() => fTabuleiro(0, 2)}>
            {tabuleiro[0][2] !== null ? <Ionicons name={tabuleiro[0][2]} size={tabuleiro[0][2] === 'ellipse-outline' ? 80 : 110} /> : null}
          </TouchableOpacity>
        </View>
        <View style={styles.viewlinhas}>
          <TouchableOpacity style={[styles.linhastabuleiro, { marginBottom: 15, marginTop: 15 }]} onPress={() => fTabuleiro(1, 0)}>
            {tabuleiro[1][0] !== null ? <Ionicons name={tabuleiro[1][0]} size={tabuleiro[1][0] === 'ellipse-outline' ? 80 : 110} /> : null}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.linhastabuleiro, { marginBottom: 15, marginTop: 15 }]} onPress={() => fTabuleiro(1, 1)}>
            {tabuleiro[1][1] !== null ? <Ionicons name={tabuleiro[1][1]} size={tabuleiro[1][1] === 'ellipse-outline' ? 80 : 110} /> : null}
          </TouchableOpacity >
          <TouchableOpacity style={[styles.linhastabuleiro, { marginBottom: 15, marginTop: 15 }]} onPress={() => fTabuleiro(1, 2)}>
            {tabuleiro[1][2] !== null ? <Ionicons name={tabuleiro[1][2]} size={tabuleiro[1][2] === 'ellipse-outline' ? 80 : 110} /> : null}
          </TouchableOpacity>
        </View>
        <View style={styles.viewlinhas}>
          <TouchableOpacity style={styles.linhastabuleiro} onPress={() => fTabuleiro(2, 0)}>
            {tabuleiro[2][0] !== null ? <Ionicons name={tabuleiro[2][0]} size={tabuleiro[2][0] === 'ellipse-outline' ? 80 : 110} /> : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.linhastabuleiro} onPress={() => fTabuleiro(2, 1)}>
            {tabuleiro[2][1] !== null ? <Ionicons name={tabuleiro[2][1]} size={tabuleiro[2][1] === 'ellipse-outline' ? 80 : 110} /> : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.linhastabuleiro} onPress={() => fTabuleiro(2, 2)}>
            {tabuleiro[2][2] !== null ? <Ionicons name={tabuleiro[2][2]} size={tabuleiro[2][2] === 'ellipse-outline' ? 80 : 110} /> : null}
          </TouchableOpacity>
        </View>
      </View>

      <View >
        <TouchableOpacity style={[styles.Quemcomeca, {marginBottom: 30}]} onPress={() => setJogo()}>
          <Ionicons name='refresh-outline' size={50} />
        </TouchableOpacity>
      </View>

      {ganhadorJogo !== null ? mensagemTerminodeJogo() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#000000'
  },
  tabuleiro: {
    flex: 3,
    //backgroundColor: '#000000',

  },
  viewlinhas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },
  linhastabuleiro: {
    height: 120,
    width: 120,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',

  },
  Quemcomeca: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
