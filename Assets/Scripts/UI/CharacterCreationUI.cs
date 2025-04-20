using UnityEngine;
using UnityEngine.UI;
using TMPro;
using DunyaKasifi.Character;
using DunyaKasifi.Core;

namespace DunyaKasifi.UI
{
    public class CharacterCreationUI : MonoBehaviour
    {
        [Header("Character Customization")]
        [SerializeField] private TMP_InputField characterNameInput;
        [SerializeField] private Button randomizeButton;
        [SerializeField] private Button confirmButton;
        [SerializeField] private Button backButton;

        [Header("Customization Controls")]
        [SerializeField] private Button nextHairStyleButton;
        [SerializeField] private Button prevHairStyleButton;
        [SerializeField] private Button nextEyeColorButton;
        [SerializeField] private Button prevEyeColorButton;
        [SerializeField] private Button nextClothingButton;
        [SerializeField] private Button prevClothingButton;
        [SerializeField] private Button nextAccessoryButton;
        [SerializeField] private Button prevAccessoryButton;
        [SerializeField] private Slider skinToneSlider;

        [Header("Preview")]
        [SerializeField] private Transform characterPreviewRoot;
        [SerializeField] private float rotationSpeed = 100f;
        
        private CharacterCustomization characterCustomization;
        private GameManager gameManager;
        private bool isDragging;
        private Vector3 lastMousePosition;

        private void Awake()
        {
            characterCustomization = FindObjectOfType<CharacterCustomization>();
            gameManager = FindObjectOfType<GameManager>();
            InitializeUI();
        }

        private void InitializeUI()
        {
            // Character name input
            if (characterNameInput != null)
            {
                characterNameInput.onValueChanged.AddListener(OnNameChanged);
            }

            // Navigation buttons
            if (randomizeButton != null)
                randomizeButton.onClick.AddListener(RandomizeCharacter);
            
            if (confirmButton != null)
                confirmButton.onClick.AddListener(ConfirmCharacter);
            
            if (backButton != null)
                backButton.onClick.AddListener(OnBackClicked);

            // Customization controls
            if (nextHairStyleButton != null)
                nextHairStyleButton.onClick.AddListener(() => CycleOption(true, characterCustomization.NextHairStyle));
            
            if (prevHairStyleButton != null)
                prevHairStyleButton.onClick.AddListener(() => CycleOption(false, characterCustomization.PreviousHairStyle));

            if (nextEyeColorButton != null)
                nextEyeColorButton.onClick.AddListener(() => CycleOption(true, characterCustomization.NextEyeColor));
            
            if (prevEyeColorButton != null)
                prevEyeColorButton.onClick.AddListener(() => CycleOption(false, characterCustomization.PreviousEyeColor));

            if (nextClothingButton != null)
                nextClothingButton.onClick.AddListener(() => CycleOption(true, characterCustomization.NextClothing));
            
            if (prevClothingButton != null)
                prevClothingButton.onClick.AddListener(() => CycleOption(false, characterCustomization.PreviousClothing));

            if (nextAccessoryButton != null)
                nextAccessoryButton.onClick.AddListener(() => CycleOption(true, characterCustomization.NextAccessory));
            
            if (prevAccessoryButton != null)
                prevAccessoryButton.onClick.AddListener(() => CycleOption(false, characterCustomization.PreviousAccessory));

            if (skinToneSlider != null)
            {
                skinToneSlider.onValueChanged.AddListener(OnSkinToneChanged);
                skinToneSlider.value = 0.5f; // Default value
            }
        }

        private void Update()
        {
            HandleCharacterRotation();
        }

        private void HandleCharacterRotation()
        {
            if (characterPreviewRoot == null) return;

            if (Input.GetMouseButtonDown(0))
            {
                RaycastHit hit;
                Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
                
                if (Physics.Raycast(ray, out hit))
                {
                    if (hit.transform == characterPreviewRoot)
                    {
                        isDragging = true;
                        lastMousePosition = Input.mousePosition;
                    }
                }
            }
            else if (Input.GetMouseButtonUp(0))
            {
                isDragging = false;
            }

            if (isDragging)
            {
                Vector3 delta = Input.mousePosition - lastMousePosition;
                characterPreviewRoot.Rotate(Vector3.up, -delta.x * rotationSpeed * Time.deltaTime);
                lastMousePosition = Input.mousePosition;
            }
        }

        private void OnNameChanged(string newName)
        {
            // Update character name
            if (characterCustomization != null)
            {
                characterCustomization.SetCharacterName(newName);
            }

            // Enable/disable confirm button based on name validity
            if (confirmButton != null)
            {
                confirmButton.interactable = !string.IsNullOrWhiteSpace(newName);
            }
        }

        private void CycleOption(bool next, System.Action cycleAction)
        {
            if (characterCustomization != null && cycleAction != null)
            {
                cycleAction.Invoke();
            }
        }

        private void OnSkinToneChanged(float value)
        {
            if (characterCustomization != null)
            {
                characterCustomization.SetSkinTone(value);
            }
        }

        private void RandomizeCharacter()
        {
            if (characterCustomization != null)
            {
                characterCustomization.RandomizeAll();
                UpdateUIToMatchCharacter();
            }
        }

        private void UpdateUIToMatchCharacter()
        {
            // Update UI elements to match current character customization
            if (skinToneSlider != null)
            {
                skinToneSlider.value = characterCustomization.GetCurrentSkinTone();
            }
        }

        private void ConfirmCharacter()
        {
            if (string.IsNullOrWhiteSpace(characterNameInput.text))
            {
                // Show error message
                Debug.LogWarning("Character name cannot be empty!");
                return;
            }

            // Save character data
            SaveCharacterData();

            // Proceed to next game state
            if (gameManager != null)
            {
                gameManager.EnterWorldMap();
            }
        }

        private void SaveCharacterData()
        {
            if (characterCustomization != null)
            {
                // Save character customization data
                PlayerPrefs.SetString("CharacterName", characterNameInput.text);
                PlayerPrefs.SetInt("HairStyle", characterCustomization.GetCurrentHairStyle());
                PlayerPrefs.SetInt("EyeColor", characterCustomization.GetCurrentEyeColor());
                PlayerPrefs.SetInt("Clothing", characterCustomization.GetCurrentClothing());
                PlayerPrefs.SetInt("Accessory", characterCustomization.GetCurrentAccessory());
                PlayerPrefs.SetFloat("SkinTone", characterCustomization.GetCurrentSkinTone());
                PlayerPrefs.Save();
            }
        }

        private void OnBackClicked()
        {
            if (gameManager != null)
            {
                gameManager.ReturnToMainMenu();
            }
        }
    }
} 