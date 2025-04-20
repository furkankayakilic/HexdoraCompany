using UnityEngine;
using DunyaKasifi.Character;
using DunyaKasifi.AR;
using DunyaKasifi.WorldMap;
using DunyaKasifi.MiniGames;
using DunyaKasifi.Education;
using System;

namespace DunyaKasifi.Core
{
    public class GameDirector : MonoBehaviour
    {
        [Header("System References")]
        [SerializeField] private GameManager gameManager;
        [SerializeField] private CharacterCustomization characterCustomization;
        [SerializeField] private ARManager arManager;
        [SerializeField] private WorldMapManager worldMapManager;
        [SerializeField] private MiniGameManager miniGameManager;
        [SerializeField] private EducationManager educationManager;

        private void Awake()
        {
            ValidateReferences();
            InitializeSystems();
        }

        private void ValidateReferences()
        {
            if (gameManager == null) gameManager = FindObjectOfType<GameManager>();
            if (characterCustomization == null) characterCustomization = FindObjectOfType<CharacterCustomization>();
            if (arManager == null) arManager = FindObjectOfType<ARManager>();
            if (worldMapManager == null) worldMapManager = FindObjectOfType<WorldMapManager>();
            if (miniGameManager == null) miniGameManager = FindObjectOfType<MiniGameManager>();
            if (educationManager == null) educationManager = FindObjectOfType<EducationManager>();
        }

        private void InitializeSystems()
        {
            // Subscribe to game state changes
            gameManager.OnGameStateChanged += HandleGameStateChanged;

            // Subscribe to world map events
            worldMapManager.OnLocationSelected += HandleLocationSelected;
            worldMapManager.OnRouteUpdated += HandleRouteUpdated;

            // Subscribe to AR events
            arManager.OnARSessionStateChanged += HandleARSessionStateChanged;
            arManager.OnContentPlaced += HandleARContentPlaced;

            // Subscribe to education events
            educationManager.OnAchievementUnlocked += HandleAchievementUnlocked;
            educationManager.OnLevelUp += HandleLevelUp;
        }

        private void HandleGameStateChanged(GameManager.GameState newState)
        {
            switch (newState)
            {
                case GameManager.GameState.MainMenu:
                    HandleMainMenuState();
                    break;
                case GameManager.GameState.CharacterCreation:
                    HandleCharacterCreationState();
                    break;
                case GameManager.GameState.WorldMap:
                    HandleWorldMapState();
                    break;
                case GameManager.GameState.ARExploration:
                    HandleARExplorationState();
                    break;
                case GameManager.GameState.MiniGame:
                    HandleMiniGameState();
                    break;
                case GameManager.GameState.Paused:
                    HandlePausedState();
                    break;
            }
        }

        private void HandleMainMenuState()
        {
            // Initialize main menu UI and interactions
            arManager.StopARSession();
            miniGameManager.EndCurrentGame();
        }

        private void HandleCharacterCreationState()
        {
            // Show character creation UI and initialize customization options
        }

        private void HandleWorldMapState()
        {
            // Initialize world map view and interactions
            arManager.StopARSession();
            miniGameManager.EndCurrentGame();
        }

        private void HandleARExplorationState()
        {
            // Start AR session and initialize AR content
            arManager.StartARSession();
        }

        private void HandleMiniGameState()
        {
            // Initialize mini-game environment
            arManager.StopARSession();
        }

        private void HandlePausedState()
        {
            // Handle pause menu and game state preservation
            Time.timeScale = 0f;
        }

        private void HandleLocationSelected(Location location)
        {
            // Handle location selection in world map
            Debug.Log($"Selected location: {location.name}");
            
            // Show location information
            worldMapManager.ShowLocationInfo(location);
            
            // Add points for discovering new location
            educationManager.AddPoints(5);
        }

        private void HandleRouteUpdated(List<Location> route)
        {
            // Handle route updates and planning
            Debug.Log($"Route updated with {route.Count} locations");
        }

        private void HandleARSessionStateChanged(bool isTracking)
        {
            // Handle AR session state changes
            Debug.Log($"AR Session tracking: {isTracking}");
        }

        private void HandleARContentPlaced(Vector3 position)
        {
            // Handle AR content placement
            Debug.Log($"AR content placed at: {position}");
            
            // Add points for successful AR interaction
            educationManager.AddPoints(3);
        }

        private void HandleAchievementUnlocked(Achievement achievement)
        {
            // Handle achievement unlock
            Debug.Log($"Achievement unlocked: {achievement.title}");
            
            // Show achievement notification
            ShowAchievementNotification(achievement);
        }

        private void HandleLevelUp(int newLevel)
        {
            // Handle level up
            Debug.Log($"Level up to: {newLevel}");
            
            // Show level up notification
            ShowLevelUpNotification(newLevel);
        }

        private void ShowAchievementNotification(Achievement achievement)
        {
            // Implement achievement notification UI
        }

        private void ShowLevelUpNotification(int level)
        {
            // Implement level up notification UI
        }

        private void OnDestroy()
        {
            // Unsubscribe from events
            if (gameManager != null) gameManager.OnGameStateChanged -= HandleGameStateChanged;
            if (worldMapManager != null)
            {
                worldMapManager.OnLocationSelected -= HandleLocationSelected;
                worldMapManager.OnRouteUpdated -= HandleRouteUpdated;
            }
            if (arManager != null)
            {
                arManager.OnARSessionStateChanged -= HandleARSessionStateChanged;
                arManager.OnContentPlaced -= HandleARContentPlaced;
            }
            if (educationManager != null)
            {
                educationManager.OnAchievementUnlocked -= HandleAchievementUnlocked;
                educationManager.OnLevelUp -= HandleLevelUp;
            }
        }
    }
} 