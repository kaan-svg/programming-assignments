import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';

interface GameUIProps {
  onPause: () => void;
}

export default function GameUI({ onPause }: GameUIProps) {
  const { score, distance, playerHealth, handCards, useCard } = useGameStore();

  return (
    <View style={styles.container}>
      {/* Top HUD */}
      <View style={styles.topHUD}>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Ionicons name="trophy" size={20} color="#fbbf24" />
            <Text style={styles.statText}>{score}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="navigate" size={20} color="#60a5fa" />
            <Text style={styles.statText}>{Math.floor(distance / 10)}m</Text>
          </View>
        </View>

        <TouchableOpacity onPress={onPause} style={styles.pauseButton}>
          <Ionicons name="pause" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Health Bar */}
      <View style={styles.healthContainer}>
        {[1, 2, 3].map((i) => (
          <Ionicons
            key={i}
            name="heart"
            size={32}
            color={i <= playerHealth ? '#ef4444' : '#334155'}
          />
        ))}
      </View>

      {/* Hand Cards */}
      {handCards.length > 0 && (
        <View style={styles.handContainer}>
          <Text style={styles.handTitle}>Cards</Text>
          <View style={styles.cardsList}>
            {handCards.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={styles.handCard}
                onPress={() => useCard(card.id)}
              >
                <Text style={styles.cardEmoji}>
                  {card.type === 'fire' ? '🔥' : '🛡️'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  topHUD: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  pauseButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 12,
  },
  healthContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 100,
    left: 16,
    gap: 8,
  },
  handContainer: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  handTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardsList: {
    flexDirection: 'row',
    gap: 12,
  },
  handCard: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4ade80',
  },
  cardEmoji: {
    fontSize: 32,
  },
});