using UnityEngine;
using System;
using System.Collections.Generic;

namespace DunyaKasifi.MiniGames
{
    public enum MiniGameType
    {
        MapDetective,
        WeatherPredictor,
        LanguageLearner,
        CulturalQuiz,
        MathChallenge
    }

    [System.Serializable]
    public class MiniGameData
    {
        public MiniGameType type;
        public string title;
        public string description;
        public int difficultyLevel;
        public List<string> rewards;
        public GameObject gamePrefab;
    }

    public class MiniGameManager : MonoBehaviour
    {
        [SerializeField] private List<MiniGameData> availableGames;
        [SerializeField] private Transform gameContainer;
        
        private MiniGameData currentGame;
        private GameObject activeGameInstance;
        
        public event Action<MiniGameData> OnGameStarted;
        public event Action<MiniGameData, int> OnGameCompleted;
        public event Action<MiniGameData> OnGameFailed;

        private void Start()
        {
            InitializeGames();
        }

        private void InitializeGames()
        {
            // Initialize game data and UI elements
            foreach (var game in availableGames)
            {
                // Setup game buttons and UI elements
            }
        }

        public void StartGame(MiniGameType gameType)
        {
            MiniGameData gameData = availableGames.Find(g => g.type == gameType);
            if (gameData != null)
            {
                StartGame(gameData);
            }
        }

        private void StartGame(MiniGameData gameData)
        {
            if (activeGameInstance != null)
            {
                Destroy(activeGameInstance);
            }

            currentGame = gameData;
            activeGameInstance = Instantiate(gameData.gamePrefab, gameContainer);
            
            // Initialize game specific components
            IMiniGame gameComponent = activeGameInstance.GetComponent<IMiniGame>();
            if (gameComponent != null)
            {
                gameComponent.Initialize();
                gameComponent.OnGameCompleted += HandleGameCompleted;
                gameComponent.OnGameFailed += HandleGameFailed;
            }

            OnGameStarted?.Invoke(gameData);
        }

        private void HandleGameCompleted(int score)
        {
            OnGameCompleted?.Invoke(currentGame, score);
            AwardRewards(score);
        }

        private void HandleGameFailed()
        {
            OnGameFailed?.Invoke(currentGame);
        }

        private void AwardRewards(int score)
        {
            // Implement reward system
            foreach (var reward in currentGame.rewards)
            {
                // Award items, badges, or other rewards based on score
                Debug.Log($"Awarding {reward} for score {score}");
            }
        }

        public void EndCurrentGame()
        {
            if (activeGameInstance != null)
            {
                Destroy(activeGameInstance);
                activeGameInstance = null;
            }
            currentGame = null;
        }

        public List<MiniGameData> GetAvailableGames()
        {
            return new List<MiniGameData>(availableGames);
        }

        public MiniGameData GetGameByType(MiniGameType type)
        {
            return availableGames.Find(g => g.type == type);
        }

        public bool IsGameAvailable(MiniGameType type)
        {
            return availableGames.Exists(g => g.type == type);
        }
    }

    // Interface for mini-game implementations
    public interface IMiniGame
    {
        void Initialize();
        void StartGame();
        void PauseGame();
        void ResumeGame();
        void EndGame();
        event Action<int> OnGameCompleted;
        event Action OnGameFailed;
    }
} 