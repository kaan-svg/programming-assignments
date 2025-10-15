import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Card {
  type: string;
  level: number;
  count: number;
}

interface CardItemProps {
  card: Card;
  onFuse: () => void;
}

const CARD_INFO: Record<string, { icon: string; color: string; name: string }> = {
  fire: { icon: 'flame', color: '#ef4444', name: 'Fire Card' },
  shield: { icon: 'shield', color: '#3b82f6', name: 'Shield Card' },
  ice: { icon: 'snow', color: '#06b6d4', name: 'Ice Card' },
  lightning: { icon: 'flash', color: '#fbbf24', name: 'Lightning Card' },
};

export default function CardItem({ card, onFuse }: CardItemProps) {
  const info = CARD_INFO[card.type] || CARD_INFO.fire;
  const canFuse = card.count >= 2;
  const fuseCost = card.level === 1 ? 100 : card.level === 2 ? 500 : 0;

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderColor: info.color }]}>
        <View style={styles.iconContainer}>
          <Ionicons name={info.icon as any} size={48} color={info.color} />
        </View>
        <Text style={styles.name}>{info.name}</Text>
        <Text style={styles.level}>Level {card.level}</Text>
        <Text style={styles.count}>x{card.count}</Text>

        {card.level < 3 && (
          <TouchableOpacity
            style={[
              styles.fuseButton,
              !canFuse && styles.fuseButtonDisabled,
            ]}
            onPress={onFuse}
            disabled={!canFuse}
          >
            <Ionicons name="hammer" size={16} color="#fff" />
            <Text style={styles.fuseText}>
              Fuse ({fuseCost}G)
            </Text>
          </TouchableOpacity>
        )}
        {card.level >= 3 && (
          <View style={styles.maxLevel}>
            <Text style={styles.maxLevelText}>MAX</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  iconContainer: {
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  level: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: 8,
  },
  fuseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  fuseButtonDisabled: {
    backgroundColor: '#334155',
    opacity: 0.5,
  },
  fuseText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 4,
  },
  maxLevel: {
    backgroundColor: '#fbbf24',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  maxLevelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});