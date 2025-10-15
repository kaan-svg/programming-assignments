import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';
import GameCanvas from '../components/GameCanvas';
import GameUI from '../components/GameUI';
import GameOverModal from '../components/GameOverModal';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GameScreen() {
  const router = useRouter();
  const {
    isPlaying,
    isPaused,
    score,
    distance,
    gameOver,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    handleSwipe,
  } = useGameStore();

  const [showPauseMenu, setShowPauseMenu] = useState(false);

  useEffect(() => {
    startGame();
    return () => {
      resetGame();
    };
  }, []);

  const handlePause = () => {
    pauseGame();
    setShowPauseMenu(true);
  };

  const handleResume = () => {
    resumeGame();
    setShowPauseMenu(false);
  };

  const handleQuit = () => {
    resetGame();
    router.back();
  };

  const handleRestart = () => {
    resetGame();
    startGame();
  };

  // Swipe gesture handler
  const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      const { velocityX, velocityY, translationX, translationY } = event;
      
      // Determine swipe direction based on velocity and translation
      const absVelocityX = Math.abs(velocityX);
      const absVelocityY = Math.abs(velocityY);
      const absTranslationX = Math.abs(translationX);
      const absTranslationY = Math.abs(translationY);

      if (absTranslationX > 50 || absTranslationY > 50) {
        if (absVelocityX > absVelocityY) {
          // Horizontal swipe
          if (velocityX > 0) {
            handleSwipe('right');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          } else {
            handleSwipe('left');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        } else {
          // Vertical swipe
          if (velocityY < 0) {
            handleSwipe('up');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          } else {
            handleSwipe('down');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
        }
      }
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={swipeGesture}>
        <View style={styles.gameContainer}>
          {/* Game Canvas */}
          <GameCanvas />

          {/* Game UI Overlay */}
          <GameUI onPause={handlePause} />

          {/* Pause Menu */}
          {showPauseMenu && (
            <View style={styles.pauseOverlay}>
              <View style={styles.pauseMenu}>
                <Text style={styles.pauseTitle}>PAUSED</Text>
                <TouchableOpacity style={styles.pauseButton} onPress={handleResume}>
                  <Ionicons name="play" size={24} color="#fff" />
                  <Text style={styles.pauseButtonText}>Resume</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pauseButton, styles.quitButton]} onPress={handleQuit}>
                  <Ionicons name="exit" size={24} color="#fff" />
                  <Text style={styles.pauseButtonText}>Quit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Game Over Modal */}
          {gameOver && (
            <GameOverModal
              score={score}
              distance={distance}
              onRestart={handleRestart}
              onQuit={handleQuit}
            />
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  pauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseMenu: {
    backgroundColor: '#1e293b',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 280,
  },
  pauseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: 32,
  },
  pauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  quitButton: {
    backgroundColor: '#ef4444',
  },
  pauseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
});