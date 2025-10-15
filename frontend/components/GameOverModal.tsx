import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GameOverModalProps {
  score: number;
  distance: number;
  onRestart: () => void;
  onQuit: () => void;
}

export default function GameOverModal({
  score,
  distance,
  onRestart,
  onQuit,
}: GameOverModalProps) {
  return (
    <Modal transparent animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>GAME OVER</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Ionicons name="trophy" size={24} color="#fbbf24" />
              <Text style={styles.statLabel}>Score</Text>
              <Text style={styles.statValue}>{score}</Text>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="navigate" size={24} color="#60a5fa" />
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>{Math.floor(distance / 10)}m</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
              <Ionicons name="refresh" size={24} color="#fff" />
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quitButton} onPress={onQuit}>
              <Ionicons name="home" size={24} color="#fff" />
              <Text style={styles.buttonText}>Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#1e293b',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 320,
    borderWidth: 2,
    borderColor: '#4ade80',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 24,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  statsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#94a3b8',
    flex: 1,
    marginLeft: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
  },
  quitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#64748b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
});