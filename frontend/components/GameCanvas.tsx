import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const LANE_WIDTH = SCREEN_WIDTH / 3;

export default function GameCanvas() {
  const {
    playerLane,
    playerAction,
    obstacles,
    hasShield,
  } = useGameStore();

  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const getPlayerX = () => {
    if (playerLane === -1) return LANE_WIDTH / 2;
    if (playerLane === 0) return SCREEN_WIDTH / 2;
    return SCREEN_WIDTH - LANE_WIDTH / 2;
  };

  const getPlayerY = () => {
    if (playerAction === 'jump') return SCREEN_HEIGHT * 0.7;
    if (playerAction === 'slide') return SCREEN_HEIGHT * 0.85;
    return SCREEN_HEIGHT * 0.8;
  };

  const getLaneX = (lane: number) => {
    if (lane === -1) return LANE_WIDTH / 2;
    if (lane === 0) return SCREEN_WIDTH / 2;
    return SCREEN_WIDTH - LANE_WIDTH / 2;
  };

  return (
    <View style={styles.canvas}>
      {/* Background */}
      <View style={styles.background}>
        {/* Lane lines */}
        <View style={[styles.laneLine, { left: LANE_WIDTH }]} />
        <View style={[styles.laneLine, { left: LANE_WIDTH * 2 }]} />
      </View>

      {/* Obstacles */}
      {obstacles.map((obs) => (
        <View
          key={obs.id}
          style={[
            styles.obstacle,
            {
              left: getLaneX(obs.lane) - 30,
              top: obs.y,
            },
          ]}
        >
          {obs.type === 'enemy' ? (
            <Ionicons name="bug" size={48} color="#ef4444" />
          ) : (
            <Ionicons name="cube" size={48} color="#78716c" />
          )}
        </View>
      ))}

      {/* Player */}
      <Animated.View
        style={[
          styles.player,
          {
            left: getPlayerX() - 30,
            top: getPlayerY(),
          },
        ]}
      >
        {hasShield && (
          <View style={styles.shield}>
            <Ionicons name="shield" size={64} color="#3b82f6" />
          </View>
        )}
        <Ionicons
          name="person"
          size={48}
          color="#4ade80"
          style={{ zIndex: 2 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#16a34a',
    position: 'relative',
  },
  background: {
    flex: 1,
    backgroundColor: '#22c55e',
  },
  laneLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#166534',
    opacity: 0.5,
  },
  obstacle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  player: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shield: {
    position: 'absolute',
    zIndex: 1,
  },
});