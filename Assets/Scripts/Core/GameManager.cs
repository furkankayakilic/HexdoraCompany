using UnityEngine;
using System;

namespace DunyaKasifi.Core
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        // Game States
        public enum GameState
        {
            MainMenu,
            CharacterCreation,
            WorldMap,
            ARExploration,
            MiniGame,
            Paused
        }

        public GameState CurrentState { get; private set; }

        // Events
        public event Action<GameState> OnGameStateChanged;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(gameObject);
            }
        }

        private void Start()
        {
            SetGameState(GameState.MainMenu);
        }

        public void SetGameState(GameState newState)
        {
            CurrentState = newState;
            OnGameStateChanged?.Invoke(newState);
        }

        // Game State Management
        public void StartNewGame()
        {
            SetGameState(GameState.CharacterCreation);
        }

        public void EnterWorldMap()
        {
            SetGameState(GameState.WorldMap);
        }

        public void StartARExploration()
        {
            SetGameState(GameState.ARExploration);
        }

        public void StartMiniGame()
        {
            SetGameState(GameState.MiniGame);
        }

        public void PauseGame()
        {
            SetGameState(GameState.Paused);
            Time.timeScale = 0f;
        }

        public void ResumeGame()
        {
            SetGameState(GameState.WorldMap);
            Time.timeScale = 1f;
        }
    }
} 