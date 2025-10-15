import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANE_LEFT = -1;
const LANE_CENTER = 0;
const LANE_RIGHT = 1;

const GAME_SPEED = 5;
const OBSTACLE_SPAWN_INTERVAL = 2000;

interface Card {
  type: string;
  level: number;
  count: number;
}

interface HandCard {
  type: string;
  id: string;
}

interface Obstacle {
  id: string;
  lane: number;
  y: number;
  type: 'static' | 'enemy';
  health: number;
}

interface GameState {
  // Game state
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
  score: number;
  distance: number;
  
  // Player state
  playerLane: number;
  playerAction: 'run' | 'jump' | 'slide';
  playerHealth: number;
  hasShield: boolean;
  
  // Obstacles and enemies
  obstacles: Obstacle[];
  
  // Cards
  cards: Card[];
  handCards: HandCard[];
  gold: number;
  
  // Game loop
  gameLoopId: number | null;
  lastObstacleSpawn: number;
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  handleSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void;
  useCard: (cardId: string) => void;
  takeDamage: () => void;
  collectCoin: () => void;
  collectCardPack: () => void;
  fuseCards: (type: string) => void;
  saveProgress: () => Promise<void>;
  loadProgress: () => Promise<void>;
  
  // Game loop
  updateGame: () => void;
  spawnObstacle: () => void;
  checkCollisions: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  isPlaying: false,
  isPaused: false,
  gameOver: false,
  score: 0,
  distance: 0,
  
  playerLane: LANE_CENTER,
  playerAction: 'run',
  playerHealth: 3,
  hasShield: false,
  
  obstacles: [],
  
  cards: [
    { type: 'fire', level: 1, count: 2 },
    { type: 'shield', level: 1, count: 1 },
  ],
  handCards: [],
  gold: 500,
  
  gameLoopId: null,
  lastObstacleSpawn: 0,
  
  startGame: () => {
    const state = get();
    if (state.gameLoopId) {
      clearInterval(state.gameLoopId);
    }
    
    set({
      isPlaying: true,
      isPaused: false,
      gameOver: false,
      score: 0,
      distance: 0,
      playerLane: LANE_CENTER,
      playerAction: 'run',
      playerHealth: 3,
      hasShield: false,
      obstacles: [],
      handCards: [],
      lastObstacleSpawn: Date.now(),
    });
    
    const loopId = setInterval(() => {
      const currentState = get();
      if (currentState.isPlaying && !currentState.isPaused && !currentState.gameOver) {
        currentState.updateGame();
      }
    }, 16) as unknown as number;
    
    set({ gameLoopId: loopId });
  },
  
  pauseGame: () => {
    set({ isPaused: true });
  },
  
  resumeGame: () => {
    set({ isPaused: false });
  },
  
  resetGame: () => {
    const state = get();
    if (state.gameLoopId) {
      clearInterval(state.gameLoopId);
    }
    set({
      isPlaying: false,
      isPaused: false,
      gameOver: false,
      gameLoopId: null,
    });
  },
  
  handleSwipe: (direction: 'left' | 'right' | 'up' | 'down') => {
    const state = get();
    if (state.gameOver || state.isPaused) return;
    
    if (direction === 'left') {
      if (state.playerLane > LANE_LEFT) {
        set({ playerLane: state.playerLane - 1 });
      }
    } else if (direction === 'right') {
      if (state.playerLane < LANE_RIGHT) {
        set({ playerLane: state.playerLane + 1 });
      }
    } else if (direction === 'up') {
      set({ playerAction: 'jump' });
      setTimeout(() => {
        const currentState = get();
        if (currentState.playerAction === 'jump') {
          set({ playerAction: 'run' });
        }
      }, 400);
    } else if (direction === 'down') {
      set({ playerAction: 'slide' });
      setTimeout(() => {
        const currentState = get();
        if (currentState.playerAction === 'slide') {
          set({ playerAction: 'run' });
        }
      }, 400);
    }
  },
  
  useCard: (cardId: string) => {
    const state = get();
    const card = state.handCards.find((c) => c.id === cardId);
    if (!card) return;
    
    if (card.type === 'fire') {
      // Destroy nearest obstacle
      const sortedObstacles = [...state.obstacles].sort((a, b) => a.y - b.y);
      if (sortedObstacles.length > 0) {
        const target = sortedObstacles[0];
        set({
          obstacles: state.obstacles.filter((o) => o.id !== target.id),
          handCards: state.handCards.filter((c) => c.id !== cardId),
          score: state.score + 50,
        });
      }
    } else if (card.type === 'shield') {
      set({
        hasShield: true,
        handCards: state.handCards.filter((c) => c.id !== cardId),
      });
      setTimeout(() => {
        set({ hasShield: false });
      }, 10000);
    }
  },
  
