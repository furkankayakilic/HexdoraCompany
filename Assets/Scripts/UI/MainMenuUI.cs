using UnityEngine;
using UnityEngine.UI;
using DunyaKasifi.Core;
using TMPro;

namespace DunyaKasifi.UI
{
    public class MainMenuUI : MonoBehaviour
    {
        [Header("Buttons")]
        [SerializeField] private Button startGameButton;
        [SerializeField] private Button continueGameButton;
        [SerializeField] private Button settingsButton;
        [SerializeField] private Button creditsButton;
        [SerializeField] private Button quitButton;

        [Header("Panels")]
        [SerializeField] private GameObject mainPanel;
        [SerializeField] private GameObject settingsPanel;
        [SerializeField] private GameObject creditsPanel;

        [Header("Settings")]
        [SerializeField] private Slider musicVolumeSlider;
        [SerializeField] private Slider sfxVolumeSlider;
        [SerializeField] private Toggle arModeToggle;
        [SerializeField] private TMP_Dropdown languageDropdown;

        private GameManager gameManager;

        private void Awake()
        {
            gameManager = FindObjectOfType<GameManager>();
            InitializeUI();
        }

        private void InitializeUI()
        {
            // Main Menu Buttons
            if (startGameButton != null)
                startGameButton.onClick.AddListener(OnStartGameClicked);
            
            if (continueGameButton != null)
            {
                continueGameButton.onClick.AddListener(OnContinueGameClicked);
                // Enable/disable continue button based on save data existence
                continueGameButton.interactable = HasSaveData();
            }

            if (settingsButton != null)
                settingsButton.onClick.AddListener(() => ShowPanel(settingsPanel));

            if (creditsButton != null)
                creditsButton.onClick.AddListener(() => ShowPanel(creditsPanel));

            if (quitButton != null)
                quitButton.onClick.AddListener(OnQuitClicked);

            // Settings Controls
            if (musicVolumeSlider != null)
                musicVolumeSlider.onValueChanged.AddListener(OnMusicVolumeChanged);

            if (sfxVolumeSlider != null)
                sfxVolumeSlider.onValueChanged.AddListener(OnSFXVolumeChanged);

            if (arModeToggle != null)
                arModeToggle.onValueChanged.AddListener(OnARModeChanged);

            if (languageDropdown != null)
                languageDropdown.onValueChanged.AddListener(OnLanguageChanged);

            // Initialize with main panel
            ShowPanel(mainPanel);
        }

        private void OnStartGameClicked()
        {
            if (gameManager != null)
            {
                gameManager.StartNewGame();
            }
        }

        private void OnContinueGameClicked()
        {
            // Load saved game data and continue
            LoadGameData();
        }

        private void OnQuitClicked()
        {
            #if UNITY_EDITOR
                UnityEditor.EditorApplication.isPlaying = false;
            #else
                Application.Quit();
            #endif
        }

        private void ShowPanel(GameObject panel)
        {
            mainPanel?.SetActive(panel == mainPanel);
            settingsPanel?.SetActive(panel == settingsPanel);
            creditsPanel?.SetActive(panel == creditsPanel);
        }

        private void OnMusicVolumeChanged(float volume)
        {
            // Implement music volume change
            PlayerPrefs.SetFloat("MusicVolume", volume);
            PlayerPrefs.Save();
        }

        private void OnSFXVolumeChanged(float volume)
        {
            // Implement SFX volume change
            PlayerPrefs.SetFloat("SFXVolume", volume);
            PlayerPrefs.Save();
        }

        private void OnARModeChanged(bool enabled)
        {
            // Implement AR mode toggle
            PlayerPrefs.SetInt("ARMode", enabled ? 1 : 0);
            PlayerPrefs.Save();
        }

        private void OnLanguageChanged(int languageIndex)
        {
            // Implement language change
            PlayerPrefs.SetInt("Language", languageIndex);
            PlayerPrefs.Save();
        }

        private bool HasSaveData()
        {
            // Check if save data exists
            return PlayerPrefs.HasKey("SaveData");
        }

        private void LoadGameData()
        {
            // Implement save data loading
            if (HasSaveData())
            {
                // Load game data and continue
                if (gameManager != null)
                {
                    gameManager.EnterWorldMap(); // Or appropriate game state
                }
            }
        }

        public void BackToMainMenu()
        {
            ShowPanel(mainPanel);
        }
    }
} 