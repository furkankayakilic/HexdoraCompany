using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System;
using DunyaKasifi.Core;

namespace DunyaKasifi.UI
{
    public class UIManager : MonoBehaviour
    {
        [Header("Panels")]
        [SerializeField] private GameObject mainMenuPanel;
        [SerializeField] private GameObject characterCreationPanel;
        [SerializeField] private GameObject worldMapPanel;
        [SerializeField] private GameObject arExplorationPanel;
        [SerializeField] private GameObject miniGamePanel;
        [SerializeField] private GameObject pausePanel;

        [Header("Character Creation UI")]
        [SerializeField] private Button[] hairStyleButtons;
        [SerializeField] private Button[] eyeColorButtons;
        [SerializeField] private Button[] clothingButtons;
        [SerializeField] private Button[] accessoryButtons;
        [SerializeField] private Slider skinToneSlider;

        [Header("World Map UI")]
        [SerializeField] private TextMeshProUGUI locationNameText;
        [SerializeField] private TextMeshProUGUI locationDescriptionText;
        [SerializeField] private Button startExplorationButton;
        [SerializeField] private Button clearRouteButton;

        [Header("AR UI")]
        [SerializeField] private GameObject arGuidePanel;
        [SerializeField] private TextMeshProUGUI arStatusText;
        [SerializeField] private Button resetARButton;
        [SerializeField] private Slider scaleSlider;
        [SerializeField] private Slider rotationSlider;

        [Header("Education UI")]
        [SerializeField] private TextMeshProUGUI levelText;
        [SerializeField] private TextMeshProUGUI pointsText;
        [SerializeField] private GameObject achievementNotificationPrefab;
        [SerializeField] private Transform achievementContainer;

        private GameManager gameManager;

        private void Awake()
        {
            gameManager = FindObjectOfType<GameManager>();
            if (gameManager != null)
            {
                gameManager.OnGameStateChanged += HandleGameStateChanged;
            }
        }

        private void HandleGameStateChanged(GameManager.GameState newState)
        {
            HideAllPanels();
            switch (newState)
            {
                case GameManager.GameState.MainMenu:
                    ShowMainMenu();
                    break;
                case GameManager.GameState.CharacterCreation:
                    ShowCharacterCreation();
                    break;
                case GameManager.GameState.WorldMap:
                    ShowWorldMap();
                    break;
                case GameManager.GameState.ARExploration:
                    ShowARExploration();
                    break;
                case GameManager.GameState.MiniGame:
                    ShowMiniGame();
                    break;
                case GameManager.GameState.Paused:
                    ShowPauseMenu();
                    break;
            }
        }

        private void HideAllPanels()
        {
            mainMenuPanel?.SetActive(false);
            characterCreationPanel?.SetActive(false);
            worldMapPanel?.SetActive(false);
            arExplorationPanel?.SetActive(false);
            miniGamePanel?.SetActive(false);
            pausePanel?.SetActive(false);
        }

        private void ShowMainMenu()
        {
            mainMenuPanel?.SetActive(true);
        }

        private void ShowCharacterCreation()
        {
            characterCreationPanel?.SetActive(true);
        }

        private void ShowWorldMap()
        {
            worldMapPanel?.SetActive(true);
        }

        private void ShowARExploration()
        {
            arExplorationPanel?.SetActive(true);
            arGuidePanel?.SetActive(true);
        }

        private void ShowMiniGame()
        {
            miniGamePanel?.SetActive(true);
        }

        private void ShowPauseMenu()
        {
            pausePanel?.SetActive(true);
        }

        public void UpdateLocationInfo(string name, string description)
        {
            if (locationNameText != null)
                locationNameText.text = name;
            if (locationDescriptionText != null)
                locationDescriptionText.text = description;
        }

        public void UpdateARStatus(string status)
        {
            if (arStatusText != null)
                arStatusText.text = status;
        }

        public void UpdateLevel(int level, int points)
        {
            if (levelText != null)
                levelText.text = $"Seviye: {level}";
            if (pointsText != null)
                pointsText.text = $"Puan: {points}";
        }

        public void ShowAchievementNotification(string title, string description)
        {
            if (achievementNotificationPrefab != null && achievementContainer != null)
            {
                GameObject notification = Instantiate(achievementNotificationPrefab, achievementContainer);
                var notificationUI = notification.GetComponent<AchievementNotification>();
                if (notificationUI != null)
                {
                    notificationUI.Initialize(title, description);
                }
            }
        }

        private void OnDestroy()
        {
            if (gameManager != null)
            {
                gameManager.OnGameStateChanged -= HandleGameStateChanged;
            }
        }
    }
} 