  takeDamage: () => {
    const state = get();
    
    if (state.hasShield) {
      set({ hasShield: false });
      return;
    }
    
    const newHealth = state.playerHealth - 1;
    if (newHealth <= 0) {
      set({ gameOver: true, playerHealth: 0 });
      get().saveProgress();
    } else {
      set({ playerHealth: newHealth });
    }
  },
  
  collectCoin: () => {
    set((state) => ({
      score: state.score + 10,
      gold: state.gold + 5,
    }));
  },
  
  collectCardPack: () => {
    const cardTypes = ['fire', 'shield'];
    const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    
    set((state) => {
      const existingCard = state.cards.find((c) => c.type === randomType);
      let updatedCards;
      
      if (existingCard) {
        updatedCards = state.cards.map((c) =>
          c.type === randomType ? { ...c, count: c.count + 1 } : c
        );
      } else {
        updatedCards = [...state.cards, { type: randomType, level: 1, count: 1 }];
      }
      
      return {
        cards: updatedCards,
        handCards: [
          ...state.handCards,
          { type: randomType, id: `${randomType}-${Date.now()}` },
        ],
        score: state.score + 20,
      };
    });
  },
  
  fuseCards: (type: string) => {
    const state = get();
    const card = state.cards.find((c) => c.type === type);
    if (!card) return;
    
    const fuseCost = card.level === 1 ? 100 : 500;
    
    if (card.count >= 2 && state.gold >= fuseCost) {
      set({
        cards: state.cards.map((c) =>
          c.type === type
            ? { ...c, level: c.level + 1, count: 0 }
            : c
        ),
        gold: state.gold - fuseCost,
      });
      get().saveProgress();
    }
  },
  
  updateGame: () => {
    const state = get();
    
    // Update distance and score
    set({
      distance: state.distance + 1,
      score: state.score + 1,
    });
    
    // Move obstacles
    const updatedObstacles = state.obstacles
      .map((obs) => ({ ...obs, y: obs.y + GAME_SPEED }))
      .filter((obs) => obs.y < 1000);
    
    set({ obstacles: updatedObstacles });
    
    // Spawn new obstacles
    const now = Date.now();
    if (now - state.lastObstacleSpawn > OBSTACLE_SPAWN_INTERVAL) {
      get().spawnObstacle();
      set({ lastObstacleSpawn: now });
    }
    
    // Check collisions
    get().checkCollisions();
  },
  
  spawnObstacle: () => {
    const lanes = [LANE_LEFT, LANE_CENTER, LANE_RIGHT];
    const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    const types: ('static' | 'enemy')[] = ['static', 'enemy'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    // 10% chance to spawn card pack
    const isCardPack = Math.random() < 0.1;
    
    const newObstacle: Obstacle = {
      id: `obs-${Date.now()}-${Math.random()}`,
      lane: randomLane,
      y: -50,
      type: isCardPack ? 'static' : randomType,
      health: randomType === 'enemy' ? 1 : 0,
    };
    
    set((state) => ({
      obstacles: [...state.obstacles, newObstacle],
    }));
  },
  
  checkCollisions: () => {
    const state = get();
    const playerY = 800;
    const collisionThreshold = 60;
    
    state.obstacles.forEach((obs) => {
      if (
        obs.lane === state.playerLane &&
        Math.abs(obs.y - playerY) < collisionThreshold
      ) {
        // Collision detected
        if (obs.type === 'static' && obs.health === 0) {
          // Coin or card pack
          if (Math.random() < 0.5) {
            get().collectCoin();
          } else {
            get().collectCardPack();
          }
        } else {
          // Enemy or obstacle - take damage
          get().takeDamage();
        }
        
        // Remove obstacle
        set({
          obstacles: state.obstacles.filter((o) => o.id !== obs.id),
        });
      }
    });
  },
  
  saveProgress: async () => {
    try {
      const state = get();
      const progress = {
        cards: state.cards,
        gold: state.gold,
        highScore: state.score,
      };
      await AsyncStorage.setItem('gameProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  },
  
  loadProgress: async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('gameProgress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        set({
          cards: progress.cards || [],
          gold: progress.gold || 0,
        });
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  },
}));